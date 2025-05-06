import SessionRepository from "@/modules/auth/repositories/SessionRepository";
import {Prisma, Session} from "@/prisma/client";
import jwt from "jsonwebtoken";
import {ACCESS_MAX_AGE, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, REFRESH_MAX_AGE} from "@/shared/utils/constants";
import HttpError from "@/response/HttpError";
import {CreateSessionDTO, UserDTO} from "@/prisma/types";
import {todayPlus} from "@/shared/utils/helpers";
import prisma from "@/prisma/prisma";

export interface ITokensPair {
    accessToken: string;
    refreshToken: string;
}

class SessionService {
    async findOrFail(token: string): Promise<Session> {
        const session = await SessionRepository.findUniqueByToken(token);
        if (!session) throw HttpError.unauthenticated();
        return session;
    }

    async create({userId, token, userDeviceId}: CreateSessionDTO): Promise<Session> {
        const expiresIn = todayPlus.days(REFRESH_MAX_AGE);
        const sessionsCount = await SessionRepository.countUserSessions(userId, userDeviceId);

        if (sessionsCount >= 5) {
            const oldestSession = await SessionRepository.findFirstOldestSessionByDevice(userId, userDeviceId);

            if (oldestSession) await SessionRepository.deleteByToken(oldestSession.token);
        }

        return await SessionRepository.create({
            user: {connect: {id: userId}},
            userDevice: {connect: {id: userDeviceId}},
            token,
            expiresIn
        });
    }

    // tokens logic
    generateTokens(payload: UserDTO): ITokensPair {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: `${ACCESS_MAX_AGE}m`});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: `${REFRESH_MAX_AGE}d`});

        return {accessToken, refreshToken};
    }

    verifyRefreshToken(token: string) {
        try {
            const payload = jwt.verify(token, JWT_REFRESH_SECRET) as UserDTO;

            if (!payload || !payload.id) throw HttpError.unauthenticated();

            return payload;
        } catch (err) {
            console.log(err);
            throw HttpError.unauthenticated("token verification failed");
        }
    }
}


export default new SessionService();
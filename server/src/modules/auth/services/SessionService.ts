import SessionRepository from "@/modules/auth/repositories/SessionRepository";
import {Session} from "@/prisma/client";
import {REFRESH_MAX_AGE} from "@/shared/utils/constants";
import HttpError from "@/response/HttpError";
import {CreateSessionDTO, UserDTO} from "@/prisma/types";
import {todayPlus} from "@/shared/utils/helpers";
import TokenService from "@/shared/services/TokenService";

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

    generateTokens(user: UserDTO): ITokensPair {
        const accessToken = TokenService.generateAccessToken(user);
        const refreshToken = TokenService.generateRefreshToken(user);

        return {accessToken, refreshToken};
    }
}


export default new SessionService();
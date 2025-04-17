import SessionRepository from "@/modules/auth/SessionRepository";
import {Session} from "@/prisma/client";
import jwt from "jsonwebtoken";
import {JWT_SECRET, REFRESH_MAX_AGE} from "@/utils/constants";
import ErrorResponse from "@/response/ErrorResponse";
import {JwtUserPayload} from "@/types/shared/JwtUserPayload";

export interface ITokensPair {
    accessToken: string;
    refreshToken: string;
}

class SessionService {
    async findByToken(token: string): Promise<Session> {
        const session = await SessionRepository.find({token});
        if (!session) throw ErrorResponse.unauthorized();
        return session;
    }

    // tokens logic
    generateTokens(payload: JwtUserPayload): ITokensPair {
        const accessToken = jwt.sign({user: payload}, JWT_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign({user: payload}, JWT_SECRET, {expiresIn: `${REFRESH_MAX_AGE}d`});

        return {accessToken, refreshToken};
    }

    verifyRefreshToken(token: string): JwtUserPayload {
        try {
            const payload = jwt.verify(token, JWT_SECRET) as JwtUserPayload;

            if (!payload || !payload.user) throw ErrorResponse.unauthorized();

            return payload;
        } catch (err) {
            console.log(err);
            throw ErrorResponse.unauthorized("токен невалидный");
        }
    }
}


export default new SessionService();
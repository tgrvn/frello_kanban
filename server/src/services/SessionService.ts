import jwt from "jsonwebtoken";
import {JWT_SECRET, REFRESH_MAX_AGE} from "@/utils/constants";
import {Prisma, Session} from "@/prisma/client";
import prisma from "@/prisma/prisma";
import SessionUncheckedCreateInput = Prisma.SessionUncheckedCreateInput;
import ErrorResponse from "@/response/ErrorResponse";
import UserService, {UserDTO} from "@/services/UserService";

type TokensPair = {
    accessToken: string;
    refreshToken: string;
}

class SessionService {
    generateTokens(payload: object): TokensPair {
        const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, JWT_SECRET, {expiresIn: `${REFRESH_MAX_AGE}d`});

        return {accessToken, refreshToken};
    }

    async refresh({token, ip, ua, fingerprint}: {
        token: string,
        ip: string,
        ua: string,
        fingerprint: string
    }): Promise<{ refreshToken: string, accessToken: string, user: UserDTO }> {
        const payload = this.verifyRefreshToken(token);
        if (!payload || !('userId' in payload)) throw ErrorResponse.unauthorized();

        const session = await prisma.session.findUnique({where: {token}});
        if (!session) throw ErrorResponse.unauthorized();

        // make the check easier but safety
        if (session.ip !== ip || session.ua !== ua || session.fingerprint !== fingerprint) throw ErrorResponse.unauthorized();

        const user = await prisma.user.findUnique({where: {id: payload.userId}});
        if (!user) throw ErrorResponse.unauthorized();

        const tokens = this.generateTokens({userId: payload.userId});
        const newSession = await prisma.session.update({where: {token}, data: {token: tokens.refreshToken}});

        return {user: UserService.makeUserDto(user), refreshToken: newSession.token, accessToken: tokens.accessToken};
    }

    async create({userId, token, fingerprint, ip, ua}: SessionUncheckedCreateInput): Promise<Session> {
        const session = await prisma.session.create({
            data: {userId, fingerprint, ip, ua, token},
        });

        return session;
    }

    verifyRefreshToken(token: string): { userId: string } {
        try {
            const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
            return payload;
        } catch (err) {
            console.log(err);
            throw ErrorResponse.unauthorized("токен невалидный");
        }
    }

    async destroy(token: string): Promise<void> {
        await prisma.session.delete({where: {token}});
    }
}

export default new SessionService();
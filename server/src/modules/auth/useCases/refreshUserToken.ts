import {UserDTO} from "@/prisma/types";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import UserService from "@/modules/users/UserService";
import SessionRepository from "@/modules/auth/repositories/SessionRepository";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";
import {IClientMetaData} from "@/types/express";
import HttpError from "@/response/HttpError";
import MailService from "@/shared/services/mailer/MailService";
import TokenService from "@/shared/services/TokenService";
import {JWT_REFRESH_SECRET} from "@/shared/utils/constants";

export const refreshUserToken = async ({token, ip, userAgent, fingerprint, deviceId}: IClientMetaData & {
    token: string
}): Promise<{
    user: UserDTO;
} & ITokensPair> => {
    const session = await SessionService.findOrFail(token);
    await SessionRepository.deleteByToken(session.token);

    const payload = TokenService.verifyToken<UserDTO>(session.token, JWT_REFRESH_SECRET);
    const user = await UserService.verifyCredentials(payload.email);

    const device = await UserDeviceService.verifyAndUpdateDeviceMeta(
        {ip, fingerprint, deviceId, userAgent, userId: user.id },
        async () => {
            await MailService.sendSuspiciousAttemptEmail(user.email, ip, userAgent, Date.now().toString())
            throw HttpError.unauthenticated("suspicious device");
        }
    );

    const tokens = SessionService.generateTokens(user);
    const newSession = await SessionService.create({userId: user.id, token, userDeviceId: device.id});

    return {user, refreshToken: newSession.token, accessToken: tokens.accessToken};
}
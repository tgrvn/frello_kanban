import {UserDTO} from "@/prisma/types";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import UserService from "@/modules/users/UserService";
import SessionRepository from "@/modules/auth/repositories/SessionRepository";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";

export const refreshUserToken = async ({token, ip, userAgent, fingerprint, deviceId}: any): Promise<{
    user: UserDTO;
} & ITokensPair> => {
    const session = await SessionService.findOrThrowUnique(token);
    await SessionRepository.deleteByToken(session.token);

    const payload = SessionService.verifyRefreshToken(session.token);
    const user = await UserService.validateOrThrow(payload.email);

    const device = await UserDeviceService.findAndUpdate({ip, fingerprint, deviceId, userAgent, userId: user.id})

    const tokens = SessionService.generateTokens(user);
    const newSession = await SessionService.create({userId: user.id, token, userDeviceId: device.id});

    return {user, refreshToken: newSession.token, accessToken: tokens.accessToken};
}
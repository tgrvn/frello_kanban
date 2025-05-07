import TwoFactorCodeService from "@/modules/auth/services/TwoFactorCodeService";
import UserService from "@/modules/users/UserService";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import {UserDTO} from "@/prisma/types";
import UserDeviceRepository from "@/modules/auth/repositories/UserDeviceRepository";

export const verifyTwoFactorCode = async (token: string, code: string): Promise<{ user: UserDTO } & ITokensPair> => {
    const {userId, deviceId, ip, fingerprint, userAgent} = TwoFactorCodeService.verifyToken(token);
    await TwoFactorCodeService.verify(userId, code);

    const user = await UserService.findOrThrowById(userId);
    if (!user.isActivated) await UserService.activate(user.id);

    const device = await UserDeviceRepository.createOrUpdate(user.id, deviceId, {ip, fingerprint, userAgent});

    console.log("device", device);

    const tokens = SessionService.generateTokens(user);
    const session = await SessionService.create({
        userId: user.id,
        token: tokens.refreshToken,
        userDeviceId: device.id
    });

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
}
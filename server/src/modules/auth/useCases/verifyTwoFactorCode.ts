import TwoFactorCodeService, {ITwoFactorPayload} from "@/modules/auth/services/TwoFactorCodeService";
import UserService from "@/modules/users/UserService";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import {UserDTO} from "@/prisma/types";
import UserDeviceRepository from "@/modules/auth/repositories/UserDeviceRepository";
import TokenService from "@/shared/services/TokenService";
import {JWT_TWO_FACTOR_SECRET} from "@/shared/utils/constants";

export const verifyTwoFactorCode = async (token: string, code: string): Promise<{ user: UserDTO } & ITokensPair> => {
    const {userId, deviceId, ip, fingerprint, userAgent} = TokenService
        .verifyToken<ITwoFactorPayload>(token, JWT_TWO_FACTOR_SECRET);

    await TwoFactorCodeService.verify(userId, code);

    const user = await UserService.findOrThrowBy({id: userId});
    if (!user.isActivated) await UserService.activate(user.id);

    const device = await UserDeviceRepository.createOrUpdate(user.id, {ip, deviceId, fingerprint, userAgent});

    const tokens = SessionService.generateTokens(user);
    const session = await SessionService.create({
        userId: user.id,
        token: tokens.refreshToken,
        userDeviceId: device.id
    });

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
}
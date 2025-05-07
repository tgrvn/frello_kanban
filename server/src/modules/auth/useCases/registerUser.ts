import {IAuthData} from "@/modules/auth/authValidation";
import UserService from "@/modules/users/UserService";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import {UserDTO} from "@/prisma/types";
import MailService from "@/shared/services/mailer/MailService";
import ActivationTokenService from "@/modules/auth/services/ActivationTokenService";
import UserDeviceRepository from "@/modules/auth/repositories/UserDeviceRepository";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";

export const registerUser = async ({email, password, ip, userAgent, fingerprint, deviceId}: IAuthData): Promise<{
    user: UserDTO;
} & ITokensPair> => {
    const user = await UserService.create({email, password});

    const device = await UserDeviceService.create({
        userId: user.id,
        ip,
        userAgent,
        fingerprint,
        deviceId,
    });
    await UserDeviceService.makeDeviceTrusted(device.deviceId, user.id);

    const activationToken = await ActivationTokenService.create(user.id, device.deviceId);
    await MailService.sendActivationEmail(user.email, activationToken);

    const tokens = SessionService.generateTokens(user);
    const session = await SessionService.create({userId: user.id, userDeviceId: device.id, token: tokens.refreshToken});

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
};
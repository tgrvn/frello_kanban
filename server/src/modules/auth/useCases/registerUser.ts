import {IAuthData} from "@/modules/auth/authValidation";
import UserService from "@/modules/users/UserService";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import {UserDTO} from "@/prisma/types";
import MailService from "@/mailer/MailService";
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

    //const url = FRONTEND_URL + '/activate/' + activationToken;
    //for test:
    const activationToken = await ActivationTokenService.create(user.id);
    const url = 'http://localhost:3000/api/auth/activate/' + activationToken;
    await MailService.sendActivationEmail(user.email, url);

    const tokens = SessionService.generateTokens(user);
    const session = await SessionService.create({userId: user.id, userDeviceId: device.id, token: tokens.refreshToken});

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
};
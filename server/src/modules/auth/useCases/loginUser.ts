import {IAuthData} from "@/modules/auth/authValidation";
import UserService from "@/modules/users/UserService";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import {UserDTO} from "@/prisma/types";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";
import HttpError from "@/response/HttpError";
import TwoFactorCodeService from "@/modules/auth/services/TwoFactorCodeService";
import MailService from "@/shared/services/mailer/MailService";

export const loginUser = async ({email, password, ip, userAgent, deviceId, fingerprint}: IAuthData): Promise<{
    user: UserDTO;
} & ITokensPair> => {
    const user = await UserService.verifyCredentials(email, password);

    const device = await UserDeviceService.verifyAndUpdateDeviceMeta(
        {userId: user.id, ip, userAgent, deviceId, fingerprint},
        async () => {
            const twoFactorData = await TwoFactorCodeService.create(user.id, {deviceId, userAgent, fingerprint, ip});
            await MailService.sendTwoFactorCode(user.email, twoFactorData.code);
            throw HttpError.twoFactorRequired(twoFactorData.token);
        }
    );

    const tokens = SessionService.generateTokens(user);

    const session = await SessionService.create({
        userId: user.id,
        token: tokens.refreshToken,
        userDeviceId: device.id
    });

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
}
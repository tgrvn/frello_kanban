import {IAuthData} from "@/modules/auth/authValidation";
import UserService from "@/modules/users/UserService";
import SessionService, {ITokensPair} from "@/modules/auth/services/SessionService";
import {UserDTO} from "@/prisma/types";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";

export const loginUser = async ({email, password, ip, userAgent, deviceId, fingerprint}: IAuthData): Promise<{
    user: UserDTO;
} & ITokensPair> => {
    const user = await UserService.validateOrThrow(email, password);

    const device = await UserDeviceService.findAndUpdate({userId: user.id, ip, userAgent, deviceId, fingerprint})

    const tokens = SessionService.generateTokens(user);
    const session = await SessionService.create({
        userId: user.id,
        token: tokens.refreshToken,
        userDeviceId: device.id
    });

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
}
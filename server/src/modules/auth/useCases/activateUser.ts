import UserService from "@/modules/users/UserService";
import ActivationTokenRepository from "@/modules/auth/repositories/ActivationTokenRepository";
import {IClientMetaData} from "@/types/express";
import UserDeviceService from "@/modules/auth/services/UserDeviceService";
import TokenService from "@/shared/services/TokenService";
import {JWT_ACTIVATION_SECRET} from "@/shared/utils/constants";
import {UserDTO} from "@/prisma/types";

export const activateUser = async ({token}: { token: string } & IClientMetaData): Promise<void> => {
    const payload = TokenService.verifyToken<UserDTO & { deviceId: string }>(token, JWT_ACTIVATION_SECRET);
    await UserService.activate(payload.id);
    await ActivationTokenRepository.delete(token);
    await UserDeviceService.makeDeviceTrusted(payload.deviceId, payload.id);
}
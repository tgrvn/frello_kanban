import ActivationTokenService from "@/modules/auth/services/ActivationTokenService";
import UserService from "@/modules/users/UserService";
import ActivationTokenRepository from "@/modules/auth/repositories/ActivationTokenRepository";
import {IClientMetaData} from "@/types/express";

export const activateUser = async ({token, ip, userAgent, fingerprint, deviceId}: { token: string } & IClientMetaData): Promise<void> => {
    const payload = ActivationTokenService.verifyActivationToken(token);
    await UserService.activate(payload.id);
    await ActivationTokenRepository.delete(token);
}
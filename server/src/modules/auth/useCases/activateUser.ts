import ActivationTokenService from "@/modules/auth/services/ActivationTokenService";
import UserService from "@/modules/users/UserService";
import ActivationTokenRepository from "@/modules/auth/repositories/ActivationTokenRepository";

export const activateUser = async (token: string): Promise<void> => {
    const payload = ActivationTokenService.verifyActivationToken(token);
    await UserService.activate(payload.id);
    await ActivationTokenRepository.delete(token);
}
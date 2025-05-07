import jwt from "jsonwebtoken";
import {JWT_ACTIVATION_SECRET, JWT_REFRESH_SECRET} from "@/shared/utils/constants";
import ActivationLinkRepository from "@/modules/auth/repositories/ActivationTokenRepository";
import {todayPlus} from "@/shared/utils/helpers";
import HttpError from "@/response/HttpError";
import {UserDTO} from "@/prisma/types";
import TokenService from "@/shared/services/TokenService";

class ActivationTokenService {
    async create(userId: string, deviceId: string): Promise<string> {
        const token = TokenService.generateActivationToken(userId, deviceId);
        const expiresIn = todayPlus.minutes(15);

        const activationLink = await ActivationLinkRepository.create({userId, token, expiresIn});

        return activationLink.token;
    }
}

export default new ActivationTokenService();
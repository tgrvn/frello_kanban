import jwt from "jsonwebtoken";
import {JWT_ACTIVATION_SECRET, JWT_REFRESH_SECRET} from "@/shared/utils/constants";
import ActivationLinkRepository from "@/modules/auth/repositories/ActivationTokenRepository";
import {todayPlus} from "@/shared/utils/helpers";
import HttpError from "@/response/HttpError";
import {UserDTO} from "@/prisma/types";

class ActivationTokenService {
    async create(userId: string, deviceId: string): Promise<string> {
        const token = this.generateActivationToken(userId, deviceId);
        const expiresIn = todayPlus.minutes(15);

        const activationLink = await ActivationLinkRepository.create({userId, token, expiresIn});

        return activationLink.token;
    }

    generateActivationToken(userId: string, deviceId: string): string {
        return jwt.sign({id: {userId, deviceId}}, JWT_ACTIVATION_SECRET, {expiresIn: '15m'});
    }

    verifyActivationToken(token: string): UserDTO & { deviceId: string } {
        try {
            const payload = jwt.verify(token, JWT_ACTIVATION_SECRET) as UserDTO & { deviceId: string };

            if (!payload || !payload?.id) throw HttpError.unauthenticated();

            return payload;
        } catch (err) {
            console.log(err);
            throw HttpError.unauthenticated("token verification failed");
        }
    }
}

export default new ActivationTokenService();
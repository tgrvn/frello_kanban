import jwt from "jsonwebtoken";
import {JWT_ACTIVATION_SECRET, JWT_REFRESH_SECRET} from "@/shared/utils/constants";
import ActivationLinkRepository from "@/modules/auth/repositories/ActivationTokenRepository";
import {todayPlus} from "@/shared/utils/helpers";
import HttpError from "@/response/HttpError";
import {UserDTO} from "@/prisma/types";

class ActivationTokenService {
    async create(userId: string): Promise<string> {
        const token = this.generateActivationToken(userId);
        const expiresIn = todayPlus.minutes(15);

        const activationLink = await ActivationLinkRepository.create({userId, token, expiresIn});

        return activationLink.token;
    }

    generateActivationToken(payload: string): string {
        return jwt.sign({id: payload}, JWT_ACTIVATION_SECRET, {expiresIn: '15m'});
    }

    verifyActivationToken(token: string) {
        try {
            const payload = jwt.verify(token, JWT_ACTIVATION_SECRET) as Pick<UserDTO, 'id'>;

            if (!payload || !payload?.id) throw HttpError.unauthenticated();

            return payload;
        } catch (err) {
            console.log(err);
            throw HttpError.unauthenticated("token verification failed");
        }
    }
}

export default new ActivationTokenService();
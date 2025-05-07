import TwoFactorCodeRepository from "@/modules/auth/repositories/TwoFactorCodeRepository";
import HttpError from "@/response/HttpError";
import jwt from "jsonwebtoken";
import {IClientMetaData} from "@/types/express";
import {TWO_FACTOR_MAX_AGE, TWO_FACTOR_SECRET} from "@/shared/utils/constants";
import {todayPlus} from "@/shared/utils/helpers";

class TwoFactorCodeService {
    async generate(userId: string): Promise<string> {
        while (true) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const twoFactorCode = await TwoFactorCodeRepository.findUniqueByPair(userId, code);

            if (!twoFactorCode) return code;
        }
    }

    async create(userId: string, {deviceId, fingerprint, ip, userAgent}: IClientMetaData): Promise<{
        code: string,
        token: string
    }> {
        const code = await this.generate(userId);
        const expiresIn = todayPlus.minutes(TWO_FACTOR_MAX_AGE);
        const token = this.generateToken(userId, {deviceId, fingerprint, ip, userAgent});
        await TwoFactorCodeRepository.create(userId, code, expiresIn);

        return {code, token}
    }

    async verify(userId: string, code: string): Promise<void> {
        const twoFactorCode = await TwoFactorCodeRepository.findUniqueByPair(userId, code);
        const now = new Date(Date.now());

        if (!twoFactorCode) {
            throw HttpError.validationError("wrong code");
        }

        if (twoFactorCode.expiresIn <= now) {
            throw HttpError.validationError("code expired");
        }

        await TwoFactorCodeRepository.deleteByUniquePair(userId, code);
    }

    generateToken(userId: string, {deviceId, fingerprint, ip, userAgent}: IClientMetaData): string {
        return jwt.sign({
            userId,
            deviceId,
            fingerprint,
            ip,
            userAgent
        }, TWO_FACTOR_SECRET, {expiresIn: `${TWO_FACTOR_MAX_AGE}m`});
    }

    verifyToken(token: string): { userId: string } & IClientMetaData {
        try {
            return jwt.verify(token, TWO_FACTOR_SECRET) as { userId: string } & IClientMetaData;
        } catch (err) {
            throw HttpError.iternalServerError();
        }
    }
}

export default new TwoFactorCodeService();

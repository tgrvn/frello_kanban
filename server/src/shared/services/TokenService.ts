import jwt from "jsonwebtoken";
import {
    ACCESS_MAX_AGE, ACTIVATE_MAX_AGE,
    JWT_ACCESS_SECRET, JWT_ACTIVATION_SECRET, JWT_PASSWORD_RESET_SECRET,
    JWT_REFRESH_SECRET, JWT_TWO_FACTOR_SECRET, PASSWORD_RESET_MAX_AGE,
    REFRESH_MAX_AGE, TWO_FACTOR_MAX_AGE,
} from "@/shared/utils/constants";
import HttpError from "@/response/HttpError";
import {UserDTO} from "@/prisma/types";
import {ITwoFactorPayload} from "@/modules/auth/services/TwoFactorCodeService";

class TokenService {
    generateAccessToken(user: UserDTO): string {
        return jwt.sign(user, JWT_ACCESS_SECRET, {expiresIn: `${ACCESS_MAX_AGE}m`})
    }

    generateRefreshToken(user: UserDTO): string {
        return jwt.sign(user, JWT_REFRESH_SECRET, {expiresIn: `${REFRESH_MAX_AGE}d`})
    }

    generateTwoFactorToken(payload: ITwoFactorPayload): string {
        return jwt.sign(payload, JWT_TWO_FACTOR_SECRET, {expiresIn: `${TWO_FACTOR_MAX_AGE}m`});
    }

    generateActivationToken(userId: string, deviceId: string): string {
        return jwt.sign({userId, deviceId}, JWT_ACTIVATION_SECRET, {expiresIn: `${ACTIVATE_MAX_AGE}m`})
    }

    generatePasswordResetEmail(userId: string): string {
        return jwt.sign({userId}, JWT_PASSWORD_RESET_SECRET, {expiresIn: `${PASSWORD_RESET_MAX_AGE}m`});
    }

    verifyToken<T>(token: string, secret: string, onFail?: () => HttpError): T {
        try {
            return jwt.verify(token, secret) as T;
        } catch (err) {
            throw onFail?.() ?? HttpError.iternalServerError();
        }
    }
}

export default new TokenService();
import {Request, Response, NextFunction} from "express";
import {COOKIE_CONFIG, IP, UA} from "@/shared/utils/constants";
import SessionRepository from "@/modules/auth/repositories/SessionRepository";
import {refreshUserToken} from "@/modules/auth/useCases/refreshUserToken";
import {registerUser} from "@/modules/auth/useCases/registerUser";
import {loginUser} from "@/modules/auth/useCases/loginUser";
import {activateUser} from "@/modules/auth/useCases/activateUser";
import ActivationTokenService from "@/modules/auth/services/ActivationTokenService";
import MailService from "@/mailer/MailService";
import HttpError from "@/response/HttpError";
import {sendActivationEmail} from "@/modules/auth/useCases/sendActivationEmail";
import {UserDTO} from "@/prisma/types";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ip = req.clientIp || IP;
            const userAgent = req.get('User-Agent') || UA;
            const deviceId = req.headers['x-device-id'] || 'abc123';
            const fingerprint = req.headers['x-fingerprint'] || '1234567890';

            const userData = await loginUser({ip, userAgent, deviceId, fingerprint, ...req.body});
            res.cookie(COOKIE_CONFIG.name, userData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome", {
                user: userData.user,
                accessToken: userData.accessToken
            });
        } catch (err) {
            res.clearCookie(COOKIE_CONFIG.name);
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ip = req.clientIp || IP;
            const userAgent = req.get('User-Agent') || UA;
            const deviceId = req.headers['x-device-id'] || 'abc123';
            const fingerprint = req.headers['x-fingerprint'] || '1234567890';

            const userData = await registerUser({deviceId, ip, userAgent, fingerprint, ...req.body});
            res.cookie(COOKIE_CONFIG.name, userData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome", {user: userData.user, accessToken: userData.accessToken});
        } catch (err) {
            res.clearCookie(COOKIE_CONFIG.name);
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.cookies[COOKIE_CONFIG.name];
            const ip = req.clientIp || IP;
            const userAgent = req.get('User-Agent') || UA;
            const deviceId = req.headers['x-device-id'] || 'abc123';
            const fingerprint = req.headers['x-fingerprint'] || '1234567890';

            const sessionData = await refreshUserToken({token, ip, userAgent, deviceId, fingerprint});

            res.cookie(COOKIE_CONFIG.name, sessionData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome back", {
                user: sessionData.user,
                accessToken: sessionData.accessToken
            });
        } catch (err) {
            res.clearCookie(COOKIE_CONFIG.name);
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.cookies[COOKIE_CONFIG.name];
            await SessionRepository.deleteByToken(token);
            res.clearCookie(COOKIE_CONFIG.name);

            res.success("success logout");
        } catch (err) {
            res.clearCookie(COOKIE_CONFIG.name);
            next(err);
        }
    }

    async sendActivationEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as UserDTO;
            await sendActivationEmail(user);

            res.success("activation email sent");
        } catch (err) {
            next(err);
        }
    }


    async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.params.token;
            await activateUser(token);

            res.success("user activated");
        } catch (err) {
            res.clearCookie(COOKIE_CONFIG.name);
            next(err);
        }
    }
}

export default new AuthController();
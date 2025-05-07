import {Request, Response, NextFunction} from "express";
import {COOKIE_CONFIG} from "@/shared/utils/constants";
import SessionRepository from "@/modules/auth/repositories/SessionRepository";
import {refreshUserToken} from "@/modules/auth/useCases/refreshUserToken";
import {registerUser} from "@/modules/auth/useCases/registerUser";
import {loginUser} from "@/modules/auth/useCases/loginUser";
import {activateUser} from "@/modules/auth/useCases/activateUser";
import {UserDTO} from "@/prisma/types";
import MailService from "@/mailer/MailService";
import ActivationTokenService from "@/modules/auth/services/ActivationTokenService";
import {verifyTwoFactorCode} from "@/modules/auth/useCases/verifyTwoFactorCode";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = await loginUser({
                ...req.body, ...req.clientMetaData
            });
            res.cookie(COOKIE_CONFIG.name, userData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome", {
                user: userData.user,
                accessToken: userData.accessToken
            });
        } catch (err) {
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = await registerUser({...req.clientMetaData, ...req.body});
            res.cookie(COOKIE_CONFIG.name, userData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome", {user: userData.user, accessToken: userData.accessToken});
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.cookies[COOKIE_CONFIG.name];

            const sessionData = await refreshUserToken({token, ...req.clientMetaData});

            res.cookie(COOKIE_CONFIG.name, sessionData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome back", {
                user: sessionData.user,
                accessToken: sessionData.accessToken
            });
        } catch (err) {
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
            next(err);
        }
    }

    async sendActivationEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as UserDTO;

            const token = await ActivationTokenService.create(user.id, req.clientMetaData.deviceId);
            await MailService.sendActivationEmail(user.email, token);

            res.success("activation email sent");
        } catch (err) {
            next(err);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.params.token;
            await activateUser({token, ...req.clientMetaData});

            res.success("user activated");
        } catch (err) {
            next(err);
        }
    }

    // async generateTwoFactorCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const user = req.user as UserDTO;
    //
    //         const twoFactorData = await TwoFactorCodeService.generate(user.id, req.clientMetaData);
    //         await MailService.sendTwoFactorCode(user.email, twoFactorData.code);
    //
    //         res.success("code sent to your email");
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    async verifyTwoFactorCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {code, token} = req.body;

            const sessionData = await verifyTwoFactorCode(token, code);

            res.cookie(COOKIE_CONFIG.name, sessionData.refreshToken, COOKIE_CONFIG.options);

            res.success("welcome back", {
                user: sessionData.user,
                accessToken: sessionData.accessToken
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
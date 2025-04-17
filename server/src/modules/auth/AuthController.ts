import {Request, Response, NextFunction} from "express";
import SuccessResponse from "@/response/SuccessResponse";
import {COOKIE_CONFIG, IP, UA} from "@/utils/constants";
import {loginUser, refreshUser, registerUser} from "@/modules/auth/useCases/authUseCases";
import SessionRepository from "@/modules/auth/SessionRepository";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ip = req.clientIp || IP;
            const ua = req.get('User-Agent') || UA;
            // const {fingerprint} = req.body;
            const fingerprint = '1234567890';

            const userData = await loginUser({ip, ua, fingerprint, ...req.body});

            res.cookie(COOKIE_CONFIG.name, userData.refreshToken, COOKIE_CONFIG.options);
            res.status(200)
                .json(SuccessResponse.success("Добро пожаловать", {
                    user: userData.user,
                    accessToken: userData.accessToken
                }));
        } catch (err) {
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ip = req.clientIp || IP;
            const ua = req.get('User-Agent') || UA;
            // const {fingerprint} = req.body;
            const fingerprint = '1234567890';

            const userData = await registerUser({ip, ua, fingerprint, ...req.body});

            res.cookie(COOKIE_CONFIG.name, userData.refreshToken, COOKIE_CONFIG.options);
            res.status(200)
                .json(SuccessResponse.success("Добро пожаловать", {
                    user: userData.user,
                    accessToken: userData.accessToken
                }));
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ip = req.clientIp || IP;
            const ua = req.get('User-Agent') || UA;
            const token = req.cookies[COOKIE_CONFIG.name];
            // const {fingerprint} = req.body;
            const fingerprint = '1234567890';

            const sessionData = await refreshUser({token, ip, ua, fingerprint});

            res.cookie(COOKIE_CONFIG.name, sessionData.refreshToken, COOKIE_CONFIG.options);
            res.status(200)
                .json(SuccessResponse.success("С возвращением", {
                    user: sessionData.user,
                    accessToken: sessionData.accessToken
                }));
        } catch (err) {
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.cookies[COOKIE_CONFIG.name];

            await SessionRepository.deleteByToken(token);

            res.json(SuccessResponse.success("разлогин успешен"));
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
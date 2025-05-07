import {Router} from "express";
import AuthController from "@/modules/auth/AuthController";
import authentication from "@/middlewares/authentication";
import dataValidation from "@/middlewares/dataValidation";
import {
    loginSchema,
    registrationSchema,
    sendPasswordResetEmailSchema,
    verifyTokenSchema
} from "@/modules/auth/authValidation";

const authRouter = Router();

authRouter.post("/login", [dataValidation(loginSchema)], AuthController.login);
authRouter.post("/register", [dataValidation(registrationSchema)], AuthController.register);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", [authentication], AuthController.logout);

authRouter.post("/activate/send-email", [authentication], AuthController.sendActivationEmail);
// change to post
authRouter.get("/activate/:token", AuthController.activate);

authRouter.post("/forgot-password/send-email", [dataValidation(sendPasswordResetEmailSchema)], AuthController.sendPasswordResetEmail);
authRouter.post("/forgot-password/reset-password/:token", AuthController.resetForgottenPassword);

authRouter.post("/two-factor/verify", [dataValidation(verifyTokenSchema)], AuthController.verifyTwoFactorCode)
;

export default authRouter;
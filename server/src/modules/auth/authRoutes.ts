import {Router} from "express";
import AuthController from "@/modules/auth/AuthController";
import authentication from "@/middlewares/authentication";
import dataValidation from "@/middlewares/dataValidation";
import {loginSchema, registrationSchema} from "@/modules/auth/authValidation";

const authRouter = Router();

authRouter.post("/login", [dataValidation(loginSchema)], AuthController.login);
authRouter.post("/register", [dataValidation(registrationSchema)], AuthController.register);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", [authentication], AuthController.logout);

export default authRouter;
import {NextFunction, Response, Request, Router} from "express";
import authRouter from "@/modules/auth/authRoutes";
import ErrorResponse from "@/response/ErrorResponse";
import authentication from "@/middlewares/authentication";

const router = Router();

router.use('/auth', authRouter);

router.get('/boards', [authentication], (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: "welcome", userId: req?.user?.id});
})

router.use((req: Request, res: Response, next: NextFunction) => {
    throw ErrorResponse.notFound();
});

export default router;
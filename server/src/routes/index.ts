import {NextFunction, Response, Request, Router} from "express";
import authRouter from "@/routes/authRoutes";
import ErrorResponse from "@/response/ErrorResponse";

const router = Router();

router.use('/auth', authRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
    throw ErrorResponse.notFound();
});

export default router;
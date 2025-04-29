import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";
import ErrorResponse from "@/response/ErrorResponse";

const errorHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err instanceof ZodError) {
        const errorMessages = err.errors.map((issue) => ({
            message: issue.message,
            path: issue.path[0],
        }));

        res.status(400).json(ErrorResponse.badRequest("ошибка валидации", errorMessages));
        return;
    }

    if (err instanceof ErrorResponse) {
        res.status(err.code).json({
            status: err.status,
            code: err.code,
            message: err.message,
            errors: err.errors,
        });
        return;
    }

    res.status(500).json(ErrorResponse.iternalServerError());
}

export default errorHandler;
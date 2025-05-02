import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";
import HttpError from "@/response/HttpError";

const errorHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err instanceof ZodError) {
        const details = err.errors.map((issue) => ({
            message: issue.message,
            path: issue.path[0],
        }));

        res.status(400).json(HttpError.validationError("ошибка валидации", details));
        return;
    }

    if (err instanceof HttpError) {
        const errorObject = new HttpError(err.statusCode, err.error.message, err.error.code, err.error.details);

        res.status(err.statusCode).json(errorObject);
        return;
    }

    res.status(500).json(HttpError.iternalServerError());
}

export default errorHandler;
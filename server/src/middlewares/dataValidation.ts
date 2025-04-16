import {NextFunction, Request, Response} from "express";
import {ZodSchema} from "zod";

const dataValidation = function (schema: ZodSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (err) {
            next(err);
        }
    }
}

export default dataValidation;
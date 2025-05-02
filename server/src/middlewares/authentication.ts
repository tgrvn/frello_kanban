import {NextFunction, Request, Response} from "express";
import HttpError from "@/response/HttpError";
import {JWT_ACCESS_SECRET} from "@/shared/utils/constants";
import jwt from "jsonwebtoken";

const authentication = function (req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) throw HttpError.unauthenticated("токен отсутсвует");
    const token = header.split(" ")[1];

    try {
        (req as any).user = jwt.verify(token, JWT_ACCESS_SECRET);

        next();
    } catch (e) {
        next(HttpError.unauthenticated())
    }
}

export default authentication;
import {NextFunction, Request, Response} from "express";
import ErrorResponse from "@/response/ErrorResponse";
import {JWT_SECRET} from "@/utils/constants";
import jwt from "jsonwebtoken";
import {JwtUserPayload} from "@/types/shared/JwtUserPayload";

const authentication = function (req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) throw ErrorResponse.unauthorized("токен отсутсвует");
    const token = header.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
        (req as any).user = payload.user;

        next();
    } catch (e) {
        next(ErrorResponse.unauthorized())
    }
}

export default authentication;
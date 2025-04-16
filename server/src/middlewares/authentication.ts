import {NextFunction, Request, Response} from "express";

const authentication = function (req: Request, res: Response, next: NextFunction) {
    console.log("auth middleware");
    next();
}

export default authentication;
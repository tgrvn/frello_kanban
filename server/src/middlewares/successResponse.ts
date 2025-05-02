import {NextFunction, Request, Response} from "express";

const successResponse = function (req: Request, res: Response, next: NextFunction) {
    res.success = (message: string, data?: any) => res.status(200).json({
        success: true,
        message,
        data
    });

    next();
}

export default successResponse;
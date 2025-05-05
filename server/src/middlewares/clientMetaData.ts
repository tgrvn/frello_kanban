import {NextFunction, Request, Response} from "express";
import {IP, UA} from "@/shared/utils/constants";

const clientMetaData = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.clientIp || IP;
    const userAgent = req.get('User-Agent') || UA;
    const deviceId = String(req.headers['x-device-id'] || 'abc123');
    const fingerprint = String(req.headers['x-fingerprint'] || '1234567890');

    req.clientMetaData = {ip, userAgent, deviceId, fingerprint};
    next();
}

export default clientMetaData;

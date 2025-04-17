import {JwtUserPayload} from "../shared/JwtUserPayload";

declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}
import {UserDTO} from "@/prisma/types";

interface IClientMetaData {
    ip: string;
    userAgent: string;
    deviceId: string;
    fingerprint: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserDTO;
            clientMetaData: IClientMetaData;
        }

        interface Response {
            success: (message: string, data?: any) => Response;
        }
    }
}

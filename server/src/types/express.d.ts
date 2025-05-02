import {UserDTO} from "@/prisma/types";

declare global {
    namespace Express {
        interface Request {
            user?: UserDTO;
        }

        interface Response {
            success: (message: string, data?: any) => Response;
        }
    }
}

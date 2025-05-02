import {daysToMs, envResolverNumber, envResolverString} from "@/shared/utils/helpers";

export const DATABASE_URL = envResolverString("DATABASE_URL");

export const JWT_ACCESS_SECRET = envResolverString("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = envResolverString("JWT_REFRESH_SECRET");
export const JWT_ACTIVATION_SECRET = envResolverString("JWT_ACTIVATION_SECRET");


export const MAIL_HOST = envResolverString("MAIL_HOST");
export const MAIL_PORT = envResolverNumber("MAIL_PORT");

export const FRONTEND_URL = envResolverString("FRONTEND_URL");

export const IP = "0.0.0.0";
export const UA = "UnknownUserAgent";

export const ACCESS_MAX_AGE = 15;
export const REFRESH_MAX_AGE = 30;
export const COOKIE_CONFIG = {
    name: "refToken",
    options: {
        maxAge: daysToMs(REFRESH_MAX_AGE),
        httpOnly: true,
        // secure: true,
        sameSite: true
    }
};

export enum statusCodes {
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    VALIDATION_ERROR = 403,
}

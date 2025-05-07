import {daysToMs, envResolverNumber, envResolverString} from "@/shared/utils/helpers";

export const DATABASE_URL = envResolverString("DATABASE_URL");

export const JWT_ACCESS_SECRET = envResolverString("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = envResolverString("JWT_REFRESH_SECRET");
export const JWT_ACTIVATION_SECRET = envResolverString("JWT_ACTIVATION_SECRET");
export const JWT_TWO_FACTOR_SECRET = envResolverString("JWT_TWO_FACTOR_SECRET");
export const JWT_PASSWORD_RESET_SECRET = envResolverString("JWT_PASSWORD_RESET_SECRET");

export const ACCESS_MAX_AGE = 15;
export const REFRESH_MAX_AGE = 30;
export const TWO_FACTOR_MAX_AGE = 5;
export const ACTIVATE_MAX_AGE = 15;
export const PASSWORD_RESET_MAX_AGE = 15;


export const MAIL_HOST = envResolverString("MAIL_HOST");
export const MAIL_PORT = envResolverNumber("MAIL_PORT");

export const FRONTEND_URL = envResolverString("FRONTEND_URL");

export const IP = "0.0.0.0";
export const UA = "UnknownUserAgent";

export const COOKIE_CONFIG = {
    name: "refToken",
    options: {
        maxAge: daysToMs(REFRESH_MAX_AGE),
        httpOnly: true,
        // secure: true,
        sameSite: true
    }
};
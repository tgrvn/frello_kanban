import {daysToMs, envResolver} from "@/utils/helpers";

export const DATABASE_URL = envResolver("DATABASE_URL");
export const JWT_SECRET = envResolver("JWT_SECRET");

export const IP = "0.0.0.0";
export const UA = "UnknownUserAgent";

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

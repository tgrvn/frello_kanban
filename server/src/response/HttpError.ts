export type HttpErrorsPayload = { [key: string]: any };

export enum HttpErrorCode {
    ITERNAL_SERVER_ERROR = 'ITERNAL_SERVER_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    TWO_FACTOR_ERROR = 'TWO_FACTOR_ERROR'
}

interface IErrorObject {
    code: HttpErrorCode;
    message: string;
    details?: HttpErrorsPayload[] | HttpErrorsPayload;
}

class HttpError extends Error {
    public readonly status: boolean = false;
    public readonly statusCode: number;
    public readonly error: IErrorObject;

    constructor(
        statusCode: number,
        message: string,
        code: HttpErrorCode,
        details?: HttpErrorsPayload[] | HttpErrorsPayload
    ) {
        super();
        this.statusCode = statusCode;
        this.error = {code, message, details};
    }

    static iternalServerError(
        message: string = "iternal server error",
        code: HttpErrorCode = HttpErrorCode.ITERNAL_SERVER_ERROR
    ): HttpError {
        return new HttpError(500, message, code);
    }

    static validationError(
        message: string = "validation error",
        details?: HttpErrorsPayload[],
        code: HttpErrorCode = HttpErrorCode.VALIDATION_ERROR,
    ): HttpError {
        return new HttpError(400, message, code, details);
    }

    static notFound(): HttpError {
        return new HttpError(404, "resource not found", HttpErrorCode.NOT_FOUND);
    }

    static unauthenticated(
        message: string = "unauthenticated",
        code: HttpErrorCode = HttpErrorCode.UNAUTHENTICATED
    ): HttpError {
        return new HttpError(401, message, code);
    }

    static twoFactorRequired(
        token: string,
        message: string = "2FA required",
        code: HttpErrorCode = HttpErrorCode.TWO_FACTOR_ERROR,
    ): HttpError {
        {
            return new HttpError(499, message, code, {token});
        }
    }
}

export default HttpError;
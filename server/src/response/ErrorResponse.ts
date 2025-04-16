class ErrorResponse<T> extends Error {
    public readonly status: boolean = false;
    public readonly code: number;
    public readonly message: string;
    public readonly errors?: T;

    constructor(code: number, message: string, errors?: T) {
        super();
        this.code = code;
        this.message = message;
        if (errors) this.errors = errors;
    }

    static iternalServerError<T>(message: string = "iternal server error"): ErrorResponse<T> {
        return new ErrorResponse(500, message);
    }

    static badRequest<T>(message: string = "ошибка валидации", errors?: T): ErrorResponse<T> {
        return new ErrorResponse(400, message, errors);
    }

    static notFound<T>(): ErrorResponse<T> {
        return new ErrorResponse<T>(404, "ресурс не найден");
    }

    static unauthorized<T>(message: string = "пользователь не авторизирован"): ErrorResponse<T> {
        return new ErrorResponse(401, message);
    }
}

export default ErrorResponse;
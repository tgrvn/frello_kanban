interface ISuccessResponse<T> {
    success: boolean
    message: string
    data?: T
    meta?: IMeta
}

interface IMeta {
    page: string
}

class SuccessResponse<T> implements ISuccessResponse<T> {
    public readonly success: boolean = true;
    public readonly code: number = 200;
    public readonly message: string;
    public readonly data?: T;
    public readonly meta?: IMeta;

    constructor(message: string, data?: T, meta?: IMeta) {
        this.message = message;

        if (data) this.data = data;
        if (meta) this.meta = meta;
    }

    static success<T>(message: string = "Запрос успешен", data?: T, meta?: IMeta): SuccessResponse<T> {
        return new SuccessResponse<T>(message, data, meta);
    }

    toJSON() {
        const res: ISuccessResponse<any> = {
            success: this.success,
            message: this.message,
        }

        if (this.data) res.data = this.data;
        if (this.meta) res.meta = this.meta;

        return res;
    }
}

export default SuccessResponse;
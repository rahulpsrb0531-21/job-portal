class CustomError extends Error {
    constructor(name, message, code, extra) {
        super();
        Error.captureStackTrace(this, this.constructor);
        (this.code = code),
            (this.name = `${name}`),
            (this.message = message);
        if (extra) this.additional = extra;
    }
}

export default CustomError;


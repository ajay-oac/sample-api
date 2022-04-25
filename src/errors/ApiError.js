module.exports = class ApiError extends Error {
    constructor(message, code, responseStatusCode) {
        super(message);
        this.code = code;
        this.responseStatusCode = responseStatusCode;
    }

    getError() {
        return {
            error: {
                message: this.message,
                code: this.code
            }
        }
    }
}

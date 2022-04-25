const ApiError = require("./ApiError");
const { SERVICE_NOT_AVAILABLE } = require('./errorConstants');

module.exports = class ServiceNotAvailableError extends ApiError {
    constructor(message) {
        super(message, SERVICE_NOT_AVAILABLE, 500);
    }
}

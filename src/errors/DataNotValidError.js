const ApiError = require("./ApiError");
const { DATA_NOT_VALID } = require('./errorConstants');

module.exports = class DataNotValidError extends ApiError {
    constructor(message) {
        super(message, DATA_NOT_VALID, 422);
    }
}

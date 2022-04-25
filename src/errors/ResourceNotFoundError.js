const ApiError = require("./ApiError");
const { RESOURCE_NOT_FOUND } = require('./errorConstants');

module.exports = class ResourceNotFoundError extends ApiError {
    constructor(message) {
        super(message, RESOURCE_NOT_FOUND, 404);
    }
}

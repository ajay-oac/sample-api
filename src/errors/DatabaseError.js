const ApiError = require("./ApiError");
const { DATABASE_ERROR } = require('./errorConstants');

module.exports = class DatabaseError extends ApiError {
    constructor(message) {
        super(message, DATABASE_ERROR, 500);
    }
}

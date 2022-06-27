"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const response_code_enum_1 = require("../enums/response-code.enum");
const response_builder_1 = require("../utils/response-builder");
class ApiError extends Error {
    constructor(errorCode, message) {
        super(message);
        this._errorCode = errorCode;
        this._message = message;
    }
    get errorCode() {
        return this._errorCode;
    }
    get message() {
        return this._message || (0, response_code_enum_1.getMessage)(this._errorCode);
    }
    debug(data) {
        // if (config.environment == 'development') {
        this._debug = data;
        // }
        return this;
    }
    toResponse() {
        return new response_builder_1.ResponseBuilder()
            .error()
            .withCode(this._errorCode)
            .withMessage(this.message)
            .withDebug(this._debug)
            .build();
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api.error.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
const response_code_enum_1 = require("../enums/response-code.enum");
const response_type_enum_1 = require("../enums/response-type.enum");
class ResponseBuilder {
    constructor(data) {
        this.payload = {
            type: response_type_enum_1.ResponseTypeEnum.SUCCESS,
        };
        this.payload.data = data;
    }
    success() {
        this.payload.type = response_type_enum_1.ResponseTypeEnum.SUCCESS;
        return this;
    }
    error() {
        this.payload.type = response_type_enum_1.ResponseTypeEnum.ERROR;
        return this;
    }
    withCode(code) {
        this.payload.code = code;
        this.payload.message = (0, response_code_enum_1.getMessage)(code);
        return this;
    }
    withMessage(message) {
        this.payload.message = message;
        return this;
    }
    withData(data) {
        this.payload.data = data;
        return this;
    }
    withMeta(meta) {
        this.payload.meta = meta;
        return this;
    }
    withDebug(debug) {
        this.payload.__debug__ = debug;
        return this;
    }
    build() {
        return this.payload;
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map
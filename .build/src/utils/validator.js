"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAndValidate = void 0;
const api_error_1 = require("../models/api.error");
const response_code_enum_1 = require("../enums/response-code.enum");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function getMessage(errors) {
    const error = errors[0];
    if (!error)
        return 'Unknown error';
    if (!error.children || !error.children.length) {
        return Object.values(error.constraints)[0];
    }
    return getMessage(error.children);
}
async function transformAndValidate(cls, plain, validatorOptions = {}) {
    const transformed = (0, class_transformer_1.plainToClass)(cls, plain);
    if (Array.isArray(transformed)) {
        throw new api_error_1.ApiError(response_code_enum_1.ResponseCodeEnum.BAD_REQUEST, 'Only accept object');
    }
    const errors = await (0, class_validator_1.validate)(transformed, Object.assign({ whitelist: true }, validatorOptions));
    if (errors.length) {
        throw new api_error_1.ApiError(response_code_enum_1.ResponseCodeEnum.BAD_REQUEST, getMessage(errors)).debug(errors);
    }
    return transformed;
}
exports.transformAndValidate = transformAndValidate;
//# sourceMappingURL=validator.js.map
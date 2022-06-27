"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.ResponseCodeEnum = void 0;
const error_message_enum_1 = require("./error-message.enum");
var ResponseCodeEnum;
(function (ResponseCodeEnum) {
    ResponseCodeEnum[ResponseCodeEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseCodeEnum[ResponseCodeEnum["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ResponseCodeEnum[ResponseCodeEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseCodeEnum[ResponseCodeEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseCodeEnum[ResponseCodeEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseCodeEnum[ResponseCodeEnum["DOWNLOAD_ERROR"] = 600] = "DOWNLOAD_ERROR";
})(ResponseCodeEnum = exports.ResponseCodeEnum || (exports.ResponseCodeEnum = {}));
const CODE_MESSAGES = {
    404: error_message_enum_1.ErrorMessageEnum.NOT_FOUND,
    500: error_message_enum_1.ErrorMessageEnum.INTERNAL_SERVER_ERROR,
    401: error_message_enum_1.ErrorMessageEnum.UNAUTHORIZED,
    403: error_message_enum_1.ErrorMessageEnum.FORBIDDEN,
    400: error_message_enum_1.ErrorMessageEnum.BAD_REQUEST,
    600: error_message_enum_1.ErrorMessageEnum.DOWNLOAD_ERROR,
};
const getMessage = (code) => {
    return CODE_MESSAGES[code];
};
exports.getMessage = getMessage;
//# sourceMappingURL=response-code.enum.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = void 0;
const validator_1 = require("../utils/validator");
const validateMiddleware = (options) => {
    return async (request, _res, next) => {
        if (options.body) {
            request.body = await (0, validator_1.transformAndValidate)(options.body, request.body);
        }
        if (options.query) {
            request.query = await (0, validator_1.transformAndValidate)(options.query, request.query);
        }
        await next();
    };
};
exports.validateMiddleware = validateMiddleware;
//# sourceMappingURL=validate.middleware.js.map
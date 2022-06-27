"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const typedi_1 = require("typedi");
const user_service_1 = require("../services/user.service");
const validate_middleware_1 = require("../middleware/validate.middleware");
const statisticals_query_1 = require("../models/statisticals.query");
const response_builder_1 = require("../utils/response-builder");
const api_enum_1 = require("../enums/api-enum");
const UserRoute = (0, express_1.Router)({
    mergeParams: true,
});
exports.UserRoute = UserRoute;
UserRoute.get(api_enum_1.APIEnum.GET_LIST_USER, (0, validate_middleware_1.validateMiddleware)({
    query: statisticals_query_1.ListUserQuery,
}), async (_req, res) => {
    const userService = typedi_1.Container.get(user_service_1.UserService);
    const result = await userService.getListUser();
    res.send(new response_builder_1.ResponseBuilder(result).build());
});
//# sourceMappingURL=user.controller.js.map
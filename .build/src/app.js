"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./user/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use('/user', routes_1.default);
const server = (0, serverless_http_1.default)(app);
async function handler(context, req) {
    context.res = await server(context, req);
}
exports.handler = handler;
//# sourceMappingURL=app.js.map
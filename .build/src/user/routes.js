"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router({
    mergeParams: true,
});
routes.get("/", async (req, res) => {
    // const scanParams = {
    //   Limit: req.query.limit,
    //   TableName: process.env.DYNAMODB_USER_TABLE,
    // };
    console.log(res, "|222222222222222222222222222");
    // const dynamodb = new AWS.DynamoDB.DocumentClient();
    // const result = await dynamodb.scan(scanParams).promise();
    res.end();
});
routes.post("/", async (req, res) => {
    console.log(req.body, "|11111111111111111111111111111");
    const dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
    const putParams = {
        TableName: process.env.DYNAMODB_USER_TABLE,
        Item: {
            primary_key: (0, uuid_1.v4)(),
            ...req.body,
        },
    };
    const result = await dynamodb.put(putParams).promise();
    res.status(200).json({
        message: "Create user successfully!",
        data: result,
    });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map
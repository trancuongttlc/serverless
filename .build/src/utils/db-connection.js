"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_1 = __importDefault(require("aws-sdk/clients/dynamodb"));
class DynamoDBConnection {
    static Client() {
        if (this.client) {
            return this.client;
        }
        else {
            this.client = new dynamodb_1.default.DocumentClient();
            return this.client;
        }
    }
}
exports.default = DynamoDBConnection;
//# sourceMappingURL=db-connection.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = __importDefault(require("./db-connection"));
const lodash_1 = require("lodash");
class DbHelper {
    constructor() {
        this.client = db_connection_1.default.Client();
    }
    async insertOrReplace(tableName, item) {
        const params = {
            TableName: tableName,
            Item: item,
        };
        await this.client.put(params).promise();
        return item;
    }
    async findById(tableName, key) {
        const params = {
            Key: key,
            TableName: tableName,
        };
        const result = await this.client.get(params).promise();
        if ((0, lodash_1.isEmpty)(result)) {
            return null;
        }
        else {
            return result.Item;
        }
    }
    async getWhereIdIn(tableName, keys) {
        const params = { RequestItems: {} };
        params.RequestItems[tableName] = { Keys: keys };
        try {
            const result = await this.client.batchGet(params).promise();
            const items = result.Responses[tableName];
            if ((0, lodash_1.isEmpty)(items)) {
                return [];
            }
            return items;
        }
        catch (err) {
            return [];
        }
    }
    async list(tableName, limit, keyName, nextToken) {
        if (!limit) {
            limit = 10;
        }
        const params = {
            Limit: limit,
            TableName: tableName,
        };
        if (nextToken) {
            params.ExclusiveStartKey = { [keyName]: nextToken };
        }
        const result = await this.client.scan(params).promise();
        let newNextToken = null;
        if ((0, lodash_1.has)(result, "LastEvaluatedKey")) {
            newNextToken = result.LastEvaluatedKey[keyName];
        }
        return {
            nextToken: newNextToken,
            items: result.Items,
        };
    }
    async query(tableName, indexName, hashIndexOpts) {
        const { attrName, attrValue, operator } = hashIndexOpts;
        const params = {
            TableName: tableName,
            IndexName: indexName,
            KeyConditionExpression: `${attrName} ${operator} :hkey`,
            ExpressionAttributeValues: {
                ":hkey": attrValue,
            },
        };
        const result = await this.client.query(params).promise();
        return result.Items;
    }
    async updateById(tableName, key, data) {
        const updateExpressions = [];
        const expressionsValues = {};
        const expressionAttributeNames = {};
        for (const fieldName of Object.keys(data)) {
            const fieldValue = data[fieldName];
            updateExpressions.push(`#${fieldName} = :${fieldName}`);
            expressionsValues[`:${fieldName}`] = fieldValue;
            expressionAttributeNames[`#${fieldName}`] = fieldName;
        }
        const updateExpression = "set " + updateExpressions.join(", ");
        const params = {
            TableName: tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionsValues,
            ExpressionAttributeNames: expressionAttributeNames,
        };
        await this.client.update(params).promise();
    }
    async deleteById(tableName, key) {
        const params = {
            Key: key,
            TableName: tableName,
        };
        await this.client.delete(params).promise();
    }
}
exports.default = DbHelper;
//# sourceMappingURL=db-helper.js.map
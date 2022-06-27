import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";
import DynamoDBConnection from "./db-connection";
import { isEmpty, has } from "lodash";

export default class DbHelper {
  public client: DynamoDB.DocumentClient;

  constructor() {
    this.client = DynamoDBConnection.Client();
  }

  public async insertOrReplace<T>(tableName: string, item: T): Promise<T> {
    const params: DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    await this.client.put(params).promise();
    return item;
  }

  public async findById<T>(tableName: string, key: any): Promise<T> {
    const params = {
      Key: key,
      TableName: tableName,
    };

    const result = await this.client.get(params).promise();

    if (isEmpty(result)) {
      return null;
    } else {
      return <T>result.Item;
    }
  }

  public async getWhereIdIn<T>(tableName: string, keys: any[]): Promise<T[]> {
    const params = { RequestItems: {} };
    params.RequestItems[tableName] = { Keys: keys };

    try {
      const result = await this.client.batchGet(params).promise();
      const items = result.Responses[tableName];
      if (isEmpty(items)) {
        return [];
      }
      return <T[]>items;
    } catch (err) {
      return [];
    }
  }

  public async list<T>(
    tableName: string,
    limit?: number,
    keyName?: string,
    nextToken?: any
  ): Promise<{
    nextToken: string;
    items: T[];
  }> {
    if (!limit) {
      limit = 10;
    }

    const params: DocumentClient.ScanInput = {
      Limit: limit,
      TableName: tableName,
    };
    if (nextToken) {
      params.ExclusiveStartKey = { [keyName]: nextToken };
    }

    const result = await this.client.scan(params).promise();

    let newNextToken = null;
    if (has(result, "LastEvaluatedKey")) {
      newNextToken = result.LastEvaluatedKey[keyName];
    }

    return {
      nextToken: newNextToken,
      items: <T[]>result.Items,
    };
  }

  public async query<T>(
    tableName: string,
    indexName: string,
    hashIndexOpts: any
  ): Promise<T[]> {
    const { attrName, attrValue, operator } = hashIndexOpts;

    const params: DocumentClient.QueryInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: `${attrName} ${operator} :hkey`,
      ExpressionAttributeValues: {
        ":hkey": attrValue,
      },
    };

    const result = await this.client.query(params).promise();

    return <T[]>result.Items;
  }

  public async updateById(
    tableName: string,
    key: any,
    data: any
  ): Promise<void> {
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

    const params: DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionsValues,
      ExpressionAttributeNames: expressionAttributeNames,
    };

    await this.client.update(params).promise();
  }

  public async deleteById(tableName: string, key: any): Promise<void> {
    const params: DocumentClient.DeleteItemInput = {
      Key: key,
      TableName: tableName,
    };
    await this.client.delete(params).promise();
  }
}

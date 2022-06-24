import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import express from "express";

const routes = express.Router({
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
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: {
      primary_key: uuidv4(),
      ...req.body,
    },
  };
  const result = await dynamodb.put(putParams).promise();

  res.status(200).json({
    message: "Create user successfully!",
    data: result,
  });
});

export default routes;

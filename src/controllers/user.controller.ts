import { Router, Request, Response } from "express";
import { Container } from "typedi";
import AWS from "aws-sdk";

import { UserService } from "../services/user.service";
import { validateMiddleware } from "../middleware/validate.middleware";
import { ListUserQuery } from "../models/user.query";
import { ResponseBuilder } from "../utils/response-builder";
import { APIEnum } from "../enums/api-enum";
import { config } from "../config/config";

AWS.config.update({
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const UserController = Router({
  mergeParams: true,
});

UserController.get(
  APIEnum.GET_LIST_USER,
  validateMiddleware({
    query: ListUserQuery,
  }),
  async (req: Request, res: Response): Promise<void> => {
    const userService = Container.get<UserService>(UserService);
    const result = await userService.getListUser(req.query);
    res.send(new ResponseBuilder<any>(result).build());
  }
);

UserController.post(
  APIEnum.UPLOAD_FILE,
  async (req: Request, res: Response): Promise<void> => {
    await s3
      .putObject({
        Bucket: config.BUCKET,
        Key: req.files.file.name,
        Body: req.files.file.data,
      })
      .promise();
    res.json({ mess: "Upload success" });
  }
);

export { UserController };

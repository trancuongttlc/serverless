import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { UserService } from "../services/user.service";
import { validateMiddleware } from "../middleware/validate.middleware";
import { ListUserQuery } from "../models/user.query";

import { ResponseBuilder } from "../utils/response-builder";

import { APIEnum } from "../enums/api-enum";

const UserRoute = Router({
  mergeParams: true,
});

UserRoute.get(
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

export { UserRoute };

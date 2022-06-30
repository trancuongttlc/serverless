import { ClassType } from "class-transformer/ClassTransformer";
import { Request, Response, Next } from "express";
import { transformAndValidate } from "../utils/validator";

type ValidationOptions = {
  query?: ClassType<unknown>;
  body?: ClassType<unknown>;
};

export const validateMiddleware = (options: ValidationOptions) => {
  return async (request: Request, _res: Response, next: Next) => {
    if (options.body) {
      request.body = await transformAndValidate(options.body, request.body);
    }

    if (options.query) {
      request.query = await transformAndValidate(options.query, request.query);
    }

    await next();
  };
};

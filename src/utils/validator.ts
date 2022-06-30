import { ApiError } from "../models/api.error";
import { ResponseCodeEnum } from "../enums/response-code.enum";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { validate, ValidationError, ValidatorOptions } from "class-validator";

function getMessage(errors: ValidationError[]): string {
  const error = errors[0];
  if (!error) return "Unknown error";

  if (!error.children || !error.children.length) {
    return Object.values(error.constraints)[0];
  }

  return getMessage(error.children);
}

export async function transformAndValidate<T>(
  cls: ClassType<T>,
  plain: any | any[],
  validatorOptions: ValidatorOptions = {}
): Promise<T> {
  const transformed = plainToClass(cls, plain);

  if (Array.isArray(transformed)) {
    throw new ApiError(ResponseCodeEnum.BAD_REQUEST, "Only accept object");
  }

  const errors = await validate(
    transformed,
    Object.assign({ whitelist: true }, validatorOptions)
  );

  if (errors.length) {
    throw new ApiError(ResponseCodeEnum.BAD_REQUEST, getMessage(errors)).debug(
      errors
    );
  }

  return transformed;
}

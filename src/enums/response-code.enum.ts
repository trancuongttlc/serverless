import { ErrorMessageEnum } from './error-message.enum';

export enum ResponseCodeEnum {
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  DOWNLOAD_ERROR = 600,
}

const CODE_MESSAGES = {
  404: ErrorMessageEnum.NOT_FOUND,
  500: ErrorMessageEnum.INTERNAL_SERVER_ERROR,
  401: ErrorMessageEnum.UNAUTHORIZED,
  403: ErrorMessageEnum.FORBIDDEN,
  400: ErrorMessageEnum.BAD_REQUEST,
  600: ErrorMessageEnum.DOWNLOAD_ERROR,
};

export const getMessage = (code: ResponseCodeEnum): string => {
  return CODE_MESSAGES[code];
};

import type { CustomError } from '@shared/application/errors';
import type { ICustomHttpReply } from '../http';

export class ControllerResponse {
  static success<T>(data?: T): ICustomHttpReply<T | undefined> {
    return {
      statusCode: 200,
      body: { data },
    };
  }

  static created<T>(data: T): ICustomHttpReply<T | undefined> {
    return {
      statusCode: 201,
      body: { data },
    };
  }

  static noContent(): ICustomHttpReply<undefined> {
    return {
      statusCode: 204,
      body: {},
    };
  }

  static badRequest(message: string): ICustomHttpReply<string> {
    return {
      statusCode: 400,
      error: 'BadRequestError',
      message,
    };
  }

  static forbidden(message: string): ICustomHttpReply<string> {
    return {
      statusCode: 403,
      error: 'ForbiddenError',
      message,
    };
  }

  static internalServerError(message: string): ICustomHttpReply<string> {
    return {
      statusCode: 500,
      error: 'InternalServerError',
      message,
    };
  }

  static customError(error: CustomError): ICustomHttpReply<string> {
    return {
      statusCode: error.code,
      error: error.name,
      message: error.message,
    };
  }
}

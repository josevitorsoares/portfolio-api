import { CustomError, type IError } from './error.generic';

export class InternalServerError extends CustomError implements IError {
  public readonly code: number = 500 as const;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

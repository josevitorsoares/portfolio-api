import { CustomError } from './error.generic';

export class HttpServiceError extends CustomError {
  public code: number;

  constructor(message: string, code: number = 500, name: string = 'HttpServiceError') {
    super(message);
    this.name = name;
    this.code = code;
  }
}

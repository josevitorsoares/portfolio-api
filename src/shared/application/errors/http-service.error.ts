import { CustomError } from './error.generic';

export class HttpServiceError extends CustomError {
  public code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.name = 'HttpServiceError';
    this.code = code;
  }
}

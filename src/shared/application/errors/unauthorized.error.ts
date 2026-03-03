import { CustomError } from './error.generic';

export class UnauthorizedError extends CustomError {
  public readonly code: number = 401;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

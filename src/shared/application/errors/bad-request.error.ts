import { CustomError } from './error.generic';

export class BadRequestError extends CustomError {
  public readonly code: number = 400 as const;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

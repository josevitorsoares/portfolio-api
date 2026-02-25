import { CustomError } from './error.generic';

export class TooManyRequestsError extends CustomError {
  readonly code: number = 429 as const;

  constructor(
    message: string,
    public readonly retryAfter?: number,
  ) {
    super(message);
    this.name = 'TooManyRequestsError';
  }
}

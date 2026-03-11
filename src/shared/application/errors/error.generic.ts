export interface IError {
  readonly code: number;
  message: string;
}

export abstract class CustomError extends Error implements IError {
  abstract readonly code: number;
}

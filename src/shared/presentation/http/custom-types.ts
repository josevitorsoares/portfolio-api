export interface ICustomHttpRequest<
  Body = unknown,
  Params = unknown,
  Query = unknown,
  Headers = Record<string, unknown>,
> {
  body: Body;
  params?: Params;
  query?: Query;
  headers?: Headers;
}

export interface ICustomHttpReply<Response = unknown> {
  statusCode: number;
  body?: { data?: Response } | Response;
  headers?: Record<string, string>;
  message?: string;
  error?: string;
}

export interface IController {
  handle(request: ICustomHttpRequest): Promise<ICustomHttpReply>;
}

export type HookFn<
  Body = unknown,
  Params = unknown,
  Query = unknown,
  Headers = Record<string, unknown>,
> = (request: ICustomHttpRequest<Body, Params, Query, Headers>) => Promise<ICustomHttpReply | void>;

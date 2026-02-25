export type HttpRouteMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpServiceRequest<Body = unknown> = {
  method: HttpRouteMethods;
  url: string;
  body?: Body | undefined;
  headers?: Record<string, string>;
};

export type HttpServiceResponse<Body = unknown> = {
  statusCode: number;
  body: Body;
};

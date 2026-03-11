export type HttpRouteMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HttpResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'
  | 'formdata';

export type HttpServiceRequest<Body = unknown> = {
  method: HttpRouteMethods;
  url: string;
  responseType?: HttpResponseType | undefined;
  body?: Body | undefined;
  headers?: Record<string, string>;
};

export type HttpServiceResponse<Body = unknown> = {
  statusCode: number;
  body: Body;
};

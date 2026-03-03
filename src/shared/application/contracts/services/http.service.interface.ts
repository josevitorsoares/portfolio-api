import type { HttpServiceRequest, HttpServiceResponse } from '@shared/infrastructure/http/types';

export interface IHttpService {
  request<Body = unknown>(data: HttpServiceRequest<Body>): Promise<HttpServiceResponse<Body>>;
}

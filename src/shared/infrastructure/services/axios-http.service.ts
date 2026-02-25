import type { IHttpService } from '@shared/application/contracts';
import { HttpServiceError } from '@shared/application/errors';
import type { HttpAxiosInstance } from '@shared/infrastructure/http/axios';
import type { HttpServiceRequest, HttpServiceResponse } from '@shared/infrastructure/http/types';
import axios from 'axios';

export class AxiosHttpService implements IHttpService {
  constructor(private readonly _axiosInstance: HttpAxiosInstance) {}

  async request<Body = unknown>(
    data: HttpServiceRequest<Body>,
  ): Promise<HttpServiceResponse<Body>> {
    try {
      const { method, url, body, headers } = data;

      const response = await this._axiosInstance.request<Body>({
        method,
        url,
        data: body ?? {},
        headers: {
          'Content-Type': 'application/json',
          ...(headers && headers),
        },
      });

      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new HttpServiceError(
          error.response?.data.detail ?? 'Error in external HTTP request',
          error.response?.status ?? 500,
        );
      }

      throw new HttpServiceError(`Unknown error when making HTTP request.\n Error: ${error}`, 500);
    }
  }
}

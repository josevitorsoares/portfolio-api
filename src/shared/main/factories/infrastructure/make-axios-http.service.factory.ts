import type { IHttpService } from '@shared/application/contracts';
import { axiosInstance } from '@shared/infrastructure/http/axios';
import { AxiosHttpService } from '@shared/infrastructure/services/axios-http.service';

export const makeAxiosHttpService = (): IHttpService => {
  return new AxiosHttpService(axiosInstance);
};

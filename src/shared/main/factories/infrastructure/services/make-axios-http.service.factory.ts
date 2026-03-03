import type { IHttpService } from '@shared/application/contracts/services';
import { axiosInstance } from '@shared/infrastructure/http/axios';
import { AxiosHttpService } from '@shared/infrastructure/services';

export const makeAxiosHttpService = (): IHttpService => {
  return new AxiosHttpService(axiosInstance);
};

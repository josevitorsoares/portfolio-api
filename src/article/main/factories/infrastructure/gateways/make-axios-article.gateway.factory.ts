import type { IArticleGateway } from '@article/application/contracts/gateways';
import { AxiosArticleGateway } from '@article/infrastructure/gateways';
import { makeAxiosHttpService } from '@shared/main/factories/infrastructure/services';

export const makeAxiosArticleGateway = (): IArticleGateway => {
  const httpService = makeAxiosHttpService();

  return new AxiosArticleGateway(httpService);
};

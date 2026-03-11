import type { IGetArticleUseCase } from '@article/application/contracts/usecases';
import { GetArticleUseCase } from '@article/application/usecases';
import { makeAxiosArticleGateway } from '../../infrastructure/gateways';

export const makeGetArticleUseCase = (): IGetArticleUseCase => {
  const articleGateway = makeAxiosArticleGateway();

  return new GetArticleUseCase(articleGateway);
};

import type { IGetArticleUseCase } from '@article/application/contracts/usecases';
import { GetArticleUseCase } from '@article/application/usecases';
import { makeArticleGateway } from '../../infrastructure/gateways';

export const makeGetArticleUseCase = (): IGetArticleUseCase => {
  const articleGateway = makeArticleGateway();

  return new GetArticleUseCase(articleGateway);
};

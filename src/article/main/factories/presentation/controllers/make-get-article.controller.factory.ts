import { GetArticleController } from '@article/presentation/controllers';
import type { IController } from '@shared/presentation/http';
import { makeGetArticleUseCase } from '../../application/usecases';

export const makeGetArticleController = (): IController => {
  const getArticleUseCase = makeGetArticleUseCase();

  return new GetArticleController(getArticleUseCase);
};

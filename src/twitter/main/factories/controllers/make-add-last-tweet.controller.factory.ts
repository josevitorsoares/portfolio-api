import type { IController } from '@shared/presentation/http';
import { AddLastTweetController } from '@twitter/presentation/controllers';
import { makeAddLastTweetUseCase } from '../usecases';

export const makeAddLastTweetController = (): IController => {
  const addLastTweetUseCase = makeAddLastTweetUseCase();

  return new AddLastTweetController(addLastTweetUseCase);
};

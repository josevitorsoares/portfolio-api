import type { IController } from '@shared/presentation/http';
import { GetLastTweetController } from '@twitter/presentation/controllers';
import { makeGetLastTweetUseCase } from '../usecases';

export const makeGetLastTweetController = (): IController => {
  const getLastTweetUseCase = makeGetLastTweetUseCase();

  return new GetLastTweetController(getLastTweetUseCase);
};

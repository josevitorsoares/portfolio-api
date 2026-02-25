import type { IGetLastTweetUseCase } from '@twitter/application/contracts/usecases';
import { GetLastTweetUseCase } from '@twitter/application/usecases';
import { makeRedisTweetRepository } from '../infrastructure';

export const makeGetLastTweetUseCase = (): IGetLastTweetUseCase => {
  const redisTweetRepository = makeRedisTweetRepository();

  return new GetLastTweetUseCase(redisTweetRepository);
};

import type { IAddLastTweetUseCase } from '@twitter/application/contracts/usecases';
import { AddLastTweetUseCase } from '@twitter/application/usecases';
import { makeRedisTweetRepository } from '../infrastructure';

export const makeAddLastTweetUseCase = (): IAddLastTweetUseCase => {
  const tweetRepository = makeRedisTweetRepository();

  return new AddLastTweetUseCase(tweetRepository);
};

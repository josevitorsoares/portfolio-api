import type { IAddLastTweetUseCase } from '@twitter/application/contracts/usecases';
import { AddLastTweetUseCase } from '@twitter/application/usecases';
import { makeRedisTweetRepository, makeTwitterGateway } from '../infrastructure';

export const makeAddLastTweetUseCase = (): IAddLastTweetUseCase => {
  const twitterApiGateway = makeTwitterGateway();
  const tweetRepository = makeRedisTweetRepository();

  return new AddLastTweetUseCase(twitterApiGateway, tweetRepository);
};

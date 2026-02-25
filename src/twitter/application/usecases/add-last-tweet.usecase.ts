import { TWITTER_ACCOUNT_ID } from '@configs/environment';
import type { ITwitterGateway } from '../contracts/gateways';
import type { ITweetRepository } from '../contracts/repositories';
import type { IAddLastTweetUseCase } from '../contracts/usecases';

export class AddLastTweetUseCase implements IAddLastTweetUseCase {
  constructor(
    private readonly _twitterGateway: ITwitterGateway,
    private readonly _tweetRepository: ITweetRepository,
  ) {}

  async execute(): Promise<void> {
    const lastTweet = await this._twitterGateway.fetchLastTweets(TWITTER_ACCOUNT_ID);

    if (lastTweet) {
      await this._tweetRepository.saveLastTweet(lastTweet);
    }
  }
}

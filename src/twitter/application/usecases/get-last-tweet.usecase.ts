import type { ITweetRepository } from '../contracts/repositories';
import type { IGetLastTweetUseCase } from '../contracts/usecases';
import type { TweetOutputDTO } from '../dtos';

export class GetLastTweetUseCase implements IGetLastTweetUseCase {
  constructor(private readonly _twitterRepository: ITweetRepository) {}

  async execute(): Promise<TweetOutputDTO | null> {
    const freshTweet = await this._twitterRepository.getLastTweet();

    return freshTweet;
  }
}

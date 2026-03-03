import type { ITweetRepository } from '../contracts/repositories';
import type { IAddLastTweetUseCase } from '../contracts/usecases';
import type { TweetInputDTO } from '../dtos';

export class AddLastTweetUseCase implements IAddLastTweetUseCase {
  constructor(private readonly _tweetRepository: ITweetRepository) {}

  async execute(input: TweetInputDTO): Promise<void> {
    await this._tweetRepository.saveLastTweet(input);
  }
}

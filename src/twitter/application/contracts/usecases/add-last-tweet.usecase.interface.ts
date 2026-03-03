import type { TweetInputDTO } from '@twitter/application/dtos';

export interface IAddLastTweetUseCase {
  execute(input: TweetInputDTO): Promise<void>;
}

import type { TweetOutputDTO } from '@twitter/application/dtos';

export interface IGetLastTweetUseCase {
  execute(): Promise<TweetOutputDTO | null>;
}

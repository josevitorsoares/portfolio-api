import type { TweetOutputDTO } from '@twitter/application/dtos';
import type { TweetEntity } from '@twitter/domain/entities';

export interface ITweetRepository {
  saveLastTweet(tweet: TweetEntity): Promise<void>;
  getLastTweet(): Promise<TweetOutputDTO | null>;
}

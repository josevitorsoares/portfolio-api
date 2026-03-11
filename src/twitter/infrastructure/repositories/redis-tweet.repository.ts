import type { RedisInstance } from '@shared/infrastructure/database/redis';
import type { ITweetRepository } from '@twitter/application/contracts/repositories';
import type { TweetOutputDTO } from '@twitter/application/dtos';
import type { TweetEntity } from '@twitter/domain/entities';

export class RedisTweetRepository implements ITweetRepository {
  private readonly _key: string = 'twitter:last_post' as const;

  constructor(private readonly _redisInstance: RedisInstance) {}

  async saveLastTweet(tweet: TweetEntity): Promise<void> {
    const data = JSON.stringify(tweet);

    await this._redisInstance.set(this._key, data, 'PX', 1000 * 60 * 15); // Default is 15 minutes
  }

  async getLastTweet(): Promise<TweetOutputDTO | null> {
    const data = await this._redisInstance.get(this._key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as TweetOutputDTO;
  }
}

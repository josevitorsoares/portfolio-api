import type { TweetOutputDTO } from '@twitter/application/dtos';

export interface ITwitterGateway {
  fetchLastTweets(
    tweetAccountId: string,
    maxResults?: number | undefined,
  ): Promise<TweetOutputDTO | null>;
}

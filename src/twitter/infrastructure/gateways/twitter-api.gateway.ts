import { TWITTER_ACCESS_TOKEN, TWITTER_API_URL } from '@configs/environment';
import type { IHttpService } from '@shared/application/contracts/services';
import type { ITwitterGateway } from '@twitter/application/contracts/gateways';
import type { TweetOutputDTO } from '@twitter/application/dtos';
import { TweetPostMapper } from '../mappers';
import type { Tweet, TweetIncludes } from '../mappers/types';

export class TwitterApiGateway implements ITwitterGateway {
  constructor(private readonly _httpService: IHttpService) {}

  async fetchLastTweets(
    tweetAccountId: string,
    maxResults: number = 5, // Default get last 5 tweets
  ): Promise<TweetOutputDTO | null> {
    const queryParams = new URLSearchParams({
      max_results: maxResults.toString(),
      'tweet.fields': 'public_metrics,created_at',
      expansions: 'author_id,referenced_tweets.id.attachments.media_keys',
      'media.fields': 'url',
      'user.fields': 'profile_image_url',
    });

    const response = await this._httpService.request<{ data: Tweet[]; includes: TweetIncludes }>({
      method: 'GET',
      url: `${TWITTER_API_URL}/users/${tweetAccountId}/tweets?${queryParams.toString()}`,
      headers: {
        Authorization: `Bearer ${TWITTER_ACCESS_TOKEN}`,
      },
    });

    const [tweet] = response.body.data;
    const media = response.body.includes.media;
    const users = response.body.includes.users;

    if (!tweet) {
      return null;
    }

    return TweetPostMapper.toDomain(tweet, {
      media: media,
      users: users,
    });
  }
}

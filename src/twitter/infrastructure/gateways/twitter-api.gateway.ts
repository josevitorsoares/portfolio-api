import { TWITTER_ACCESS_TOKEN, TWITTER_API_URL } from '@configs/environment';
import type { IHttpService } from '@shared/application/contracts';
import type { ITwitterGateway } from '@twitter/application/contracts/gateways';
import type { TweetOutputDTO } from '@twitter/application/dtos';
import { TweetPostMapper } from '../mappers';
import type { Tweet } from '../mappers/types';

export class TwitterApiGateway implements ITwitterGateway {
  constructor(private readonly _httpService: IHttpService) {}

  async fetchLastTweets(
    tweetAccountId: string,
    maxResults: number = 5, // Default get last 5 tweets
  ): Promise<TweetOutputDTO | null> {
    const queryParams = new URLSearchParams({
      max_results: maxResults.toString(),
      'tweet.fields': 'public_metrics,created_at',
    });

    const response = await this._httpService.request<{ data: Tweet[] }>({
      method: 'GET',
      url: `${TWITTER_API_URL}/users/${tweetAccountId}/tweets?${queryParams.toString()}`,
      headers: {
        Authorization: `Bearer ${TWITTER_ACCESS_TOKEN}`,
      },
    });

    const [tweet] = response.body.data;

    if (!tweet) {
      return null;
    }

  }
}

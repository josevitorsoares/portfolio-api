import type { TweetEntity } from '@twitter/domain/entities';
import type { Tweet, TweetIncludes } from './types';

export class TweetPostMapper {
  static toDomain(tweet: Tweet, includes: TweetIncludes): TweetEntity {
    const tweetText = tweet.text.replace(/\s*https:?\/\/\S+/g, '');

    const [mediaData] = includes.media;
    const [user] = includes.users;

    return {
      postId: tweet.id,
      text: tweetText,
      likesCount: tweet.public_metrics.like_count,
      impressionCount: tweet.public_metrics.impression_count,
      mediaUrl: mediaData?.url,
      user: {
        name: user?.name ?? '',
        profileImageUrl: user?.profile_image_url ?? '',
        username: user?.username ?? '',
      },

      createdAt: new Date(tweet.created_at),
    };
  }
}

import type { TweetEntity } from '@twitter/domain/entities';
import type { Tweet } from './types';

export class TweetPostMapper {
  static toDomain(input: Tweet): TweetEntity {
    return {
      postId: input.id,
      text: input.text,
      likesCount: input.public_metrics.like_count,
      impressionCount: input.public_metrics.impression_count,
      createdAt: new Date(input.created_at),
    };
  }
}

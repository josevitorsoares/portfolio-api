import { getRedisClient } from '@shared/infrastructure/database/redis';
import type { ITweetRepository } from '@twitter/application/contracts/repositories';
import { RedisTweetRepository } from '@twitter/infrastructure/repositories';

export const makeRedisTweetRepository = (): ITweetRepository => {
  const redisInstance = getRedisClient();

  return new RedisTweetRepository(redisInstance);
};

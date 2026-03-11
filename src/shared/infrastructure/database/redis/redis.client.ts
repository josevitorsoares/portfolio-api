import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from '@configs/environment';
import { Redis, type RedisOptions } from 'ioredis';

export type RedisInstance = Redis;

let redisClient: Redis | null = null;

let producerConnection: Redis | null = null;
let workerConnection: Redis | null = null;

const retryStrategy = (times: number): number => {
  const delay = Math.min(times * 50, 2000);

  return delay;
};

function getRedisConfiguration(): RedisOptions {
  if (REDIS_URL) {
    return {
      lazyConnect: true, // Does not connect immediately upon instantiation
      maxRetriesPerRequest: null,
      retryStrategy,
    };
  }

  return {
    host: REDIS_HOST ?? 'localhost',
    port: Number(REDIS_PORT ?? 6379),
    password: REDIS_PASSWORD,
    lazyConnect: true,
    maxRetriesPerRequest: null,
    retryStrategy,
  };
}

export function getRedisClient(): Redis {
  if (redisClient) {
    return redisClient;
  }

  const redisConfigurations = getRedisConfiguration();

  redisClient = new Redis(redisConfigurations);

  if (REDIS_URL) {
    redisClient = new Redis(REDIS_URL, redisConfigurations);
  }

  redisClient.on('connect', () => {
    console.info('🔌 Redis: Connection established successfully.');
  });

  redisClient.on('ready', () => {
    console.info('✅ Redis: Client is ready to receive commands.');
  });

  redisClient.on('error', error => {
    console.error('❌ Redis: Connection erro: ', error);
  });

  redisClient.connect().catch(error => {
    console.error('❌ Redis: Initial connection failed', error);
  });

  return redisClient;
}

export function getProducerConnection(): Redis {
  if (!producerConnection) {
    producerConnection = getRedisClient();
  }

  return producerConnection;
}

export function getWorkerConnection(): Redis {
  if (!workerConnection) {
    workerConnection = getRedisClient();
  }

  return workerConnection;
}

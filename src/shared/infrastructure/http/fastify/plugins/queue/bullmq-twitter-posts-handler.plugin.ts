import { BullMQTweetsQueueConsumer } from '@shared/infrastructure/queue/bullmq/consumers';
import { makeAddLastTweetUseCase } from '@twitter/main/factories/usecases';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const tweetsQueueHandler: FastifyPluginAsync = async fastify => {
  const addLastTweetUseCase = makeAddLastTweetUseCase();

  const bullMqRequestConsumer = new BullMQTweetsQueueConsumer(addLastTweetUseCase);

  fastify.decorate('httpRequestQueueHandler', bullMqRequestConsumer);
};

/**
 * Fastify plugin responsible for initializing and managing the BullMQ tweets queue consumer.
 *
 * This plugin wraps the `tweetsQueueHandler` using `fastify-plugin` to ensure
 * it is registered in the global scope of the Fastify instance. It initializes
 * the BullMQ consumer with the use case for adding the last tweet and decorates
 * the Fastify instance with the HTTP request queue handler.
 *
 * @public
 */
export const bullMqTweetsQueueHandler = fp(tweetsQueueHandler);

import type { ICronService } from '@shared/application/contracts';
import {
  GET_LAST_POST_TWEET_JOB,
  REQUEST_QUEUE,
} from '@shared/application/contracts/queue/constants';
import { NodeCronService } from '@shared/infrastructure/services/node-cron.service';
import { makeBullMqQueueService } from '@shared/main/factories/infrastructure';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { ScheduledTask, TaskOptions } from 'node-cron';

const runCronJobs = (
  cronService: ICronService<ScheduledTask, TaskOptions>,
): ICronService<ScheduledTask, TaskOptions> => {
  const bullMqQueueService = makeBullMqQueueService();

  const getTaskOptions = (name: string): TaskOptions => {
    return {
      timezone: 'America/Sao_Paulo',
      name,
    };
  };

  const addLastTweetJob = cronService.createSchedule(
    '*/15 * * * *',
    () => {
      console.log(`⏳ [Cron] - Scheduling cron job ${GET_LAST_POST_TWEET_JOB} in the queue...`);
      bullMqQueueService.add(
        REQUEST_QUEUE,
        GET_LAST_POST_TWEET_JOB,
        {},
        {
          jobId: 'add-last-tweet',
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    },
    getTaskOptions('Get Last Tweet Job'),
  );

  cronService.addNewJob(addLastTweetJob);

  cronService.start();

  return cronService;
};

const cronJobQueueHandler: FastifyPluginAsync = async fastify => {
  const nodeCronService = runCronJobs(new NodeCronService());

  fastify.decorate('nodeCronQueueHandler', nodeCronService);

  fastify.addHook('onClose', async () => {
    nodeCronService.stopAll();
  });
};

/**
 * Fastify plugin responsible for initializing and managing Node-Cron jobs.
 *
 * This plugin wraps the `cronJobQueueHandler` using `fastify-plugin` to ensure
 * it is registered in the global scope of the Fastify instance. It starts the
 * scheduled cron jobs (such as adding the last tweet job to the BullMQ queue),
 * decorates the Fastify instance with the cron service, and gracefully stops
 * all running jobs when the Fastify server closes.
 *
 * @public
 */
export const nodeCronQueueHandler = fp(cronJobQueueHandler);

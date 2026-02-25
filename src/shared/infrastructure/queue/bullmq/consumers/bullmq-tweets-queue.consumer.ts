import { Job, Worker } from 'bullmq';

import { ADD_LAST_TWEET_JOB, REQUEST_QUEUE } from '@shared/application/contracts/queue/constants';
import { InternalServerError } from '@shared/application/errors';
import { getWorkerConnection } from '@shared/infrastructure/database/redis';
import type { IAddLastTweetUseCase } from '@twitter/application/contracts/usecases';

export class BullMQTweetsQueueConsumer {
  private _worker: Worker | undefined;

  constructor(private readonly _addLastTweetUseCase: IAddLastTweetUseCase) {
    this._worker = new Worker(REQUEST_QUEUE, this._processJob, {
      connection: getWorkerConnection(),
    });

    this._worker.on('completed', job => {
      console.log(`⌛ [Cron_Job] - Job ${job.id} has completed`);
    });

    this._worker.on('failed', (job, err) => {
      console.log(`⌛ [Cron_Job] Job ${job?.id} has failed: ${err.message}`);
    });
  }

  private _processJob = async (job: Job): Promise<void> => {
    const { name: jobName } = job;

    switch (jobName) {
      case ADD_LAST_TWEET_JOB:
        await this._addLastTweetUseCase.execute();

        break;

      default:
        throw new InternalServerError(
          `The ${jobName} job is not mapped or registered in the queue system.`,
        );
    }
  };
}

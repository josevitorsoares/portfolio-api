import { Queue } from 'bullmq';

import type { IQueueService } from '@shared/application/contracts';
import type { Jobs, Queues } from '@shared/application/contracts/queue/constants/types';
import { getProducerConnection } from '../database/redis';

export class BullMqQueueService<DataType extends object> implements IQueueService {
  async add(
    name: Queues,
    job: Jobs,
    data: object,
    options: Partial<{ delay: number }>,
  ): Promise<void> {
    const queue = this._getQueue(name);

    // @ts-expect-error ts 2345
    await queue.add(job, data, options);
  }

  private _getQueue(name: string) {
    return new Queue<DataType>(name, {
      connection: getProducerConnection(),
    });
  }
}

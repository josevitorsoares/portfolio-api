import type { IQueueService } from '@shared/application/contracts';
import { BullMqQueueService } from '@shared/infrastructure/services';

export const makeBullMqQueueService = (): IQueueService => {
  return new BullMqQueueService();
};

import type { Jobs, Queues } from './queue/constants/types';

export type JobOptions = Partial<{
  jobId: string;
  removeOnComplete: boolean;
  removeOnFail: boolean;
  delay: number;
}>;

export interface IQueueService<DataType extends object = object> {
  add(name: Queues, job: Jobs, data: DataType, options?: JobOptions | undefined): Promise<void>;
}

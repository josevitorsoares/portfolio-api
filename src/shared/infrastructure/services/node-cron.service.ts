import type { ICronService } from '@shared/application/contracts';
import nodeCron, { type ScheduledTask, type TaskOptions } from 'node-cron';

export class NodeCronService implements ICronService<ScheduledTask, TaskOptions> {
  public readonly jobs: ScheduledTask[] = [];

  constructor(jobs: ScheduledTask[] = []) {
    this.jobs = jobs;
  }

  createSchedule(
    expression: string,
    fn: () => Promise<void> | void,
    options: TaskOptions,
  ): ScheduledTask {
    return nodeCron.schedule(expression, fn, options);
  }

  start(): void {
    console.log('⏳ [Cron_Service] - Starting all jobs');
    this.jobs.forEach(job => job.start());
  }

  addNewJob(job: ScheduledTask): void {
    console.log(`⏳ [Cron_Service] - Add new job: ${job.name ?? ''}`);
    this.jobs.push(job);
  }

  stopAll(): void {
    console.log(`⏳ [Cron_Service] - Stop all jobs`);
    this.jobs.forEach(job => job.stop());
  }
}

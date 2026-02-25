/**
 * Interface representing a service for managing and scheduling cron jobs.
 *
 * @template T - The type representing the cron job instance.
 * @template U - The type representing the options for the cron job, defaults to a generic object.
 */
export interface ICronService<T, U extends object = object> {
  /**
   * Creates a new cron schedule with the specified expression, callback function, and options.
   *
   * @param expression - The cron expression defining the schedule (e.g., '* * * * *').
   * @param fn - The function to be executed when the cron job triggers. Can be synchronous or asynchronous.
   * @param options - Additional configuration options for the cron job.
   * @returns The created cron job instance of type `T`.
   */
  createSchedule(expression: string, fn: () => Promise<void> | void, options: U): T;

  /**
   * Starts the cron service, initiating all scheduled jobs.
   */
  start(): void;

  /**
   * Adds an existing cron job instance to the service's management.
   *
   * @param job - The cron job instance of type `T` to be added.
   */
  addNewJob(job: T): void;

  /**
   * Stops all cron jobs currently managed by the service.
   */
  stopAll(): void;
}

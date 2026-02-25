import type { ADD_LAST_TWEET_JOB } from '../jobs.constants';
import type { REQUEST_QUEUE } from '../queues.constants';

export type Queues = typeof REQUEST_QUEUE;

export type Jobs = TwitterJobs;

type TwitterJobs = typeof ADD_LAST_TWEET_JOB;

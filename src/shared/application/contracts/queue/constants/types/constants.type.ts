import type { GET_LAST_POST_TWEET_JOB } from '../jobs.constants';
import type { REQUEST_QUEUE } from '../queues.constants';

export type Queues = typeof REQUEST_QUEUE;

export type Jobs = TwitterJobs;

type TwitterJobs = typeof GET_LAST_POST_TWEET_JOB;

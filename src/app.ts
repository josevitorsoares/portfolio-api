import cors from '@fastify/cors';
import fastify from 'fastify';
import z, { ZodError } from 'zod';

import {
  bullMqTweetsQueueHandler,
  nodeCronQueueHandler,
} from '@shared/infrastructure/http/fastify/plugins/queue';
import { trackingRoutes } from '@tracking/presentation/http/routes';
import { twitterRoutes } from '@twitter/presentation/http/routes';
import { APP_URL } from '../configs/environment';

export const app = fastify();

app.register(cors, {
  origin: [APP_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(bullMqTweetsQueueHandler);

app.register(nodeCronQueueHandler);

// Register the Twitter routes
app.register(twitterRoutes);

// Register the Tracking routes
app.register(trackingRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Validation Environment Variables Error',
      issues: z.treeifyError(error),
    });
  }

  console.log('[INTERNAL SERVER ERROR] - ', error);
  return reply.status(500).send({
    statusCode: 500,
    message: 'Internal Server Error',
  });
});

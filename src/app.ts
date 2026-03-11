import cors from '@fastify/cors';
import fastify from 'fastify';
import z, { ZodError } from 'zod';

import { articleRoutes } from '@article/presentation/http/routes';
import { CustomError } from '@shared/application/errors';
import { trackingRoutes } from '@tracking/presentation/http/routes';
import { twitterRoutes } from '@twitter/presentation/http/routes';
import { APP_URL } from '../configs/environment';

export const app = fastify();

app.register(cors, {
  origin: [APP_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Register the Twitter routes
app.register(twitterRoutes);

// Register the Tracking routes
app.register(trackingRoutes);

app.register(articleRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Validation Environment Variables Error',
      issues: z.treeifyError(error),
    });
  }

  if (error instanceof CustomError) {
    return reply.status(error.code as number).send({
      statusCode: error.code,
      message: error.message,
    });
  }

  console.log('[INTERNAL SERVER ERROR] - ', error);
  return reply.status(500).send({
    statusCode: 500,
    message: 'Internal Server Error',
  });
});

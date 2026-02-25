import { registerRouteHandler } from '@shared/infrastructure/http/fastify';
import { makeGetLastTweetController } from '@twitter/main/factories/controllers';
import type { FastifyInstance } from 'fastify';

export const twitterRoutes = async (app: FastifyInstance) => {
  registerRouteHandler(app, {
    method: 'GET',
    path: '/tweet',
    controller: makeGetLastTweetController(),
  });
};

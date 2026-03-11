import { makeGetArticleController } from '@article/main/factories/presentation/controllers';
import { registerRouteHandler } from '@shared/infrastructure/http/fastify';
import type { FastifyInstance } from 'fastify';

export function articleRoutes(app: FastifyInstance) {
  registerRouteHandler(app, {
    method: 'GET',
    path: '/article',
    controller: makeGetArticleController(),
  });
}

import { registerRouteHandler } from '@shared/infrastructure/http/fastify';
import { makeTrackObjectController } from '@tracking/main/factories/controllers';
import type { FastifyInstance } from 'fastify';

export const trackingRoutes = (app: FastifyInstance) => {
  registerRouteHandler(app, {
    method: 'GET',
    path: '/track/:trackingCode',
    controller: makeTrackObjectController(),
  });
};

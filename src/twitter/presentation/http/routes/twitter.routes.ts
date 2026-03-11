import { registerRouteHandler } from '@shared/infrastructure/http/fastify';
import { adapterOneHook } from '@shared/infrastructure/http/fastify/adapters';
import { makeHmacValidatorHook } from '@shared/main/factories/hooks';
import {
  makeAddLastTweetController,
  makeGetLastTweetController,
} from '@twitter/main/factories/controllers';
import { AddLastTweetDTO } from '@twitter/presentation/dtos';
import type { FastifyInstance } from 'fastify';

export const twitterRoutes = async (app: FastifyInstance) => {
  registerRouteHandler(app, {
    method: 'GET',
    path: '/tweet',
    controller: makeGetLastTweetController(),
  });

  registerRouteHandler(app, {
    method: 'POST',
    path: '/webhook/tweet',
    body: AddLastTweetDTO,
    controller: makeAddLastTweetController(),
    preHandler: adapterOneHook(makeHmacValidatorHook()),
  });
};

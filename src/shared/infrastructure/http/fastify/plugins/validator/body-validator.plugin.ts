import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const bodyValidator: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('preHandler', async (request, reply) => {
    const BodyClass = request.routeOptions.config.bodyClass;

    if (!BodyClass) {
      return;
    }

    const instance = plainToInstance(BodyClass, request.body) as object;

    const errors = await validate(instance, {
      whitelist: true,
    });

    if (errors.length) {
      const errorMessages = errors.reduce<Record<string, string[]>>(
        (acc, err) => {
          const field = err.property;
          const constraints = Object.values(err.constraints ?? {});

          if (constraints.length) {
            acc[field] = constraints;
          }

          return acc;
        },
        {},
      );

      return reply.status(400).send({
        error: 'RequestBodyValidationError',
        messages: errorMessages,
      });
    }

    request.validate = instance;
  });
};

export const classValidatorRequestBody = fp(bodyValidator);

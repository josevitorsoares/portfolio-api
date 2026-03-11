import type { ClassConstructor } from 'class-transformer';

declare module 'fastify' {
  interface FastifyRequest {
    validate: {
      body?: unknown | undefined;
    };
  }

  interface FastifyContextConfig {
    bodyClass?: ClassConstructor<unknown> | undefined;
  }
}

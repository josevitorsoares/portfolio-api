import { API_PATH } from '@configs/environment';
import type { HttpRouteMethods } from '@shared/infrastructure/http/types';
import type { ICustomHttpReply, ICustomHttpRequest } from '@shared/presentation/http';
import type { ClassConstructor } from 'class-transformer';
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  onResponseHookHandler,
  preHandlerHookHandler,
} from 'fastify';
import { fastifyReplyAdapter, fastifyRequestAdapter } from './adapters';

interface RegisterRouteOptions<
  Body = unknown,
  Params = unknown,
  Query = unknown,
  Headers = Record<string, unknown>,
> {
  method: HttpRouteMethods;
  path: string;
  body?: ClassConstructor<Body>;
  schema?: {
    queryString?: unknown;
    params?: unknown;
    headers?: unknown;
  };
  controller: {
    handle: (
      request: ICustomHttpRequest<Body, Params, Query, Headers> & {
        validate: Body;
      },
    ) => Promise<ICustomHttpReply>;
  };
  preHandler?: preHandlerHookHandler | preHandlerHookHandler[];
  onResponse?: onResponseHookHandler | onResponseHookHandler[];
}

/**
 * Builds a Fastify schema object by filtering out undefined or null values from the provided schema.
 *
 * @param schema - Optional schema object containing route schema definitions (body, querystring, params, headers, response, etc.)
 * @returns A record object containing only the defined schema properties, or an empty object if no schema is provided
 *
 */
const buildFastifySchema = (schema?: RegisterRouteOptions['schema']): Record<string, unknown> => {
  if (!schema) {
    return {};
  }

  return Object.entries(schema).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

/**
 * Creates a Fastify route handler that adapts Fastify's request/reply to a custom controller interface.
 *
 * @template Body - The type for request body
 * @template Params - The type for route parameters
 * @template Query - The type for query string parameters
 * @template Headers - The type for request headers
 *
 * @param controller - The controller instance that handles the business logic with a `handle` method
 *
 * @returns An async function that acts as a Fastify route handler, accepting FastifyRequest and FastifyReply
 *
 * @remarks
 * This function serves as an adapter layer between Fastify's native request/reply objects and a custom
 * controller pattern. It:
 * - Converts Fastify requests to a custom request format using `fastifyRequestAdapter`
 * - Executes the controller's handle method with the adapted request
 * - Converts the controller's response to a Fastify reply using `fastifyReplyAdapter`
 * - Logs and re-throws any errors that occur during request handling
 *
 * @throws Re-throws any error caught during the controller execution after logging
 */
const createRouteHandler = <Body, Params, Query, Headers>(
  controller: RegisterRouteOptions<Body, Params, Query, Headers>['controller'],
) => {
  return async (fastifyRequest: FastifyRequest, fastifyReply: FastifyReply): Promise<void> => {
    try {
      const customRequest = fastifyRequestAdapter<Body, Params, Query, Headers>(fastifyRequest);

      const customReply = await controller.handle({
        ...customRequest,
        validate: { body: customRequest.body } as Body,
      });

      fastifyReplyAdapter(customReply, fastifyReply);
    } catch (error) {
      console.error('[ROUTE HANDLER ERROR]:', {
        method: fastifyRequest.method,
        url: fastifyRequest.url,
        error,
      });

      throw error;
    }
  };
};

/**
 * Registers a route with the Fastify application instance.
 *
 * @template Params - Type definition for route parameters
 * @template Body - Type definition for request body
 * @template Query - Type definition for query string parameters
 * @template Headers - Type definition for request headers
 *
 * @param {FastifyInstance} app - The Fastify application instance to register the route with
 * @param {RegisterRouteOptions<Params, Body, Query, Headers>} options - Configuration options for the route
 * @param {string} options.method - HTTP method(s) for the route (e.g., 'GET', 'POST', ['GET', 'POST'])
 * @param {string} options.path - URL path for the route (will be prefixed with BASE_PATH)
 * @param {Function} options.controller - Controller function to handle the route logic
 * @param {Constructor} options.body - Class constructor for request body validation/transformation
 * @param {Object} options.schema - Schema definition for request/response validation
 * @param {Function} [options.preHandler] - Optional hook(s) to run before the handler
 * @param {Function} [options.onResponse] - Optional hook(s) to run after the response is sent
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * registerRoute(app, {
 *   method: 'POST',
 *   path: '/users',
 *   controller: createUserController,
 *   body: CreateUserDto,
 *   schema: createUserSchema,
 * });
 * ```
 */
export const registerRouteHandler = <Body, Params, Query, Headers>(
  app: FastifyInstance,
  options: RegisterRouteOptions<Body, Params, Query, Headers>,
): void => {
  const { method, path, controller, body, schema, preHandler, onResponse } = options;

  app.route({
    method,
    url: `${API_PATH}${path}`,
    schema: buildFastifySchema(schema),
    config: {
      bodyClass: body,
    },
    ...(preHandler && { preHandler }),
    ...(onResponse && { onResponse }),
    handler: createRouteHandler(controller),
  });
};

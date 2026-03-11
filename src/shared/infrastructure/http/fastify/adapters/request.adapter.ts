import type { ICustomHttpRequest } from '@shared/presentation/http';
import type { FastifyRequest } from 'fastify';

/**
 * Adapts a Fastify request object to a custom HTTP request interface.
 *
 * @template Body - The type of the request body (default: unknown)
 * @template Params - The type of the request parameters (default: unknown)
 * @template Query - The type of the query parameters (default: unknown)
 * @template Headers - The type of the request headers (default: Record<string, unknown>)
 *
 * @param {FastifyRequest} request - The Fastify request object to be adapted
 *
 * @returns {ICustomHttpRequest<Body, Params, Query, Headers>} A custom HTTP request object containing:
 * - body: The request body casted to the specified Body type
 * - params: The route parameters casted to the specified Params type
 * - query: The query string parameters casted to the specified Query type
 * - headers: The request headers casted to the specified Headers type
 */
export const fastifyRequestAdapter = <
  Body = unknown,
  Params = unknown,
  Query = unknown,
  Headers = Record<string, unknown>,
>(
  request: FastifyRequest,
): ICustomHttpRequest<Body, Params, Query, Headers> => {
  return {
    body: request.body as Body,
    params: request.params as Params,
    query: request.query as Query,
    headers: request.headers as Headers,
  };
};

import type { ICustomHttpReply } from '@shared/presentation/http';
import type { FastifyReply } from 'fastify';
import { Readable } from 'node:stream';

/**
 * Adapts a custom HTTP reply object to a Fastify reply instance.
 *
 * This adapter handles the conversion of a custom reply format to Fastify's native reply format,
 * including error responses and standard body responses.
 *
 * @param customReply - The custom HTTP reply object containing status code, body, cookies, and error information
 * @param fastifyReply - The Fastify reply instance to be configured and sent
 *
 * @remarks
 * - If cookies are present in the custom reply, they are first cleared and then set with the provided options
 * - If an error is present, the response will be sent with an error object containing the error and message
 * - If no error is present, the response body is sent with the specified status code
 *
 * @returns void - This function modifies the fastifyReply object in place and does not return a value
 */
export const fastifyReplyAdapter = (
  customReply: ICustomHttpReply,
  fastifyReply: FastifyReply,
): FastifyReply => {
  if (customReply.headers) {
    fastifyReply.headers(customReply.headers);
  }

  if (customReply.error) {
    return fastifyReply.status(customReply.statusCode).send({
      error: customReply.error,
      message: customReply.message,
    });
  }

  if (customReply.body instanceof Readable) {
    const stream = customReply.body;

    stream.on('error', streamError => {
      console.error(
        '[PDF_STREAM_ERROR] An error occurred while communicating with the external PDF. Error: ',
        streamError,
      );

      if (!fastifyReply.raw.headersSent) {
        fastifyReply.status(500).send({ message: 'Error while processing the file.' });

        return;
      }

      fastifyReply.raw.destroy();
    });

    return fastifyReply.status(customReply.statusCode).send(stream);
  }

  return fastifyReply.status(customReply.statusCode).send(customReply.body);
};

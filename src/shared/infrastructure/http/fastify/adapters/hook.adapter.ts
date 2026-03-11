import type { HookFn, ICustomHttpReply } from '@shared/presentation/http';
import type {
  FastifyReply,
  FastifyRequest,
  onResponseHookHandler,
  preHandlerHookHandler,
} from 'fastify';
import { fastifyReplyAdapter } from './reply.adapter';
import { fastifyRequestAdapter } from './request.adapter';

type HookHandler = preHandlerHookHandler | onResponseHookHandler;

export const fastifyHookAdapter = (hook: HookFn): HookHandler => {
  return async (
    fastifyRequest: FastifyRequest,
    fastifyReply: FastifyReply,
  ): Promise<void> => {
    const customRequest = fastifyRequestAdapter(fastifyRequest);

    const customReply: ICustomHttpReply | void = await hook(customRequest);

    if (customReply) {
      fastifyReplyAdapter(customReply, fastifyReply);
    }
  };
};

export const adapterOneHook = fastifyHookAdapter;

export const adapterManyHooks = (hooks: HookFn[]): HookHandler[] =>
  hooks.map(fastifyHookAdapter);

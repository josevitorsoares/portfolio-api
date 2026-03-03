import { hmacValidatorHook } from '@shared/infrastructure/hooks';
import type { HookFn } from '@shared/presentation/http';
import { makeCryptoHashProvider } from '../infrastructure/providers';

export const makeHmacValidatorHook = (): HookFn => {
  const hashProvider = makeCryptoHashProvider();

  return hmacValidatorHook(hashProvider);
};

import { WEBHOOK_SECRET } from '@configs/environment';
import type { IHashProvider } from '@shared/application/contracts/providers';
import { BadRequestError, UnauthorizedError } from '@shared/application/errors';
import type { HookFn } from '@shared/presentation/http';

/**
 * Creates a hook for validating HMAC signatures in webhook requests.
 *
 * @param hashProvider - The hash provider service used to verify HMAC signatures
 * @returns An async function that validates the HMAC signature from the request headers
 *
 * @throws {BadRequestError} When the 'x-hub-signature-256' header is missing
 * @throws {UnauthorizedError} When the HMAC signature is invalid or doesn't match the expected signature
 *
 * @example
 * ```typescript
 * const validator = hmacValidatorHook(hashProvider);
 * await validator(request);
 * ```
 */
export const hmacValidatorHook = (hashProvider: IHashProvider): HookFn => {
  return async request => {
    const signature = request.headers?.['x-hub-signature-256'] as string | undefined;

    if (!signature) {
      throw new BadRequestError('The HMAC signature is missing.');
    }

    const rawPayload = JSON.stringify(request.body);

    const isValidHmac = hashProvider.verifyHmac(rawPayload, WEBHOOK_SECRET, signature);

    if (!isValidHmac) {
      throw new UnauthorizedError('Invalid HMAC signature. Access denied.');
    }
  };
};

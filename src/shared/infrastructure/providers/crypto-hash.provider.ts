import crypto from 'node:crypto';

import type { IHashProvider } from '@shared/application/contracts/providers';

export class CryptoHashProvider implements IHashProvider {
  generateHmac(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  verifyHmac(payload: string, secret: string, providedSignature: string): boolean {
    const generatedSignature = this.generateHmac(payload, secret);

    return crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(providedSignature));
  }
}

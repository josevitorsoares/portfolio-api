import type { IHashProvider } from '@shared/application/contracts/providers';
import { CryptoHashProvider } from '@shared/infrastructure/providers';

export const makeCryptoHashProvider = (): IHashProvider => {
  return new CryptoHashProvider();
};

/**
 * Interface for HMAC hash generation and verification operations.
 *
 * This provider abstracts cryptographic HMAC operations, allowing for
 * flexible implementation of hash-based message authentication code generation
 * and verification across the application.
 */
export interface IHashProvider {
  /**
   * Generates an HMAC signature for the given payload using the provided secret.
   *
   * @param payload - The data to be hashed
   * @param secret - The secret key used to generate the HMAC
   * @returns The generated HMAC signature as a hexadecimal string
   */
  generateHmac(payload: string, secret: string): string;

  /**
   * Verifies if the provided signature matches the HMAC of the payload using the secret.
   *
   * Uses constant-time comparison to prevent timing attacks.
   *
   * @param payload - The original data that was hashed
   * @param secret - The secret key used to generate the original HMAC
   * @param providedSignature - The signature to be verified against the generated one
   * @returns True if the signature is valid, false otherwise
   */
  verifyHmac(payload: string, secret: string, providedSignature: string): boolean;
}

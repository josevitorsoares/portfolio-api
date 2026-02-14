import { config } from 'dotenv';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import z from 'zod';

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const result = config({
  path: join(__dirname, '..', '..', '..', '.env'),
});

if (result.error && !result.error.message.includes('ENOENT')) {
  throw new Error(result.error.message);
}

const envSchema = z.object({
  NODE_ENVIRONMENT: z.enum(['development', 'production', 'test']).default('development'),
  API_PORT: z.coerce.number().default(3333),
  APP_URL: z.string(),
});

const env = envSchema.parse(process.env, {
  error: () => {
    return { message: 'Invalid environment variable' };
  },
});

export const { NODE_ENVIRONMENT, API_PORT, APP_URL } = env;

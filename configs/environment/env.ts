import { config } from 'dotenv';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import z from 'zod';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const result = config({
  path: join(__dirname, '..', '..', '..', '.env'),
});

if (result.error && !result.error.message.includes('ENOENT')) {
  throw new Error(result.error.message);
}

const envSchema = z.object({
  NODE_ENVIRONMENT: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3333),
  API_PATH: z.string(),
  APP_URL: z.string(),
  WEBHOOK_SECRET: z.string(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.coerce.number().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.string().optional(),
  TWITTER_API_URL: z.url(),
  TWITTER_ACCOUNT_ID: z.string(),
  TWITTER_ACCESS_TOKEN: z.string(),
  TRACKING_API_URL: z.url(),
});

const env = envSchema.parse(process.env, {
  error: () => {
    return { message: 'Invalid environment variable' };
  },
});

export const {
  NODE_ENVIRONMENT,
  PORT,
  API_PATH,
  APP_URL,
  WEBHOOK_SECRET,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_URL,
  TWITTER_API_URL,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCOUNT_ID,
  TRACKING_API_URL,
} = env;

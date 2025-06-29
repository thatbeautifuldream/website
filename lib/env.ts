import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  },
});

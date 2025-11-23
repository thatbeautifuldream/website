import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    IP_SALT: z.string().optional(),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    PAYLOAD_DATABASE_URL: z.string().min(1),
    SERVER_URL: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
    CLARITY_API_TOKEN: z.string().min(1),
    API_AUTH_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLARITY_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    IP_SALT: process.env.IP_SALT,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    PAYLOAD_DATABASE_URL: process.env.PAYLOAD_DATABASE_URL,
    SERVER_URL: process.env.SERVER_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    CLARITY_API_TOKEN: process.env.CLARITY_API_TOKEN,
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  },
});

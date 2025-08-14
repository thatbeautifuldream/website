import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { env } from "./lib/env";

import { collections } from "./payload-collections";

export default buildConfig({
  editor: lexicalEditor(),

  collections,

  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: env.PAYLOAD_DATABASE_URL,
    },
  }),
  sharp,
});

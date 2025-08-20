import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { buildConfig } from "payload";
import sharp from "sharp";
import { env } from "./lib/env";

import { collections } from "./payload-collections";

export default buildConfig({
  editor: lexicalEditor(),

  collections,

  secret: env.PAYLOAD_SECRET,
  db: postgresAdapter({
    pool: {
      connectionString: env.PAYLOAD_DATABASE_URL,
    },
  }),
  sharp,

  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
        files: true,
      },
      options: {
        token: env.UPLOADTHING_TOKEN,
        acl: "public-read",
      },
      clientUploads: true,
    }),
  ],
  upload: {
    limits: {
      fileSize: 1024 * 1024 * 50, // 50MB
    },
  },
});

import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const guestbook = pgTable("guestbook", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectGuestbookSchema = createSelectSchema(guestbook);

export const insertGuestbookSchema = z.object({
  name: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
});

export const patchGuestbookSchema = insertGuestbookSchema.partial();

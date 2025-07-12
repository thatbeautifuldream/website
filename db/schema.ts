import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const guestbook = pgTable("guestbook", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Manual schemas for full control and reliability
export const selectGuestbookSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertGuestbookSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

export const patchGuestbookSchema = insertGuestbookSchema.partial();

// ID validation schema
export const guestbookIdSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
});

// Route parameter validation
export const guestbookParamsSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
});

// Type exports following the 'T' prefix convention
export type TGuestbook = z.infer<typeof selectGuestbookSchema>;
export type TInsertGuestbook = z.infer<typeof insertGuestbookSchema>;
export type TPatchGuestbook = z.infer<typeof patchGuestbookSchema>;
export type TGuestbookParams = z.infer<typeof guestbookParamsSchema>;

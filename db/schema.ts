import {
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
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

export const clarityRequests = pgTable("clarity_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  numOfDays: integer("num_of_days").notNull(),
  dimension1: text("dimension1"),
  dimension2: text("dimension2"),
  dimension3: text("dimension3"),
  responseData: json("response_data").notNull(),
  requestDate: timestamp("request_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const selectGuestbookSchema = createSelectSchema(guestbook);
export const insertGuestbookSchema = createInsertSchema(guestbook);
export const updateGuestbookSchema = createUpdateSchema(guestbook);
export const guestbookParamsSchema = z.object({
  id: z.string().uuid(),
});

export const selectClarityRequestsSchema = createSelectSchema(clarityRequests);
export const insertClarityRequestsSchema = createInsertSchema(clarityRequests);

export type TGuestbook = z.infer<typeof selectGuestbookSchema>;
export type TInsertGuestbook = z.infer<typeof insertGuestbookSchema>;
export type TUpdateGuestbook = z.infer<typeof updateGuestbookSchema>;
export type TGuestbookParams = z.infer<typeof guestbookParamsSchema>;

export type TClarityRequest = z.infer<typeof selectClarityRequestsSchema>;
export type TInsertClarityRequest = z.infer<typeof insertClarityRequestsSchema>;

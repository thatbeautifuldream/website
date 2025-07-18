import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema, GetZodType } from 'drizzle-zod';
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

export const selectGuestbookSchema = createSelectSchema(guestbook);
export const insertGuestbookSchema = createInsertSchema(guestbook);
export const updateGuestbookSchema = createUpdateSchema(guestbook);
export const guestbookParamsSchema = z.object({
  id: z.string().uuid(),
});


export type TGuestbook = z.infer<typeof selectGuestbookSchema>;
export type TInsertGuestbook = z.infer<typeof insertGuestbookSchema>;
export type TUpdateGuestbook = z.infer<typeof updateGuestbookSchema>;
export type TGuestbookParams = z.infer<typeof guestbookParamsSchema>;

export const todoList = pgTable("todo_list", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectTodoListSchema = createSelectSchema(todoList);
export const insertTodoListSchema = createInsertSchema(todoList);
export const updateTodoListSchema = createUpdateSchema(todoList);

export type TTodoList = z.infer<typeof selectTodoListSchema>;
export type TInsertTodoList = z.infer<typeof insertTodoListSchema>;
export type TUpdateTodoList = z.infer<typeof updateTodoListSchema>;
import { os } from "@orpc/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db/drizzle";
import {
  guestbook,
  selectGuestbookSchema,
  insertGuestbookSchema,
  updateGuestbookSchema,
  guestbookParamsSchema,
} from "@/db/schema";
import { z } from "zod";

export const list = os
  .input(
    z.object({
      limit: z.number().min(1).max(100).default(10),
      offset: z.number().min(0).default(0),
    })
  )
  .output(
    z.object({
      data: z.array(selectGuestbookSchema),
      pagination: z.object({
        limit: z.number(),
        offset: z.number(),
        total: z.number(),
      }),
    })
  )
  .handler(async ({ input }) => {
    const { limit, offset } = input;
    const entries = await db
      .select()
      .from(guestbook)
      .orderBy(desc(guestbook.createdAt))
      .limit(limit)
      .offset(offset);
    return {
      data: entries,
      pagination: {
        limit,
        offset,
        total: entries.length,
      },
    };
  });

export const create = os
  .input(insertGuestbookSchema)
  .output(selectGuestbookSchema)
  .handler(async ({ input }) => {
    const [newEntry] = await db.insert(guestbook).values(input).returning();
    return newEntry;
  });

export const update = os
  .input(
    z.object({
      id: z.string().uuid(),
      data: updateGuestbookSchema,
    })
  )
  .output(selectGuestbookSchema)
  .handler(async ({ input }) => {
    const { id, data } = input;
    const [updatedEntry] = await db
      .update(guestbook)
      .set(data)
      .where(eq(guestbook.id, id))
      .returning();
    if (!updatedEntry) throw new Error("Guestbook entry not found");
    return updatedEntry;
  });

export const remove = os
  .input(guestbookParamsSchema)
  .output(selectGuestbookSchema)
  .handler(async ({ input }) => {
    const { id } = input;
    const [deletedEntry] = await db
      .delete(guestbook)
      .where(eq(guestbook.id, id))
      .returning();
    if (!deletedEntry) throw new Error("Guestbook entry not found");
    return deletedEntry;
  });

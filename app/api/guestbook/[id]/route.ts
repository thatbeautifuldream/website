/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: required by next app router> */
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { db } from "@/db/drizzle";
import {
  guestbook,
  guestbookParamsSchema,
  updateGuestbookSchema,
} from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const params = await request.json();
    const { id } = guestbookParamsSchema.parse(params);

    const [entry] = await db
      .select()
      .from(guestbook)
      .where(eq(guestbook.id, id))
      .limit(1);

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid ID format",
          details: error.cause,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to fetch guestbook entry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const params = await request.json();
    const { id } = guestbookParamsSchema.parse(params);

    const body = await request.json();

    const validatedData = updateGuestbookSchema.parse(body);

    const [updatedEntry] = await db
      .update(guestbook)
      .set(validatedData)
      .where(eq(guestbook.id, id))
      .returning();

    if (!updatedEntry) {
      return NextResponse.json(
        { success: false, error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedEntry,
      message: "Guestbook entry updated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data format",
          details: error.cause,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update guestbook entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const params = await request.json();
    const { id } = guestbookParamsSchema.parse(params);

    const [deletedEntry] = await db
      .delete(guestbook)
      .where(eq(guestbook.id, id))
      .returning();

    if (!deletedEntry) {
      return NextResponse.json(
        { success: false, error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedEntry,
      message: "Guestbook entry deleted successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid ID format",
          details: error.cause,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete guestbook entry" },
      { status: 500 }
    );
  }
}

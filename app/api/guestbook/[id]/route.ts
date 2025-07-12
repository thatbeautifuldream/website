import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guestbook, patchGuestbookSchema } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const id = Number.parseInt(
      request.nextUrl.pathname.split("/").pop() || "0",
      10
    );

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

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
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch guestbook entry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = Number.parseInt(
      request.nextUrl.pathname.split("/").pop() || "0",
      10
    );

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = patchGuestbookSchema.parse(body);

    // Update the guestbook entry
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
    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data format",
          details: error.message,
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
    const id = Number.parseInt(
      request.nextUrl.pathname.split("/").pop() || "0",
      10
    );

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

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
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete guestbook entry" },
      { status: 500 }
    );
  }
}

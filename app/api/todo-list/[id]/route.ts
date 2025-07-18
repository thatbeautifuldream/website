import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { db } from "@/db/drizzle";
import {
    todoList,
    updateTodoListSchema,
    selectTodoListSchema,
} from "@/db/schema";
import { z } from "zod";

const todoListParamsSchema = z.object({
    id: z.string().uuid(),
});

export async function GET(request: NextRequest) {
    try {
        const params = await request.json();
        const { id } = todoListParamsSchema.parse(params);
        const [entry] = await db
            .select()
            .from(todoList)
            .where(eq(todoList.id, id))
            .limit(1);
        if (!entry) {
            return NextResponse.json(
                { success: false, error: "Todo list entry not found" },
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
            { success: false, error: "Failed to fetch todo list entry" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;
        const parsedId = todoListParamsSchema.parse({ id });
        const validatedData = updateTodoListSchema.parse(updateData);
        const [updatedEntry] = await db
            .update(todoList)
            .set(validatedData)
            .where(eq(todoList.id, parsedId.id))
            .returning();
        if (!updatedEntry) {
            return NextResponse.json(
                { success: false, error: "Todo list entry not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            data: updatedEntry,
            message: "Todo list entry updated successfully",
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
            { success: false, error: "Failed to update todo list entry" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const params = await request.json();
        const { id } = todoListParamsSchema.parse(params);
        const [deletedEntry] = await db
            .delete(todoList)
            .where(eq(todoList.id, id))
            .returning();
        if (!deletedEntry) {
            return NextResponse.json(
                { success: false, error: "Todo list entry not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            data: deletedEntry,
            message: "Todo list entry deleted successfully",
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
            { success: false, error: "Failed to delete todo list entry" },
            { status: 500 }
        );
    }
}

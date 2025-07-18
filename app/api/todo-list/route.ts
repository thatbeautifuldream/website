import { desc, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { db } from "@/db/drizzle";
import {
    todoList,
    insertTodoListSchema,
} from "@/db/schema";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
        const offset = Number.parseInt(searchParams.get("offset") || "0", 10);

        const entries = await db
            .select()
            .from(todoList)
            .orderBy(desc(todoList.createdAt))
            .limit(limit)
            .offset(offset);

        return NextResponse.json({
            success: true,
            data: entries,
            pagination: {
                limit,
                offset,
                total: entries.length,
            },
        });
    } catch (_error) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch todo list entries" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = insertTodoListSchema.parse(body);
        const [newEntry] = await db
            .insert(todoList)
            .values(validatedData)
            .returning();
        return NextResponse.json({
            success: true,
            data: newEntry,
            message: "Todo list entry created successfully",
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
            { success: false, error: "Failed to create todo list entry" },
            { status: 500 }
        );
    }
}

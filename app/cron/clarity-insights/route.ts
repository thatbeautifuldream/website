import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel cron
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${env.API_AUTH_TOKEN}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Call the clarity insights endpoint with default parameters
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(
      `${baseUrl}/rpc/clarity/project-live-insights`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.API_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          numOfDays: 7,
          dimension1: "Browser",
          dimension2: "Device",
          dimension3: "Country/Region",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to fetch clarity insights", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Clarity insights fetched successfully",
      timestamp: new Date().toISOString(),
      dataReceived: !!data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { and, count, eq, gte, isNull } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { db } from "../../db/drizzle";
import { clarityRequests } from "../../db/schema";
import { env } from "../../lib/env";
import type {
  TProjectLiveInsightsInput,
  TProjectLiveInsightsResponse,
} from "./types";

const CLARITY_API_BASE_URL = "https://www.clarity.ms/export-data/api/v1";

// Helper function to check for cached data
export async function getCachedData(
  input: TProjectLiveInsightsInput,
  today: Date
): Promise<TProjectLiveInsightsResponse | null> {
  // Build conditions for exact parameter match
  const conditions = [
    gte(clarityRequests.requestDate, today),
    eq(clarityRequests.numOfDays, input.numOfDays),
  ];

  if (input.dimension1) {
    conditions.push(eq(clarityRequests.dimension1, input.dimension1));
  } else {
    conditions.push(isNull(clarityRequests.dimension1));
  }

  if (input.dimension2) {
    conditions.push(eq(clarityRequests.dimension2, input.dimension2));
  } else {
    conditions.push(isNull(clarityRequests.dimension2));
  }

  if (input.dimension3) {
    conditions.push(eq(clarityRequests.dimension3, input.dimension3));
  } else {
    conditions.push(isNull(clarityRequests.dimension3));
  }

  // Check for existing request with same parameters from today
  const existingRequest = await db
    .select({
      responseData: clarityRequests.responseData,
    })
    .from(clarityRequests)
    .where(and(...conditions))
    .limit(1);

  if (existingRequest.length > 0) {
    return existingRequest[0].responseData as TProjectLiveInsightsResponse;
  }

  return null;
}

export async function checkDailyRequestLimit(today: Date): Promise<number> {
  const todayRequestCount = await db
    .select({ count: count() })
    .from(clarityRequests)
    .where(gte(clarityRequests.requestDate, today));

  return todayRequestCount[0]?.count ?? 0;
}

export async function fetchClarityData(
  input: TProjectLiveInsightsInput
): Promise<TProjectLiveInsightsResponse> {
  const clarityToken = env.CLARITY_API_TOKEN;

  // Build query parameters according to API documentation
  const params = new URLSearchParams({
    numOfDays: input.numOfDays.toString(),
  });

  if (input.dimension1) {
    params.append("dimension1", input.dimension1);
  }
  if (input.dimension2) {
    params.append("dimension2", input.dimension2);
  }
  if (input.dimension3) {
    params.append("dimension3", input.dimension3);
  }

  const url = `${CLARITY_API_BASE_URL}/project-live-insights?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${clarityToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    // Handle specific error codes from API documentation
    switch (response.status) {
      case StatusCodes.UNAUTHORIZED:
        throw new Error("Unauthorized: Missing, invalid, or expired token");
      case StatusCodes.FORBIDDEN:
        throw new Error("Forbidden: Token not authorized for operation");
      case StatusCodes.BAD_REQUEST:
        throw new Error("Bad Request: Invalid request parameters");
      case StatusCodes.TOO_MANY_REQUESTS:
        throw new Error(
          "Too Many Requests: Exceeded daily limit (10 requests per project per day)"
        );
      default:
        throw new Error(
          `Clarity API error: ${response.status} ${response.statusText} - ${errorText}`
        );
    }
  }

  return await response.json();
}

export async function saveClarityRequest(
  input: TProjectLiveInsightsInput,
  data: TProjectLiveInsightsResponse
): Promise<void> {
  await db.insert(clarityRequests).values({
    numOfDays: input.numOfDays,
    dimension1: input.dimension1 ?? null,
    dimension2: input.dimension2 ?? null,
    dimension3: input.dimension3 ?? null,
    responseData: data,
    requestDate: new Date(),
  });
}

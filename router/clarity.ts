import { os } from "@orpc/server";
import { and, count, eq, gte, isNull } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { db } from "../db/drizzle";
import { clarityRequests } from "../db/schema";
import { env } from "../lib/env";

const CLARITY_API_BASE_URL = "https://www.clarity.ms/export-data/api/v1";

const DimensionSchema = z.enum([
  "Browser",
  "Device",
  "Country/Region",
  "OS",
  "Source",
  "Medium",
  "Campaign",
  "Channel",
  "URL",
]);

const ProjectLiveInsightsInputSchema = z.object({
  numOfDays: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  dimension1: DimensionSchema.optional(),
  dimension2: DimensionSchema.optional(),
  dimension3: DimensionSchema.optional(),
});

// Metric data structure based on API documentation
// https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api
type TMetricData = {
  totalSessionCount?: string;
  totalBotSessionCount?: string;
  distantUserCount?: string;
  PagesPerSessionPercentage?: number;
  // Dynamic properties based on dimensions (Browser, Device, OS, etc.)
  Browser?: string;
  Device?: string;
  "Country/Region"?: string;
  OS?: string;
  Source?: string;
  Medium?: string;
  Campaign?: string;
  Channel?: string;
  URL?: string;
  [key: string]: unknown;
};

// Response structure based on API documentation
type TProjectLiveInsightsResponse = {
  metricName: string;
  information: TMetricData[];
}[];

// Helper function to check for cached data
async function getCachedData(
  input: z.infer<typeof ProjectLiveInsightsInputSchema>,
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

export const getProjectLiveInsights = os
  .input(ProjectLiveInsightsInputSchema)
  .handler(async ({ input }): Promise<TProjectLiveInsightsResponse> => {
    const clarityToken = env.CLARITY_API_TOKEN;

    // Check for cached data from today with same parameters (early return)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cachedData = await getCachedData(input, today);
    if (cachedData) {
      return cachedData;
    }

    // Check daily request limit before making new API call
    const todayRequestCount = await db
      .select({ count: count() })
      .from(clarityRequests)
      .where(gte(clarityRequests.requestDate, today));

    const requestsMadeToday = todayRequestCount[0]?.count ?? 0;

    if (requestsMadeToday >= 10) {
      throw new Error(
        "Daily request limit exceeded: Maximum 10 requests per day allowed for Clarity API"
      );
    }

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

    try {
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

      const data: TProjectLiveInsightsResponse = await response.json();

      // Save successful request to database
      await db.insert(clarityRequests).values({
        numOfDays: input.numOfDays,
        dimension1: input.dimension1 ?? null,
        dimension2: input.dimension2 ?? null,
        dimension3: input.dimension3 ?? null,
        responseData: data,
        requestDate: new Date(),
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch Clarity data: ${error.message}`);
      }
      throw new Error("Failed to fetch Clarity data: Unknown error");
    }
  });

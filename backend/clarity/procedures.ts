import { authed } from "@/backend/orpc";
import {
  checkDailyRequestLimit,
  fetchClarityData,
  getCachedData,
  saveClarityRequest,
} from "./helpers";
import {
  ProjectLiveInsightsInputSchema,
  type TProjectLiveInsightsResponse,
} from "./types";

export const getProjectLiveInsights = authed
  .input(ProjectLiveInsightsInputSchema)
  .handler(async ({ input }): Promise<TProjectLiveInsightsResponse> => {
    // Check for cached data from today with same parameters (early return)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cachedData = await getCachedData(input, today);
    if (cachedData) {
      return cachedData;
    }

    // Check daily request limit before making new API call
    const requestsMadeToday = await checkDailyRequestLimit(today);

    if (requestsMadeToday >= 10) {
      throw new Error(
        "Daily request limit exceeded: Maximum 10 requests per day allowed for Clarity API"
      );
    }

    try {
      const data = await fetchClarityData(input);

      // Save successful request to database
      await saveClarityRequest(input, data);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch Clarity data: ${error.message}`);
      }
      throw new Error("Failed to fetch Clarity data: Unknown error");
    }
  });

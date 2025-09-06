import { unstable_cache } from "next/cache";
import {
  type TGitHubContributionsAPIResponse,
  type TContributionsResponse,
  type TGitHubContributionsInput,
} from "./types";

export const getCachedContributions = unstable_cache(
  async (params: TGitHubContributionsInput): Promise<TContributionsResponse> => {
    const { username = "thatbeautifuldream", year = "last", format = "flat", noCache = false } = params;
    
    const url = new URL(`/v4/${username}`, "https://github-contributions-api.jogruber.de");
    
    // Add query parameters
    if (year !== "all") {
      url.searchParams.set("y", year);
    }
    
    if (format === "nested") {
      url.searchParams.set("format", "nested");
    }

    const headers: Record<string, string> = {
      "User-Agent": "GitHub-Contributions-API-Client",
    };

    // Add cache-control header if noCache is requested
    if (noCache) {
      headers["Cache-Control"] = "no-cache";
    }
    
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch contributions: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as TGitHubContributionsAPIResponse;
    
    // Calculate total contributions for the requested period
    const years = Object.keys(data.total);
    const totalContributions = Object.values(data.total).reduce((sum, count) => sum + count, 0);

    return {
      contributions: data.contributions,
      total: totalContributions,
      years: years.sort(),
    };
  },
  ["github-contributions"],
  { 
    revalidate: 60 * 60, // Cache for 1 hour (matches API cache)
    tags: ["github-contributions"],
  }
);
import { z } from "zod";

export const DimensionSchema = z.enum([
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

export const ProjectLiveInsightsInputSchema = z.object({
  numOfDays: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(3),
  dimension1: DimensionSchema.optional().default("Browser"),
  dimension2: DimensionSchema.optional().default("Device"),
  dimension3: DimensionSchema.optional().default("Country/Region"),
});

// Metric data structure based on API documentation
// https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api
export type TMetricData = {
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
export type TProjectLiveInsightsResponse = {
  metricName: string;
  information: TMetricData[];
}[];

export type TProjectLiveInsightsInput = z.infer<
  typeof ProjectLiveInsightsInputSchema
>;

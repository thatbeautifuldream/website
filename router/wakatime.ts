import { os } from "@orpc/server";
import { z } from "zod";

export const GrandTotalSchema = z.object({
  ai_additions: z.number(),
  ai_deletions: z.number(),
  decimal: z.string(),
  digital: z.string(),
  hours: z.number(),
  human_additions: z.number(),
  human_deletions: z.number(),
  minutes: z.number(),
  text: z.string(),
  total_seconds: z.number(),
});
export type TGrandTotal = z.infer<typeof GrandTotalSchema>;

export const RangeSchema = z.object({
  date: z.string(),
  end: z.string(),
  start: z.string(),
  text: z.string(),
  timezone: z.string(),
});
export type TRange = z.infer<typeof RangeSchema>;

export const DailyDataSchema = z.object({
  grand_total: GrandTotalSchema,
  range: RangeSchema,
});
export type TDailyData = z.infer<typeof DailyDataSchema>;

export const WakatimeResponseSchema = z.object({
  data: z.array(DailyDataSchema),
});
export type TWakatimeResponse = z.infer<typeof WakatimeResponseSchema>;

export const wakatime = os.output(WakatimeResponseSchema).handler(async () => {
  try {
    const response = await fetch(
      "https://wakatime.com/share/@milindmishra/24901821-58dc-4fe3-a9d9-e24e7b05424d.json",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Wakatime API error ${response.status}:`, errorText);
      throw new Error(`Wakatime API error: ${response.status} - ${errorText}`);
    }

    const rawData = await response.json();

    // Parse and validate the response using the schema
    const validatedData = WakatimeResponseSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.error("Error fetching Wakatime data:", error);
    throw new Error("Failed to fetch Wakatime data");
  }
});

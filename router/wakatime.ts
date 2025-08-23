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

export const CodingActivityResponseSchema = z.object({
  data: z.array(DailyDataSchema),
});
export type TCodingActivityResponse = z.infer<
  typeof CodingActivityResponseSchema
>;

// Language data schema
export const LanguageDataSchema = z.object({
  color: z.string(),
  name: z.string(),
  percent: z.number(),
});
export type TLanguageData = z.infer<typeof LanguageDataSchema>;

export const LanguagesResponseSchema = z.object({
  data: z.array(LanguageDataSchema),
});
export type TLanguagesResponse = z.infer<typeof LanguagesResponseSchema>;

// Editor data schema
export const EditorDataSchema = z.object({
  color: z.string(),
  name: z.string(),
  percent: z.number(),
});
export type TEditorData = z.infer<typeof EditorDataSchema>;

export const EditorsResponseSchema = z.object({
  data: z.array(EditorDataSchema),
});
export type TEditorsResponse = z.infer<typeof EditorsResponseSchema>;

// Operating system data schema
export const OperatingSystemDataSchema = z.object({
  name: z.string(),
  percent: z.number(),
  color: z.string(),
});
export type TOperatingSystemData = z.infer<typeof OperatingSystemDataSchema>;

export const OperatingSystemResponseSchema = z.object({
  data: z.array(OperatingSystemDataSchema),
});
export type TOperatingSystemResponse = z.infer<
  typeof OperatingSystemResponseSchema
>;

// Categories data schema
export const CategoryDataSchema = z.object({
  name: z.string(),
  percent: z.number(),
  color: z.string(),
});
export type TCategoryData = z.infer<typeof CategoryDataSchema>;

export const CategoriesResponseSchema = z.object({
  data: z.array(CategoryDataSchema),
});
export type TCategoriesResponse = z.infer<typeof CategoriesResponseSchema>;

export const getWakatimeCodingActivity = os
  .output(CodingActivityResponseSchema)
  .handler(async () => {
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
        throw new Error(
          `Wakatime API error: ${response.status} - ${errorText}`
        );
      }

      const rawData = await response.json();

      // Parse and validate the response using the schema
      const validatedData = CodingActivityResponseSchema.parse(rawData);
      return validatedData;
    } catch (error) {
      console.error("Error fetching Wakatime data:", error);
      throw new Error("Failed to fetch Wakatime data");
    }
  });

export const getWakatimeLanguages = os
  .output(LanguagesResponseSchema)
  .handler(async () => {
    try {
      const response = await fetch(
        "https://wakatime.com/share/@milindmishra/b62a4db6-2644-4378-b953-942a483a3ac2.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Wakatime Languages API error ${response.status}:`,
          errorText
        );
        throw new Error(
          `Wakatime Languages API error: ${response.status} - ${errorText}`
        );
      }

      const rawData = await response.json();

      // Parse and validate the response using the schema
      const validatedData = LanguagesResponseSchema.parse(rawData);
      return validatedData;
    } catch (error) {
      console.error("Error fetching Wakatime Languages data:", error);
      throw new Error("Failed to fetch Wakatime Languages data");
    }
  });

export const getWakatimeEditors = os
  .output(EditorsResponseSchema)
  .handler(async () => {
    try {
      const response = await fetch(
        "https://wakatime.com/share/@milindmishra/104c54e8-1e45-4d24-8ca0-aaa8fc1293ac.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Wakatime Editors API error ${response.status}:`,
          errorText
        );
        throw new Error(
          `Wakatime Editors API error: ${response.status} - ${errorText}`
        );
      }

      const rawData = await response.json();

      // Parse and validate the response using the schema
      const validatedData = EditorsResponseSchema.parse(rawData);
      return validatedData;
    } catch (error) {
      console.error("Error fetching Wakatime Editors data:", error);
      throw new Error("Failed to fetch Wakatime Editors data");
    }
  });

export const getWakatimeOperatingSystem = os
  .output(OperatingSystemResponseSchema)
  .handler(async () => {
    try {
      const response = await fetch(
        "https://wakatime.com/share/@milindmishra/5164129e-c12b-434e-8a54-b43241f14788.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Wakatime Operating System API error ${response.status}:`,
          errorText
        );
        throw new Error(
          `Wakatime Operating System API error: ${response.status} - ${errorText}`
        );
      }

      const rawData = await response.json();

      // Parse and validate the response using the schema
      const validatedData = OperatingSystemResponseSchema.parse(rawData);
      return validatedData;
    } catch (error) {
      console.error("Error fetching Wakatime Operating System data:", error);
      throw new Error("Failed to fetch Wakatime Operating System data");
    }
  });

export const getWakatimeCategories = os
  .output(CategoriesResponseSchema)
  .handler(async () => {
    try {
      const response = await fetch(
        "https://wakatime.com/share/@milindmishra/0c3e4c61-0062-4097-95f2-8bb3d95d772a.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Wakatime Categories API error ${response.status}:`,
          errorText
        );
        throw new Error(
          `Wakatime Categories API error: ${response.status} - ${errorText}`
        );
      }

      const rawData = await response.json();

      // Parse and validate the response using the schema
      const validatedData = CategoriesResponseSchema.parse(rawData);
      return validatedData;
    } catch (error) {
      console.error("Error fetching Wakatime Categories data:", error);
      throw new Error("Failed to fetch Wakatime Categories data");
    }
  });

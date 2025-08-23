import { os } from "@orpc/server";
import { fetchWakatimeData, WAKATIME_URLS } from "./helpers";
import {
  CategoriesResponseSchema,
  CodingActivityResponseSchema,
  EditorsResponseSchema,
  LanguagesResponseSchema,
  OperatingSystemResponseSchema,
} from "./types";

export const getWakatimeCodingActivity = os
  .output(CodingActivityResponseSchema)
  .handler(async () => {
    const rawData = await fetchWakatimeData(
      WAKATIME_URLS.CODING_ACTIVITY,
      "Coding Activity"
    );

    // Parse and validate the response using the schema
    return CodingActivityResponseSchema.parse(rawData);
  });

export const getWakatimeLanguages = os
  .output(LanguagesResponseSchema)
  .handler(async () => {
    const rawData = await fetchWakatimeData(
      WAKATIME_URLS.LANGUAGES,
      "Languages"
    );

    // Parse and validate the response using the schema
    return LanguagesResponseSchema.parse(rawData);
  });

export const getWakatimeEditors = os
  .output(EditorsResponseSchema)
  .handler(async () => {
    const rawData = await fetchWakatimeData(WAKATIME_URLS.EDITORS, "Editors");

    // Parse and validate the response using the schema
    return EditorsResponseSchema.parse(rawData);
  });

export const getWakatimeOperatingSystem = os
  .output(OperatingSystemResponseSchema)
  .handler(async () => {
    const rawData = await fetchWakatimeData(
      WAKATIME_URLS.OPERATING_SYSTEMS,
      "Operating System"
    );

    // Parse and validate the response using the schema
    return OperatingSystemResponseSchema.parse(rawData);
  });

export const getWakatimeCategories = os
  .output(CategoriesResponseSchema)
  .handler(async () => {
    const rawData = await fetchWakatimeData(
      WAKATIME_URLS.CATEGORIES,
      "Categories"
    );

    // Parse and validate the response using the schema
    return CategoriesResponseSchema.parse(rawData);
  });

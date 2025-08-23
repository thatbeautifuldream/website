export async function fetchWakatimeData<T>(
  url: string,
  errorContext: string
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Wakatime ${errorContext} API error: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch {
    throw new Error(`Failed to fetch Wakatime ${errorContext} data`);
  }
}

export const WAKATIME_URLS = {
  CODING_ACTIVITY:
    "https://wakatime.com/share/@milindmishra/24901821-58dc-4fe3-a9d9-e24e7b05424d.json",
  LANGUAGES:
    "https://wakatime.com/share/@milindmishra/b62a4db6-2644-4378-b953-942a483a3ac2.json",
  EDITORS:
    "https://wakatime.com/share/@milindmishra/104c54e8-1e45-4d24-8ca0-aaa8fc1293ac.json",
  OPERATING_SYSTEMS:
    "https://wakatime.com/share/@milindmishra/5164129e-c12b-434e-8a54-b43241f14788.json",
  CATEGORIES:
    "https://wakatime.com/share/@milindmishra/0c3e4c61-0062-4097-95f2-8bb3d95d772a.json",
} as const;

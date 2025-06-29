/**
 * Get favicon URL from Google's favicon service
 * @param url - The website URL to get favicon for
 * @returns Google favicon service URL
 */
export const getFavicon = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    // Fallback to a default icon if URL parsing fails
    return "https://www.google.com/s2/favicons?domain=example.com&sz=64";
  }
};

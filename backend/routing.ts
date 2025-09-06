import { os } from "@orpc/server";
import { getProjectLiveInsights } from "./clarity/procedures";
import { getContributions } from "./github/procedures";
import {
  createGuestbookEntry,
  deleteGuestbookEntry,
  listGuestbookEntries,
  updateGuestbookEntry,
} from "./guestbook/procedures";
import { detailedHealthCheck, healthCheck } from "./health/procedures";
import {
  generateSpotifyAuthUrl,
  getCurrentlyPlayingTrack,
  getUserTopTracks,
  handleSpotifyCallback,
} from "./spotify/procedures";
import {
  getWakatimeCategories,
  getWakatimeCodingActivity,
  getWakatimeEditors,
  getWakatimeLanguages,
  getWakatimeOperatingSystem,
} from "./wakatime/procedures";

export const router = os.router({
  health: {
    check: healthCheck,
    detailed: detailedHealthCheck,
  },
  clarity: {
    "project-live-insights": getProjectLiveInsights,
  },
  github: {
    contributions: getContributions,
  },
  wakatime: {
    "coding-activity": getWakatimeCodingActivity,
    languages: getWakatimeLanguages,
    editors: getWakatimeEditors,
    "operating-systems": getWakatimeOperatingSystem,
    categories: getWakatimeCategories,
  },
  guestbook: {
    list: listGuestbookEntries,
    create: createGuestbookEntry,
    update: updateGuestbookEntry,
    remove: deleteGuestbookEntry,
  },
  spotify: {
    "currently-playing": getCurrentlyPlayingTrack,
    "top-tracks": getUserTopTracks,
    "auth-url": generateSpotifyAuthUrl,
    callback: handleSpotifyCallback,
  },
});

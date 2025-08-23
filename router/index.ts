import { os } from "@orpc/server";
import { getProjectLiveInsights } from "./clarity";
import {
  createGuestbookEntry,
  deleteGuestbookEntry,
  listGuestbookEntries,
  updateGuestbookEntry,
} from "./guestbook";
import { helloWorld } from "./hello";
import {
  generateSpotifyAuthUrl,
  getCurrentlyPlayingTrack,
  getUserTopTracks,
  handleSpotifyCallback,
} from "./spotify";
import {
  getWakatimeCategories,
  getWakatimeCodingActivity,
  getWakatimeEditors,
  getWakatimeLanguages,
  getWakatimeOperatingSystem,
} from "./wakatime";

export const router = os.router({
  hello: helloWorld,
  clarity: {
    "project-live-insights": getProjectLiveInsights,
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

import { os } from "@orpc/server";
import { helloWorld } from "./hello";
import {
  wakatimeCodingActivity,
  wakatimeLanguages,
  wakatimeEditors,
  wakatimeOperatingSystem,
  wakatimeCategories,
} from "./wakatime";

export const router = os.router({
  hello: helloWorld,
  wakatime: {
    "coding-activity": wakatimeCodingActivity,
    languages: wakatimeLanguages,
    editors: wakatimeEditors,
    "operating-systems": wakatimeOperatingSystem,
    categories: wakatimeCategories,
  },
});

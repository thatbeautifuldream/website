import { os } from "@orpc/server";
import { helloWorld } from "./hello";
import {
  wakatimeCodingActivity,
  wakatimeLanguages,
  wakatimeEditors,
  wakatimeOperatingSystem,
  wakatimeCategories,
} from "./wakatime";
import * as guestbookHandlers from "./guestbook";

export const router = os.router({
  hello: helloWorld,
  wakatime: {
    "coding-activity": wakatimeCodingActivity,
    languages: wakatimeLanguages,
    editors: wakatimeEditors,
    "operating-systems": wakatimeOperatingSystem,
    categories: wakatimeCategories,
  },
  guestbook: {
    list: guestbookHandlers.list,
    create: guestbookHandlers.create,
    update: guestbookHandlers.update,
    remove: guestbookHandlers.remove,
  },
});

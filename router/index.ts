import { os } from "@orpc/server";
import { helloWorld } from "./hello";
import { wakatime } from "./wakatime";

export const router = os.router({
  hello: helloWorld,
  wakatime: wakatime,
});

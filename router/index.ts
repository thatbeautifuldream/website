import { os } from "@orpc/server";
import { helloWorld } from "./hello";

export const router = os.router({
  hello: helloWorld,
});

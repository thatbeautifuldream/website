import { os } from "@orpc/server";
import { z } from "zod";

const helloWorld = os
  .input(
    z.object({
      name: z.string(),
    })
  )
  .handler(({ input }) => {
    return `Hello, ${input.name}!`;
  });

export const router = os.router({
  hello: helloWorld,
});

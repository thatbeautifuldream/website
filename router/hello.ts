import { os } from "@orpc/server";
import { z } from "zod";

export const helloWorld = os
    .input(
        z.object({
            name: z.string(),
        })
    )
    .handler(({ input }) => {
        return `Hello, ${input.name}!`;
    });
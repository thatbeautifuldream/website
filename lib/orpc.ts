import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "@/router";

const isDev = process.env.NODE_ENV === "development";

const link = new RPCLink({
  url: isDev ? "http://localhost:3000/rpc" : "https://milindmishra.com/rpc",
});

export const client: RouterClient<typeof router> = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);

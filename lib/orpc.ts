import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "@/router";

const link = new RPCLink({
  url: "http://localhost:3000/rpc",
});

export const client: RouterClient<typeof router> = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);

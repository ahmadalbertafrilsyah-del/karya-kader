import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export route standar untuk Next.js App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
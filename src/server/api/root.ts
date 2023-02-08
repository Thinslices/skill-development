import { createTRPCRouter } from "./trpc";
import { studyRouter } from "./routers/study";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  study: studyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

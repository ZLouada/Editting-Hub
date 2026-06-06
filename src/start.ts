import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart, createMiddleware } from "@tanstack/react-start";

const debugMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        debug: true,
        error: err.message,
        env: {
          hasSecret: !!process.env.CLERK_SECRET_KEY,
          hasPublishable: !!process.env.VITE_CLERK_PUBLISHABLE_KEY,
        },
        stack: err.stack,
      }, null, 2),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      debugMiddleware,
      clerkMiddleware({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
      }),
    ],
  };
});

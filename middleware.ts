import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { rateLimit } from "./lib/rate-limiter";
import { PROTECTED_ROUTES } from "./routes";

const isProtectedRoute = createRouteMatcher(PROTECTED_ROUTES);

export default clerkMiddleware(async(auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  const ip=req.ip ?? '12.0.0.1';

  const {
    success,
    pending,
    limit,
    remaining,
  }=await rateLimit.limit(ip);

  if(!success || remaining<=0){
    return NextResponse.redirect(new URL('/blocked',req.url).toString());
  }



  return NextResponse.next();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

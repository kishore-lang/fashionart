import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hasClerkKey = Boolean(
  process.env.CLERK_SECRET_KEY &&
  !process.env.CLERK_SECRET_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")
);

const clerkHandler = hasClerkKey ? clerkMiddleware() : null;

export default function middleware(req: NextRequest, event: any) {
  if (clerkHandler) {
    return clerkHandler(req, event);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

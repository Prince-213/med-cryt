// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Public paths that don't require authentication
const publicPaths = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public (login page)
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // Allow access to login page without session
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check for any valid session (admin or staff)
  const adminSession = request.cookies.get("admin_session")?.value;
  const staffSession = request.cookies.get("staff_session")?.value;

  // If no session exists, redirect to login
  if (!adminSession && !staffSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user has a session (admin or staff), allow access to admin routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all admin routes
    "/admin/:path*",
    // Also protect any other non-public routes you want
  ],
};

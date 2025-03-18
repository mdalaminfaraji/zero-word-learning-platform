import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Allow access to login, register, and verification pages for unauthenticated users
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verification");

  // Check if trying to access admin routes
  const isAdminRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/create");

  // If not authenticated and trying to access a protected route, redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated and trying to access auth pages, redirect based on role
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(role === 'admin' ? "/dashboard" : "/", request.url));
  }

  // If trying to access admin routes without admin role, redirect to home
  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/verification",
    "/dashboard/:path*",
    "/create/:path*",
    "/benchmark/:path*",
    "/pathway/:path*",
    "/action/:path*",
    "/analysis/:path*",
    "/forum/:path*",
    "/help/:path*",
    "/",
  ],
};

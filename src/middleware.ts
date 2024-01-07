import * as jose from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import verifyToken from "../server/auth/verifyToken";
import { links } from "./data/navlinks";
import jwtDecoded from "../server/auth/jwtDecoded";

const nonAuthRoutes = [
  "/",
  "/register",
  "/forgot-password",
  "/change-password",
];
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/_next/static")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }
  var jwtoken = request.cookies.get("authToken")?.value;
  if (!jwtoken && nonAuthRoutes.includes(pathname)) return NextResponse.next();

  var isValid = await verifyToken();

  if (isValid) {
    if (pathname.startsWith("/uploads")) return NextResponse.next();
    if (nonAuthRoutes.includes(pathname))
      return NextResponse.redirect(new URL("/home", request.url));
    var decoded = jwtDecoded();
    const isAuthorized = links
      .flatMap((e) => e.links)
      .find(
        (e) =>
          e.activatedFor.includes(decoded.role) && pathname.startsWith(e.href)
      );
    if (isAuthorized) return NextResponse.next();
    return NextResponse.rewrite(new URL("/notAuthorized", request.url));
  }
  var response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("authToken", "", { maxAge: 0 });
  return response;
}

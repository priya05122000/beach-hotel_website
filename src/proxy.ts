import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "thebeachhotel.in";
const WWW_HOST = "www.thebeachhotel.in";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === WWW_HOST || host === CANONICAL_HOST) {
    const protocol =
      request.headers.get("x-forwarded-proto") ??
      request.nextUrl.protocol.replace(":", "");

    if (host !== CANONICAL_HOST || protocol !== "https") {
      return NextResponse.redirect(
        `https://${CANONICAL_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`,
        301
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

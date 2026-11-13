import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "thebeachbay.in";

// Hosts that must 301 to the canonical host: the www variant, plus the old
// thebeachhotel.in domain (so existing links/rankings carry over).
const REDIRECT_HOSTS = new Set([
  "www.thebeachbay.in",
  "thebeachhotel.in",
  "www.thebeachhotel.in",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === CANONICAL_HOST || (host && REDIRECT_HOSTS.has(host))) {
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

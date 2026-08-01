import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebeachhotel.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/images/pdf/",
          "*.php",
          // Internal deep-link params (scroll-to-item on /rooms, /facilities,
          // /destinations) — each already canonicalizes to its clean base
          // page, but that only consolidates indexing signals, it doesn't
          // stop crawlers from fetching (and re-flagging) the parameterized
          // URL itself. Disallowing them here does.
          "/rooms?to=*",
          "/facilities?to=*",
          "/destinations?to=*",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

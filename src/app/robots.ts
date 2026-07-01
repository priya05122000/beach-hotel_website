import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thebeachhotel.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/images/pdf/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

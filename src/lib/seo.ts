import type { Metadata } from "next";

// Default share image (relative paths resolve against metadataBase).
export const DEFAULT_OG_IMAGE = {
  url: "/home/hotel-poolside-exterior-dusk.webp",
  width: 5760,
  height: 2776,
  alt: "Poolside exterior of The Beach Bay, Kanyakumari at dusk",
};

// A page's `openGraph` REPLACES the layout's whole `openGraph` object (Next
// doesn't deep-merge it), so pages that set their own `openGraph` must spread
// this in, or they lose og:image, og:site_name, og:locale and og:type
// ("Incomplete OG tags" in SEO audits). Usage:
//   openGraph: { ...baseOpenGraph, title: "...", description: "...", url: "/page" }
export const baseOpenGraph = {
  type: "website",
  locale: "en_IN",
  siteName: "The Beach Bay",
  images: [DEFAULT_OG_IMAGE],
} satisfies Metadata["openGraph"];

import type { Metadata } from "next";
import "./globals.css";
import {
  arizonaSansBold,
  arizonaFlareRegular,
  arizonaSansRegular,
} from "../lib/font";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thebeachhotel.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Beach Hotel — Kanyakumari",
    template: "%s | The Beach Hotel",
  },
  description:
    "The Beach Hotel, Kanyakumari — a luxury hotel at the confluence of three oceans. Discover world-class rooms, amenities, dining, and unforgettable sea views.",
  keywords: [
    "Beach Hotel Kanyakumari",
    "luxury hotel Kanyakumari",
    "hotel three oceans",
    "sea view hotel Kanyakumari",
    "resort Kanyakumari",
  ],
  authors: [{ name: "The Beach Hotel", url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Beach Hotel",
    images: [
      {
        url: "/home/hero-1.webp",
        width: 1600,
        height: 900,
        alt: "The Beach Hotel, Kanyakumari — aerial sea view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thebeachhotel",
    images: ["/home/hero-1.webp"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${arizonaSansBold.variable} ${arizonaFlareRegular.variable} ${arizonaSansRegular.variable}`}
    >
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

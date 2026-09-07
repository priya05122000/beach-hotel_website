import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import {
  arizonaSansBold,
  arizonaFlareRegular,
  arizonaSansRegular,
} from "../lib/font";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebeachhotel.in";
const GTM_ID = "GTM-NXXNDDNS";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Beach Hotel — Kanyakumari",
    template: "%s | The Beach Hotel",
  },
  description:
    "The Beach Hotel, Kanyakumari — a luxury hotel at the confluence of three oceans, with fine rooms, amenities, dining, and sea views.",
  keywords: [
    "Beach Hotel Kanyakumari",
    "luxury hotel Kanyakumari",
    "hotel three oceans",
    "sea view hotel Kanyakumari",
    "resort Kanyakumari",
  ],
  authors: [{ name: "The Beach Hotel", url: SITE_URL }],
  // No dedicated `publisher` field in Next's Metadata type — `other` emits
  // arbitrary <meta name="..."> tags for cases like this.
  other: {
    publisher: "The Beach Hotel",
  },
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
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--primary-dark)",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

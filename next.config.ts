import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6", "10.226.136.132"],

  /* config options here */
  output: "standalone",
  trailingSlash: false,

  // `dev` uses Turbopack by default; the `webpack()` override below only
  // applies to the production build (`next build --webpack`). This empty
  // block tells Turbopack that's intentional so it doesn't warn/error.
  turbopack: {},

  experimental: {
    // Inlines generated CSS into <style> tags instead of render-blocking
    // <link> tags. Recommended for atomic CSS (Tailwind) — production only.
    inlineCss: true,
  },

  images: {
    // AVIF encoding is far more CPU-expensive than WebP for a marginal size
    // win; on a self-hosted image optimizer (no CDN in front) that cost
    // lands directly in the request path and was the dominant contributor
    // to LCP "resource load duration". WebP alone is fast to encode and
    // still gives strong compression.
    formats: ["image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    qualities: [60, 70, 75, 80, 90],
    // Keep optimized variants cached long-term so repeat requests for the
    // same size/format are served instantly instead of re-encoded.
    minimumCacheTTL: 31536000,
    unoptimized: process.env.NODE_ENV === "development" ? true : false,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.thebeachhotel.in",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.7",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  webpack(config, { isServer }) {
    // Webpack's built-in `default`/`defaultVendors` cache groups hoist any
    // module used by 2+ chunks into a shared chunk regardless of whether
    // those chunks are async (next/dynamic) or part of the initial request.
    // That silently promoted embla-carousel (used by 3 separate lazy-loaded
    // components) into a chunk referenced on every route's initial script
    // list, even routes with no carousel at all. Disabling these two lets
    // Next's own `framework`/`lib` cache groups govern splitting instead,
    // so shared code used only across async boundaries stays async.
    if (!isServer && config.optimization?.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        default: false,
        defaultVendors: false,
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },

      {
        // Must come before the /images/pdf/ override below — Next.js
        // applies same-key headers from later-matching rules last, so a
        // narrower noindex override has to be defined after this general
        // index/follow default or it gets clobbered for PDF paths.
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },

          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },

          {
            key: "Content-Security-Policy",
            value: `
              default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
              script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
              style-src * 'unsafe-inline' data: blob:;
              img-src * data: blob:;
              font-src * data: blob:;
              connect-src * data: blob: ws: wss:;
              frame-ancestors *;
            `.replace(/\n/g, ""),
          },
        ],
      },

      {
        // Defined after the general "/(.*)" block above so this narrower
        // noindex wins for PDF paths (Next.js applies same-key headers from
        // later-matching rules last).
        source: "/images/pdf/:path*",

        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

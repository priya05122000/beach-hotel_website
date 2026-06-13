import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: ["192.168.1.7"],

  /* config options here */
  output: "standalone",
  trailingSlash: false,


  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    qualities: [60, 70, 75, 80, 90],

    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "api.izhtech.com",
      //   pathname: "/uploads/**",
      // },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.7",
        port: "5000",
        pathname: "/uploads/**",
      },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "7700",
      //   pathname: "/images/**",
      // },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "5000",
      //   pathname: "/**",
      // },
    ],
  },

  async headers() {
    return [
      {
        source: "/images/pdf/:path*",

        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
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
        source: "/(.*)",
        headers: [

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
    ];
  },

};

export default nextConfig;

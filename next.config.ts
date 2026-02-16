import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const config: NextConfig = {
  output: "standalone",
};

const nextConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development', // Disable in dev to avoid Turbopack conflict
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.+\/api\/.*/i,
        method: 'POST',
        handler: 'NetworkOnly',
        options: {
          backgroundSync: {
            name: 'sos-queue',
            options: {
              maxRetentionTime: 24 * 60, // Retry for up to 24 hours
            },
          },
        },
      },
      // Map Tile Caching for offline persistence
      {
        urlPattern: /https:\/\/[a-z]\.tile\.openstreetmap\.org\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'map-tiles',
          expiration: {
            maxEntries: 1000,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      // Default fallback for other routes to ensure standard PWA behavior isn't broken
      {
        urlPattern: /^https?.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'others',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
          },
        },
      }
    ],
  },
})(config);

export default nextConfig;

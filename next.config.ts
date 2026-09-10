import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  images: {
    // placeholder photo hosts — swap for the real CDN when photos move off URL-paste
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Source-map upload runs only when SENTRY_AUTH_TOKEN is set (CI). Without it the
// plugin still injects the client config + tunnels, and stays quiet.
const authToken = process.env.SENTRY_AUTH_TOKEN;

export default withSentryConfig(withNextIntl(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT || "smart-pet-website",
  authToken,
  silent: !authToken,
  telemetry: false,
  widenClientFileUpload: true,
  sourcemaps: { disable: !authToken },
});

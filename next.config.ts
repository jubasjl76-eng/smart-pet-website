import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs/config";

// Security headers (Phase 18, A12 #11). App Router injects inline bootstrap
// scripts, so script-src keeps 'unsafe-inline' for now; `next dev` also needs
// 'unsafe-eval' + ws: for HMR.
// ponytail: nonce-based CSP via middleware to drop 'unsafe-inline' on scripts.
const isProd = process.env.NODE_ENV === "production";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https:${isProd ? "" : " ws:"}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  images: {
    // placeholder photo hosts — swap for the real CDN when photos move off URL-paste
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
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

/**
 * Sentry — browser runtime (hardening Phase 15).
 * Next.js loads this before the app hydrates. No DSN → no-op.
 */
import * as Sentry from '@sentry/nextjs';

const dsn = (process.env.NEXT_PUBLIC_SENTRY_DSN as string | undefined)?.trim() || undefined;

Sentry.init({
  dsn,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE) || 0,
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

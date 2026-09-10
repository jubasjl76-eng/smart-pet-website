"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

/** Catches errors in the root layout itself (outside the normal error.tsx). */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body style={{ fontFamily: "system-ui", padding: 32, color: "#334155" }}>
        <h1 style={{ fontSize: 20 }}>Algo correu mal</h1>
        <p>A página não carregou. Recarregue para tentar de novo.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 12 }}>
          Recarregar
        </button>
      </body>
    </html>
  );
}

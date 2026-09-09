import type { ReactNode } from "react";

/** Root pass-through — `<html>` lives on `[locale]/layout`. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

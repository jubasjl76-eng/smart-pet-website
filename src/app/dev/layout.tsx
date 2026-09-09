import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "../globals.css";
import messages from "../../../messages/pt.json";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

/** Isolated from `[locale]` — still needs `<html>` and a message catalog for cards/forms. */
export default function DevLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className={`${bricolage.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full">
        <NextIntlClientProvider locale="pt" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

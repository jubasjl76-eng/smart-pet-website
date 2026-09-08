import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { InterimHeader, InterimFooter } from "@/components/chrome/InterimChrome";

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

export const metadata: Metadata = {
  title: {
    default: "Rathmore Retrievers",
    template: "%s · Rathmore Retrievers",
  },
  description:
    "A small family retriever breeding programme in County Meath. Health-tested parents, puppies raised underfoot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <InterimHeader />
          <div className="flex-1">{children}</div>
          <InterimFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}

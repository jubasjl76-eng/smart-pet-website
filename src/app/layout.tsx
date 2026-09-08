import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { getKennel } from "@/lib/api";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { SITE_URL, SITE_NAME, orgJsonLd } from "@/lib/site";

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

const description =
  "A small family retriever breeding programme in County Meath. Health-tested parents, puppies raised underfoot.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const kennel = await getKennel();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(kennel)) }}
        />
        <SmoothScroll>
          <Header name={kennel.name} />
          <div className="flex-1">{children}</div>
          <Footer kennel={kennel} />
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { hasLocale } from "next-intl";
import "../globals.css";
import { getKennel } from "@/lib/api";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { SITE_URL, SITE_NAME, orgJsonLd, localeUrl, languageAlternates } from "@/lib/site";
import { routing } from "@/i18n/routing";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const description = t("description");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
    description,
    alternates: {
      canonical: localeUrl("/", locale),
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description,
      locale: locale === "pt" ? "pt_PT" : "en_IE",
      url: localeUrl("/", locale),
    },
    twitter: { card: "summary_large_image", title: SITE_NAME, description },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [kennel, messages, t] = await Promise.all([
    getKennel(),
    getMessages(),
    getTranslations("Nav"),
  ]);

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(kennel, locale)) }}
          />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-ink"
          >
            {t("skip")}
          </a>
          <SmoothScroll>
            <Header name={kennel.name} />
            <div id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </div>
            <Footer kennel={kennel} />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

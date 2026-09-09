import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

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

/** Fallback when the request is outside `[locale]`. Portuguese is the default. */
export default function NotFound() {
  return (
    <html lang="pt" className={`${bricolage.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Section>
          <Container as="main">
            <div className="max-w-[46ch]">
              <p className="text-sm uppercase tracking-[0.16em] text-accent">404</p>
              <h1 className="mt-3 font-display text-4xl md:text-5xl">Essa página não está aqui</h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                O link pode ser antigo, ou a ninhada já não é pública. Os cães e a
                ninhada actual continuam no site.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/litters">Ver as ninhadas</Button>
                <Button href="/" variant="ghost">
                  Início
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </body>
    </html>
  );
}

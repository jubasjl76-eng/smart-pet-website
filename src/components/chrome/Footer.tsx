import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Kennel } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { FOOTER_NAV } from "./nav";

export async function Footer({ kennel }: { kennel: Kennel }) {
  const t = await getTranslations("Nav");
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-ink">{kennel.name}</p>
          <p className="mt-2 text-sm text-ink-soft">{kennel.tagline}</p>
          <p className="mt-4 text-sm text-ink-soft">{kennel.location}</p>
        </div>
        <nav aria-label={t("footer")} className="flex flex-col gap-2 text-sm">
          {FOOTER_NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-ink-soft hover:text-ink">
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-ink-soft">
          <a href={`mailto:${kennel.email}`} className="hover:text-ink">
            {kennel.email}
          </a>
          {kennel.phone && <p className="mt-2">{kennel.phone}</p>}
          {kennel.socials && kennel.socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-4">
              {kennel.socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} className="hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}

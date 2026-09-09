import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Litter } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { Media } from "@/components/media/Media";
import { Badge } from "@/components/ui/Badge";
import { formatLitterWhen } from "@/lib/format";
import { litterStatusLabel } from "@/lib/status";

const FALLBACK = "https://picsum.photos/seed/rathmore-litter/1200/900";

export async function LitterCard({
  litter,
  href,
}: {
  litter: Litter;
  href?: string;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("Litters"),
    getLocale(),
  ]);
  const loc = locale as Locale;
  const to = href ?? `/litters/${litter.id}`;
  const src = litter.photos[0] ?? FALLBACK;

  return (
    <article>
      <Link
        href={to}
        className="group grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center"
      >
        <Media
          src={src}
          alt=""
          aspect="4/3"
          sizes="(min-width: 768px) 620px, 90vw"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        <div>
          <Badge>{litterStatusLabel(litter.status, loc)}</Badge>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">{litter.name}</h2>
          <p className="mt-2 text-ink-soft">
            {litter.dam?.name}
            {litter.sire ? ` ${t("and")} ${litter.sire.name}` : ""}
          </p>
          <p className="mt-1 text-ink-soft">
            {formatLitterWhen(litter, loc)}
            {litter.availableCount > 0
              ? ` · ${t("availableOf", { available: litter.availableCount, total: litter.puppyCount })}`
              : ""}
          </p>
          {litter.description && (
            <p className="mt-4 line-clamp-3 text-lg leading-relaxed">
              {litter.description}
            </p>
          )}
          <span className="mt-4 inline-block underline underline-offset-4">
            {t("seeLitter")}
          </span>
        </div>
      </Link>
    </article>
  );
}

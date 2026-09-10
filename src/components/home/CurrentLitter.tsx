import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Litter } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/scroll/Reveal";
import { formatLongDate } from "@/lib/format";

export async function CurrentLitter({ litter }: { litter: Litter }) {
  const [t, locale] = await Promise.all([
    getTranslations("Home"),
    getLocale(),
  ]);
  const loc = locale as Locale;
  const canReserve = litter.availableCount > 0;
  const pups = litter.puppies.slice(0, 4);

  let statusLine: string;
  if (litter.bornOn) {
    const d = formatLongDate(litter.bornOn, loc);
    statusLine = canReserve
      ? loc === "pt"
        ? `Nascidos ${d} · ${litter.availableCount} de ${litter.puppyCount} ainda disponíveis`
        : `Born ${d} · ${litter.availableCount} of ${litter.puppyCount} still available`
      : loc === "pt"
        ? `Nascidos ${d} · todos reservados`
        : `Born ${d} · all reserved`;
  } else if (litter.expectedOn) {
    const d = formatLongDate(litter.expectedOn, loc);
    statusLine =
      loc === "pt" ? `Previstos ${d} · lista de espera aberta` : `Expected ${d} · waitlist open`;
  } else {
    statusLine = loc === "pt" ? "Planeada · lista de espera aberta" : "Planned · waitlist open";
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.16em] text-accent">{t("currentLitter")}</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{litter.name}</h2>
          <p className="mt-3 text-ink-soft">{statusLine}</p>
          {litter.description && (
            <p className="mt-5 text-lg leading-relaxed">{litter.description}</p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            {canReserve && (
              <Link
                href={`/litters/${litter.id}`}
                className="rounded-sm bg-accent px-6 py-3 text-sm text-accent-ink transition-transform active:translate-y-px"
              >
                {t("reservePuppy")}
              </Link>
            )}
            <Link
              href="/apply"
              className="rounded-sm border border-ink/30 px-6 py-3 text-sm transition-colors hover:bg-surface"
            >
              {t("waitlist")}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {pups.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {pups.map((p) => (
                <div key={p.id} className="relative aspect-square overflow-hidden bg-surface">
                  {p.photos[0] ? (
                    <Image
                      src={p.photos[0]}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 280px, 45vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={litter.photos[0] ?? "https://picsum.photos/seed/rathmore-litter/1200/900"}
                alt=""
                fill
                sizes="(min-width: 768px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

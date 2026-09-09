import { getLocale, getTranslations } from "next-intl/server";
import type { Puppy } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { Media } from "@/components/media/Media";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { puppyStatusLabel, puppyStatusTone } from "@/lib/status";

export async function PuppyCard({
  puppy,
  litterId,
}: {
  puppy: Puppy;
  litterId?: string;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("Litter"),
    getLocale(),
  ]);
  const loc = locale as Locale;
  const photo = puppy.photos[0];
  const reserveHref =
    puppy.status === "available" && litterId
      ? `/apply?puppy=${puppy.id}&litter=${litterId}`
      : puppy.status === "available"
        ? `/apply?puppy=${puppy.id}`
        : undefined;

  return (
    <article>
      {photo ? (
        <Media
          src={photo}
          alt={puppy.name}
          aspect="1/1"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
        />
      ) : (
        <div className="aspect-square bg-surface" />
      )}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg">{puppy.name}</h3>
        <Badge tone={puppyStatusTone(puppy.status)}>
          {puppyStatusLabel(puppy.status, loc)}
        </Badge>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {puppy.sex === "male" ? t("male") : t("female")}
        {puppy.color ? ` · ${puppy.color}` : ""}
      </p>
      {reserveHref && (
        <Button href={reserveHref} className="mt-3 px-4 py-2">
          {t("reserve", { name: puppy.name })}
        </Button>
      )}
    </article>
  );
}

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type Crumb = { href?: string; label: string };

export async function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const t = await getTranslations("Nav");
  return (
    <nav aria-label={t("breadcrumb")} className={cn("text-sm text-ink-soft", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {item.href && !last ? (
                <Link href={item.href} className="underline underline-offset-4 hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-ink" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

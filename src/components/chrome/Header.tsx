"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PRIMARY_NAV } from "./nav";

export function Header({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const drawerId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const other = locale === "pt" ? "en" : "pt";

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm sm:flex" aria-label={t("primary")}>
          {PRIMARY_NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "transition-colors hover:text-ink",
                pathname === n.href || pathname.startsWith(`${n.href}/`)
                  ? "text-ink"
                  : "text-ink-soft",
              )}
            >
              {t(n.key)}
            </Link>
          ))}
          <Link
            href={pathname}
            locale={other}
            aria-label={t("switchLocale")}
            className="text-ink-soft transition-colors hover:text-ink"
          >
            {other === "en" ? t("localeEn") : t("localePt")}
          </Link>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="text-sm text-ink sm:hidden"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t("close") : t("menu")}
        </button>
      </Container>

      {open && (
        <div
          id={drawerId}
          className="border-t border-line bg-bg sm:hidden"
          data-lenis-prevent
        >
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label={t("mobile")}>
            {PRIMARY_NAV.map((n, i) => (
              <Link
                key={n.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={n.href}
                className="py-2 text-lg"
                onClick={() => setOpen(false)}
              >
                {t(n.key)}
              </Link>
            ))}
            <Link
              href={pathname}
              locale={other}
              className="py-2 text-lg text-ink-soft"
              onClick={() => setOpen(false)}
            >
              {other === "en" ? t("localeEn") : t("localePt")}
            </Link>
            <Button href="/apply" className="mt-3">
              {t("waitlist")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

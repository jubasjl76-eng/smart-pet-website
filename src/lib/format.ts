import type { Locale } from "@/i18n/routing";
import { DATE_LOCALE } from "./locale";

/** Age from an ISO date. Empty string when `dob` is missing. */
export function formatAge(dob?: string, locale: Locale = "pt"): string {
  if (!dob) return "";
  const years = (Date.now() - Date.parse(dob)) / 3.15576e10;
  if (Number.isNaN(years) || years < 0) return "";
  if (years < 1) {
    const n = Math.max(1, Math.round(years * 12));
    return locale === "pt" ? `${n} meses` : `${n} months`;
  }
  const n = Math.floor(years);
  return locale === "pt" ? `${n} anos` : `${n} years`;
}

export function formatLongDate(iso: string, locale: Locale = "pt"): string {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthYear(iso: string, locale: Locale = "pt"): string {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[locale], {
    month: "long",
    year: "numeric",
  });
}

/** Litter timing line: born / expected / TBA. */
export function formatLitterWhen(
  input: { bornOn?: string | null; expectedOn?: string | null },
  locale: Locale = "pt",
): string {
  if (input.bornOn) {
    const date = formatLongDate(input.bornOn, locale);
    return locale === "pt" ? `Nascidos ${date}` : `Born ${date}`;
  }
  if (input.expectedOn) {
    const date = formatMonthYear(input.expectedOn, locale);
    return locale === "pt" ? `Previstos ${date}` : `Expected ${date}`;
  }
  return locale === "pt" ? "Datas a confirmar" : "Dates to be confirmed";
}

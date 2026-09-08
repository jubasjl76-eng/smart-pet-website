/** Age from an ISO date. Empty string when `dob` is missing. */
export function formatAge(dob?: string): string {
  if (!dob) return "";
  const years = (Date.now() - Date.parse(dob)) / 3.15576e10;
  if (Number.isNaN(years) || years < 0) return "";
  return years < 1
    ? `${Math.max(1, Math.round(years * 12))} months`
    : `${Math.floor(years)} years`;
}

export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IE", {
    month: "long",
    year: "numeric",
  });
}

/** Litter timing line: born / expected / TBA. */
export function formatLitterWhen(input: {
  bornOn?: string | null;
  expectedOn?: string | null;
}): string {
  if (input.bornOn) return `Born ${formatLongDate(input.bornOn)}`;
  if (input.expectedOn) return `Expected ${formatMonthYear(input.expectedOn)}`;
  return "Dates to be confirmed";
}

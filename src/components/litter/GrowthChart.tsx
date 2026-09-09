"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocale, useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { DATE_LOCALE } from "@/lib/locale";
import type { Locale } from "@/i18n/routing";
import type { Puppy } from "@/lib/types";

const PALETTE = ["#1f3a2e", "#a8432a", "#6b8f7a", "#4a5049", "#c06a4e", "#8fb89e", "#3c4a3f"];

/** Weight-over-first-weeks, one line per puppy. Renders nothing without data. */
export function GrowthChart({ puppies }: { puppies: Puppy[] }) {
  const reduced = usePrefersReducedMotion();
  const t = useTranslations("Litter");
  const locale = useLocale() as Locale;
  const withData = puppies.filter((p) => (p.weightSeries?.length ?? 0) > 1);
  if (withData.length === 0) return null;

  const byDate = new Map<string, Record<string, number | string>>();
  for (const p of withData) {
    for (const w of p.weightSeries!) {
      const row = byDate.get(w.date) ?? { date: w.date };
      row[p.name] = w.grams;
      byDate.set(w.date, row);
    }
  }
  const data = [...byDate.values()].sort((a, b) =>
    String(a.date).localeCompare(String(b.date)),
  );

  return (
    <figure>
      <figcaption className="text-sm text-ink-soft">
        {t("weightCaption")}
      </figcaption>
      <div className="mt-3 h-72 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(d) =>
                new Date(d).toLocaleDateString(DATE_LOCALE[locale], { day: "numeric", month: "short" })
              }
              stroke="var(--color-line)"
              tick={{ fill: "var(--color-ink-soft)", fontSize: 12 }}
            />
            <YAxis
              width={44}
              stroke="var(--color-line)"
              tick={{ fill: "var(--color-ink-soft)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-line)",
                borderRadius: "4px",
                fontSize: 13,
                color: "var(--color-ink)",
              }}
            />
            {withData.map((p, i) => (
              <Line
                key={p.id}
                type="monotone"
                dataKey={p.name}
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={2}
                dot={false}
                isAnimationActive={!reduced}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

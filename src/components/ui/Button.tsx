import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/** Needs `NextIntlClientProvider`. Do not use with `href` in root `error.tsx` / `not-found.tsx`. */

const variants = {
  accent:
    "bg-accent text-accent-ink hover:bg-accent/90",
  brand:
    "bg-brand text-bg hover:bg-brand-strong",
  ghost:
    "border border-ink/30 bg-transparent hover:bg-surface",
} as const;

const onBrand = {
  accent: "bg-accent text-accent-ink hover:bg-accent/90",
  brand: "bg-brand-fixed-ink text-brand-fixed hover:bg-brand-fixed-ink/90",
  ghost: "border border-brand-fixed-ink/40 bg-transparent hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof variants;

type Shared = {
  variant?: ButtonVariant;
  /** Ghost/secondary on the brand-fixed band. */
  tone?: "default" | "on-brand";
  className?: string;
  children: React.ReactNode;
};

type AsButton = Shared &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type AsLink = Shared & {
  href: string;
  type?: never;
  disabled?: boolean;
};

export type ButtonProps = AsButton | AsLink;

function classes(variant: ButtonVariant, tone: "default" | "on-brand", className?: string) {
  const palette = tone === "on-brand" ? onBrand : variants;
  return cn(
    "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm",
    "transition-[color,background-color,transform] duration-200 ease-[var(--ease-out)]",
    "active:translate-y-px",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-50",
    palette[variant],
    className,
  );
}

export function Button({
  variant = "accent",
  tone = "default",
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = classes(variant, tone, className);
  if ("href" in rest && rest.href) {
    const { href, disabled, ...linkRest } = rest;
    if (disabled) {
      return (
        <span className={cn(cls, "pointer-events-none opacity-50")} aria-disabled>
          {children}
        </span>
      );
    }
    if (/^(mailto:|https?:|tel:)/.test(href)) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  const buttonRest = rest as AsButton;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

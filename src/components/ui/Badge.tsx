import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-sm px-2 py-0.5 text-xs",
        tone === "accent" ? "bg-accent/15 text-accent" : "bg-surface-2 text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

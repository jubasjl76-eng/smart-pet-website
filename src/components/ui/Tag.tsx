import { cn } from "@/lib/cn";

/** Small uppercase eyebrow — “Current litter”, role labels, etc. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-sm uppercase tracking-[0.16em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

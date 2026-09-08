import { cn } from "@/lib/cn";

export function Section({
  className,
  children,
  id,
  tone = "default",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  /** `brand` is the one fixed-colour band (closing CTA). No other inverts. */
  tone?: "default" | "brand";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32",
        tone === "brand" && "bg-brand-fixed text-brand-fixed-ink",
        className,
      )}
    >
      {children}
    </section>
  );
}

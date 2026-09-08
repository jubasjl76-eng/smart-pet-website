import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "main" | "header" | "footer" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto max-w-[1200px] px-6", className)}>{children}</Tag>
  );
}

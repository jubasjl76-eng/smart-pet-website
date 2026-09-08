import { cn } from "@/lib/cn";

function Pulse({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-surface-2", className)} />;
}

export function MediaSkeleton({
  aspect = "4/3",
  className,
}: {
  aspect?: "1/1" | "4/5" | "4/3";
  className?: string;
}) {
  const box =
    aspect === "1/1"
      ? "aspect-square"
      : aspect === "4/5"
        ? "aspect-[4/5]"
        : "aspect-[4/3]";
  return <Pulse className={cn(box, className)} />;
}

export function DogCardSkeleton() {
  return (
    <div>
      <MediaSkeleton aspect="4/5" />
      <Pulse className="mt-3 h-6 w-2/3" />
      <Pulse className="mt-2 h-4 w-1/2" />
    </div>
  );
}

export function LitterCardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
      <MediaSkeleton aspect="4/3" />
      <div>
        <Pulse className="h-5 w-28" />
        <Pulse className="mt-3 h-8 w-3/4" />
        <Pulse className="mt-3 h-4 w-1/2" />
        <Pulse className="mt-4 h-16 w-full" />
      </div>
    </div>
  );
}

export function PuppyCardSkeleton() {
  return (
    <div>
      <MediaSkeleton aspect="1/1" />
      <Pulse className="mt-3 h-5 w-1/2" />
      <Pulse className="mt-2 h-4 w-1/3" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-8 px-6 py-24">
      <Pulse className="h-12 w-1/3" />
      <Pulse className="h-6 w-2/3" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PuppyCardSkeleton />
        <PuppyCardSkeleton />
        <PuppyCardSkeleton />
      </div>
    </div>
  );
}

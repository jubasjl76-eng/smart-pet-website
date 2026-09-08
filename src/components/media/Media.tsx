"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const ASPECT: Record<string, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
};

/** Surface-coloured 8×5 SVG so remote photos can blur-up without a file. */
const BLUR =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><rect fill="#e8ebe3" width="8" height="5"/></svg>`,
  );

export type MediaAspect = keyof typeof ASPECT;

export function Media({
  src,
  alt,
  aspect = "4/3",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  aspect?: MediaAspect;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", ASPECT[aspect], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}

export function MediaGallery({
  images,
  alt,
  aspect = "4/3",
  className,
}: {
  images: string[];
  alt: string;
  aspect?: MediaAspect;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          "grid gap-3",
          images.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3",
          className,
        )}
      >
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Media
              src={src}
              alt={alt ? `${alt} (${i + 1} of ${images.length})` : ""}
              aspect={aspect}
              sizes="(min-width: 640px) 380px, 90vw"
            />
          </button>
        ))}
      </div>
      {open !== null && (
        <Lightbox
          images={images}
          alt={alt}
          index={open}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  alt,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  alt: string;
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const titleId = useId();
  const prev = useCallback(
    () => onIndex((index - 1 + images.length) % images.length),
    [index, images.length, onIndex],
  );
  const next = useCallback(
    () => onIndex((index + 1) % images.length),
    [index, images.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-strong/85 p-4"
      onClick={onClose}
      data-lenis-prevent
    >
      <p id={titleId} className="sr-only">
        {alt || "Photograph"} — {index + 1} of {images.length}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-sm text-bg underline underline-offset-4"
      >
        Close
      </button>
      <div
        className={cn(
          "relative aspect-[4/3] w-full max-w-5xl",
          !reduced && "transition-opacity duration-200",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={alt}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="absolute inset-x-4 bottom-6 flex justify-between text-sm text-bg">
          <button type="button" onClick={prev} className="underline underline-offset-4">
            Previous
          </button>
          <button type="button" onClick={next} className="underline underline-offset-4">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

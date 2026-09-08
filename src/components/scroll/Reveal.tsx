"use client";
import { useCallback, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Fade + rise once as it enters the viewport. Uses a ref callback +
 * IntersectionObserver and mutates inline style directly — no React state, no
 * re-render. SSR / no-JS / reduced-motion render fully visible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ioRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      ioRef.current?.disconnect();
      if (!el || reduced) return;

      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      requestAnimationFrame(() => {
        el.style.transition = `opacity 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1)`;
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
      ioRef.current = io;
    },
    [reduced, delay],
  );

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  );
}

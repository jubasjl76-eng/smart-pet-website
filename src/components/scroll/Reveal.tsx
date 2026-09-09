"use client";
import { useCallback, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/**
 * Fade + rise once as it enters the viewport. Ref-callback + IntersectionObserver,
 * mutating inline style directly (no React state, no re-render).
 *
 * Safety: content already on-screen at mount reveals right away; a 1.2s timer
 * guarantees nothing is ever left invisible if IO doesn't fire. SSR / no-JS /
 * reduced-motion render fully visible.
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

      const show = () => {
        el.style.opacity = "1";
        el.style.transform = "none";
      };

      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      requestAnimationFrame(() => {
        el.style.transition = `opacity 0.7s ${delay}s ${EASE}, transform 0.7s ${delay}s ${EASE}`;
      });

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        requestAnimationFrame(() => requestAnimationFrame(show));
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show();
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
      ioRef.current = io;

      window.setTimeout(() => {
        if (el.style.opacity === "0") show();
      }, 1200);
    },
    [reduced, delay],
  );

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  );
}

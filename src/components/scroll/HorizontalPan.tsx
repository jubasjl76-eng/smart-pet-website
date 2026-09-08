"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical scroll drives a horizontal pan of the track. Motivated: the parents
 * are one set, browsed as a single gesture. Desktop only — on mobile, and under
 * reduced motion, the track is a normal horizontal-scroll row.
 */
export function HorizontalPan({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !wrap.current || !track.current) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={wrap} className={className}>
      <div
        ref={track}
        className="flex gap-6 overflow-x-auto px-6 md:overflow-visible md:px-[max(1.5rem,calc((100vw-1200px)/2))]"
      >
        {children}
      </div>
    </section>
  );
}

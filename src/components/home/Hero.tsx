"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-pinned hero. Motivated: hold the first impression while the value prop
 * lands, then hand off to the page as the image pushes in and the copy lifts
 * away. Static (no pin) under reduced motion.
 */
export function Hero({ headline, sub }: { headline: string; sub: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: true,
          },
        })
        .to(".hero-media", { scale: 1.12, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: -18, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero-scrim", { opacity: 0.72, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative min-h-[100dvh] overflow-hidden">
      <div className="hero-media absolute inset-0">
        <Image
          src="/home/hero.jpg"
          alt="A golden retriever crossing a misty field at first light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-scrim absolute inset-0 bg-black/50" />

      <div className="hero-copy relative z-10 mx-auto flex min-h-[100dvh] max-w-[1200px] flex-col justify-end px-6 pb-20 pt-24">
        <h1 className="max-w-[15ch] font-display text-5xl font-semibold leading-[1.03] text-white md:text-7xl">
          {headline}
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg text-white/85">{sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/litters"
            className="rounded-sm bg-accent px-6 py-3 text-sm text-accent-ink transition-transform active:translate-y-px"
          >
            See available puppies
          </Link>
          <Link
            href="/dogs"
            className="rounded-sm border border-white/45 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10"
          >
            Meet the dogs
          </Link>
        </div>
      </div>
    </section>
  );
}

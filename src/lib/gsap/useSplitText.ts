"use client";

import { useLayoutEffect } from "react";
import type React from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIM } from "./config";

export interface SplitTextOptions {
  /** Split granularity — "words" (default), "lines", or "chars" */
  type?: "words" | "lines" | "chars";
  stagger?: number;
  duration?: number;
  ease?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** Kill the ScrollTrigger after the first play so it never reverses */
  once?: boolean;
}

/**
 * useSplitText — masked word/line/char reveal on scroll using GSAP SplitText.
 *
 * SplitText must be registered before this hook is called.
 * Registration happens once in LenisProvider.tsx.
 *
 * Usage:
 *   const ref = useRef<HTMLHeadingElement>(null);
 *   useSplitText(ref, { type: "words" });
 *   return <h2 ref={ref}>Your heading text</h2>;
 */
export function useSplitText(
  ref: React.RefObject<HTMLElement | null>,
  options: SplitTextOptions = {}
): void {
  const {
    type = "words",
    stagger = ANIM.stagger.tight,
    duration = ANIM.duration.slow,
    ease = ANIM.ease.default,
    start = ANIM.start.early,
    once = true,
  } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      split = new SplitText(el, { type });
      const pieces =
        type === "words" ? split.words :
        type === "lines" ? split.lines :
        split.chars;

      if (pieces.length === 0) return;

      gsap.set(pieces, { yPercent: 105, opacity: 0, willChange: "transform, opacity" });

      let st: ScrollTrigger | null = null;
      st = ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => {
          gsap.to(pieces, {
            yPercent: 0,
            opacity: 1,
            duration,
            ease,
            stagger,
            onComplete: () => {
              gsap.set(pieces, { willChange: "auto" });
              if (once) st?.kill();
            },
          });
        },
      });
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

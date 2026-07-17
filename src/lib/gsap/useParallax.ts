"use client";

import gsap from "gsap";

export interface ParallaxOptions {
  trigger?: HTMLElement | null;
  /** yPercent to animate from. */
  from: number;
  /** yPercent to animate to. */
  to: number;
  /** ScrollTrigger start string. Default: "top bottom" */
  start?: string;
  /** ScrollTrigger end string. Default: "bottom top" */
  end?: string;
  /** scrub value (true or a smoothing duration in seconds). Default: 1.5 */
  scrub?: number | boolean;
  /** Default: true */
  invalidateOnRefresh?: boolean;
}

/**
 * applyParallax — scroll-scrubbed yPercent drift, the common "background/card parallax"
 * pattern used across section components. Call inside gsap.context / gsap.matchMedia.
 */
export function applyParallax(
  el: HTMLElement | null,
  {
    trigger,
    from,
    to,
    start = "top bottom",
    end = "bottom top",
    scrub = 1.5,
    invalidateOnRefresh = true,
  }: ParallaxOptions
) {
  if (!el) return;

  gsap.fromTo(
    el,
    { yPercent: from },
    {
      yPercent: to,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? el,
        start,
        end,
        scrub,
        invalidateOnRefresh,
      },
    }
  );
}

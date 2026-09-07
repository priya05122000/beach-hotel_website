"use client";

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
 *
 * GSAP + ScrollTrigger are pulled in with a dynamic `import()` so they stay out
 * of each route's initial JS bundle (they were previously imported at module
 * scope, which loaded ~all of GSAP eagerly on every page that touched this
 * helper). The tween is therefore created one microtask later; callers that
 * wrap this in `gsap.context()` still get their inline styles reverted on
 * unmount via `ScrollTrigger` teardown, and `LenisProvider` kills every
 * ScrollTrigger on route change.
 */
export async function applyParallax(
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

  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

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

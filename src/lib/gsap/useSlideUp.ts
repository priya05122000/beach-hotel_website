/**
 * useSlideUp — GSAP text reveal utility (yPercent: 110 → 0)
 *
 * Standalone (ScrollTrigger, plays once on scroll):
 *   useSlideUp({ targets: lineRefs.current, trigger: sectionRef.current })
 *
 * With options:
 *   useSlideUp({ targets: [ref1, ref2], trigger: sectionRef.current,
 *                start: "top 80%", stagger: 0.12, duration: 0.6 })
 *
 * Injected into an existing GSAP timeline (scrub or sequence):
 *   useSlideUp({ targets: lineRefs.current, timeline: tl, position: 0.3 })
 *
 * With delay (staggered independent elements):
 *   useSlideUp({ targets: rightRef.current, trigger: sectionRef.current, delay: 0.5 })
 */
"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SlideUpOptions {
    targets: (HTMLElement | null) | (HTMLElement | null)[];
    trigger?: HTMLElement | null;
    start?: string;
    toggleActions?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
    timeline?: gsap.core.Timeline;
    position?: gsap.Position;
    scope?: HTMLElement | null;
}

export function useSlideUp({
    targets,
    trigger,
    start = "top 75%",
    toggleActions = "play none none none",
    stagger = 0,
    duration = 0.8,
    ease = "power3.out",
    delay = 0,
    timeline,
    position,
    scope,
}: SlideUpOptions) {
    useLayoutEffect(() => {
        const els = (Array.isArray(targets) ? targets : [targets]).filter(
            Boolean
        ) as HTMLElement[];
        if (els.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.set(els, { yPercent: 110 });

            if (timeline) {
                timeline.to(
                    els,
                    { yPercent: 0, duration, ease, stagger, delay },
                    position
                );
            } else {
                gsap.to(els, {
                    yPercent: 0,
                    duration,
                    ease,
                    stagger,
                    delay,
                    scrollTrigger: trigger
                        ? { trigger, start, toggleActions }
                        : undefined,
                });
            }
        }, scope ?? document.body);

        return () => ctx.revert();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

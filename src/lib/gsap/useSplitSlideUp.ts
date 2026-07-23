"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface SplitSlideUpOptions {
    target: HTMLElement | null;
    trigger?: HTMLElement | null;
    start?: string;
    toggleActions?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
    /** Inject into an existing timeline instead of creating a standalone ScrollTrigger tween. */
    timeline?: gsap.core.Timeline;
    position?: gsap.Position;
}

export function applySplitSlideUp({
    target,
    trigger,
    start = "top 75%",
    toggleActions = "play none none none",
    stagger = 0.1,
    duration = 0.8,
    ease = "power3.out",
    delay = 0,
    timeline,
    position,
}: SplitSlideUpOptions) {
    if (!target) return;

    const split = new SplitType(target, {
        types: "lines",
        lineClass: "split-line",
    });

    const lines = target.querySelectorAll<HTMLElement>(".split-line");

    lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";

        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
    });

    gsap.set(lines, {
        yPercent: 110,
    });

    if (timeline) {
        timeline.to(lines, { yPercent: 0, duration, ease, stagger, delay }, position);
    } else {
        gsap.to(lines, {
            yPercent: 0,
            duration,
            ease,
            stagger,
            delay,
            scrollTrigger: trigger
                ? {
                    trigger,
                    start,
                    toggleActions,
                }
                : undefined,
        });
    }

    return split;
}

interface LinesSlideUpOptions {
    /**
     * Pre-split line elements, one per manually-authored line — each must
     * already be wrapped in its own `overflow-hidden` container by the
     * caller's markup (SplitType normally creates that wrapper itself, but
     * it isn't used here).
     */
    lines: (HTMLElement | null)[];
    trigger?: HTMLElement | null;
    start?: string;
    toggleActions?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
    timeline?: gsap.core.Timeline;
    position?: gsap.Position;
}

/**
 * Same line-by-line slide-up reveal as `applySplitSlideUp`, but for a fixed,
 * already-known set of lines instead of auto-detecting them from flowing
 * text. Use this whenever the "lines" are manually authored (a heading split
 * across a few fixed phrases) rather than a paragraph that wraps naturally —
 * SplitType's `types: "lines"` measures rendered text to find line breaks,
 * and it forces `display: inline-block` on any nested child element it
 * encounters while doing so, which silently overrides a manually-forced
 * line break (a `<br>` or a `display: block` span) inside its target.
 */
export function applyLinesSlideUp({
    lines,
    trigger,
    start = "top 75%",
    toggleActions = "play none none none",
    stagger = 0.1,
    duration = 0.8,
    ease = "power3.out",
    delay = 0,
    timeline,
    position,
}: LinesSlideUpOptions) {
    const validLines = lines.filter((line): line is HTMLElement => !!line);
    if (validLines.length === 0) return;

    gsap.set(validLines, { yPercent: 110 });

    if (timeline) {
        timeline.to(validLines, { yPercent: 0, duration, ease, stagger, delay }, position);
    } else {
        gsap.to(validLines, {
            yPercent: 0,
            duration,
            ease,
            stagger,
            delay,
            scrollTrigger: trigger
                ? {
                    trigger,
                    start,
                    toggleActions,
                }
                : undefined,
        });
    }
}
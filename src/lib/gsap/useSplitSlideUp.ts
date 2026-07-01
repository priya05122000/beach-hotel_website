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

    return split;
}
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface FadeInOptions {
  /** y offset to animate from (px). Default: 30 */
  y?: number;
  /** opacity start. Default: 0 */
  opacity?: number;
  /** duration in seconds. Default: 0.8 */
  duration?: number;
  /** ease string. Default: "power3.out" */
  ease?: string;
  /** stagger between children (seconds). Default: 0 */
  stagger?: number;
  /** ScrollTrigger start string. Default: "top 85%" */
  start?: string;
  /** animate children instead of the container itself */
  children?: boolean;
  /** only play once, never reverse. Default: true */
  once?: boolean;
}

/**
 * useFadeIn — Fade + slide-up reveal on scroll using GSAP ScrollTrigger.
 * Drop-in replacement for AOS. Apply to a container ref.
 */
export function useFadeIn<T extends HTMLElement>(
  options: FadeInOptions = {}
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    ease = "power3.out",
    stagger = 0,
    start = "top 85%",
    children = false,
    once = true,
  } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? Array.from(el.children) as HTMLElement[] : [el];
    if (targets.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}

/**
 * applyFadeIn — imperative version for use inside useLayoutEffect / matchMedia callbacks.
 */
export function applyFadeIn(
  targets: HTMLElement | HTMLElement[] | null,
  trigger: HTMLElement | null,
  options: FadeInOptions = {}
) {
  if (!targets || !trigger) return;

  const els = Array.isArray(targets) ? targets : [targets];
  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    ease = "power3.out",
    stagger = 0,
    start = "top 85%",
    once = true,
  } = options;

  if (typeof window !== "undefined") {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
  }

  gsap.fromTo(
    els,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    }
  );
}

// Ensure plugin is registered (idempotent)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

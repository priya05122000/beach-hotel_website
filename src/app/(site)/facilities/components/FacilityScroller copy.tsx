"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function FacilityScroller() {
  const params = useSearchParams();
  const to = params.get("to");

  useEffect(() => {
    if (!to) return;
    // Wait for ScrollTrigger.refresh() (300 ms in LenisProvider) then a tick more
    const id = setTimeout(() => {
      const targets = Array.from(
        document.querySelectorAll(`[data-facility-id="${to}"]`)
      );
      const target = targets.find(
        (el) => (el as HTMLElement).getBoundingClientRect().height > 0
      ) as HTMLElement | null;
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(top);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
    return () => clearTimeout(id);
  }, [to]);

  return null;
}

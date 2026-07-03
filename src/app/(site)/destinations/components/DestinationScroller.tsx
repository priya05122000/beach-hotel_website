"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function DestinationScroller() {
  const params = useSearchParams();
  const to = params.get("to");

  useEffect(() => {
    if (!to) return;
    const id = setTimeout(() => {
      const targets = Array.from(
        document.querySelectorAll(`[data-destination-id="${to}"]`)
      );
      const target = targets.find(
        (el) => (el as HTMLElement).getBoundingClientRect().height > 0
      ) as HTMLElement | null;
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.8 });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
    return () => clearTimeout(id);
  }, [to]);

  return null;
}

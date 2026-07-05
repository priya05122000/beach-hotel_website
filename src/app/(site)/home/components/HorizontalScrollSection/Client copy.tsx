"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { NearbyDestination } from "@/src/types";

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function resolveImage(d: NearbyDestination): string {
  const url = d.image_url;
  let file = "";
  if (Array.isArray(url)) {
    file = url.filter(Boolean)[0] ?? "";
  } else if (url) {
    try {
      const parsed = JSON.parse(url);
      file = Array.isArray(parsed) ? (parsed.filter(Boolean)[0] ?? "") : url;
    } catch {
      file = url;
    }
  }
  return file ? `${API_URL}/uploads/${file}` : "/placeholder.jpg";
}

export default function HorizontalScrollSectionClient({ items }: { items: NearbyDestination[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Reset scroll before creating the pin trigger — same reason as RoomShowcaseSection:
    // this effect runs before the parent's useLayoutEffect, so on back navigation the
    // browser-restored scroll position would cause the pin to apply position:fixed
    // immediately, floating this section above the content below it.
    // window.scrollTo(0, 0);

    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };

    // return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="absolute top-0 pt-16 lg:pt-20 left-0 flex items-start gap-4 will-change-transform"
      >
        {items.map((item, i) => {
          const imgH = i % 2 === 0 ? 255 : 380;
          return (
            <Link
              key={item.id}
              href={`/destinations?to=${item.id}`}
              className="relative shrink-0 w-60 sm:w-80 block"
            >
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: `${imgH}px` }}
              >
                <Image
                  src={resolveImage(item)}
                  alt={item.destination_name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute -bottom-16 w-full">
                  <div className="flex items-center gap-3 px-4">
                    <span className="type-h1 font-extralight leading-none text-gray">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-0.5 type-body">
                      <p className="font-medium text-primary-dark leading-tight line-clamp-2">
                        {item.destination_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="absolute max-w-[95%] sm:max-w-156 lg:max-w-232 xl:max-w-300 mx-auto px-6 sm:px-8 lg:px-16 xl:px-4 pb-16 lg:pb-20 bottom-0 left-0 right-0 flex items-end justify-end">
        <h2 className="mt-2 uppercase text-gray type-h6 tracking-[73%] lg:tracking-[83%]">
          Destination
        </h2>
      </div>
    </div>
  );
}

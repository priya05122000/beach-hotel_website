"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NearbyDestination } from "@/src/types";
import Eyebrow from "@/src/components/common/Eyebrow";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function resolveImage(d: NearbyDestination): string {
  const url = d.image_url;
  let file = "";

  if (Array.isArray(url)) {
    file = url.filter(Boolean)[0] ?? "";
  } else if (url) {
    try {
      const parsed = JSON.parse(url);
      file = Array.isArray(parsed)
        ? parsed.filter(Boolean)[0] ?? ""
        : url;
    } catch {
      file = url;
    }
  }

  return file ? `${API_URL}/uploads/${file}` : "/placeholder.jpg";
}

export default function HorizontalScrollSectionClient({
  items,
}: {
  items: NearbyDestination[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let refreshId = 0;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        let distance = Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(1, distance)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false,
            onRefreshInit: () => {
              distance = Math.max(0, track.scrollWidth - window.innerWidth);
            },
          },
        });
      }, section);

      refreshId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(refreshId);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="absolute left-0 top-0 flex items-start gap-4 pt-16 lg:pt-20 will-change-transform"
      >
        {items.map((item, i) => {
          // Percentage-of-viewport heights scale continuously with screen
          // size (instead of jumping at one breakpoint), while keeping the
          // same ~1.6:1 ratio between the short/tall cards.
          const imgHeightClass = i % 2 === 0 ? "h-[30vh]" : "h-[48vh]";

          return (
            <div
              key={item.id}
              className="relative flex flex-col w-60 shrink-0 sm:w-80"
            >
              <Link
                href={`/destinations?to=${item.id}`}
                className={`relative block w-full ${imgHeightClass}`}
              >
                <Image
                  src={resolveImage(item)}
                  alt={item.destination_name}
                  fill
                  sizes="(min-width: 640px) 320px, 240px"
                  className="object-cover object-top"
                />
              </Link>

              <div className="w-full bg-white pt-4">
                <div className="flex items-end gap-3 px-4">
                  <span className="type-h1 font-extralight leading-none text-primary-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-0.5 type-body">
                    <p className="line-clamp-2 font-medium leading-tight text-charcoal">
                      {item.destination_name}
                    </p>
                  </div>
                </div>

                {item.short_description && (
                  <div className="relative px-4 pt-2">
                    {/* Native line-clamp always ends in "…" — capped by
                        max-height instead so a custom arrow mark can sit
                        in the corner in its place. */}
                    <p className="max-h-[2.6em] overflow-hidden  text-sm leading-tight pr-4 text-gray">
                      {item.short_description}
                    </p>
                    <Link
                      href={`/destinations?to=${item.id}`}
                      aria-label={`View ${item.destination_name}`}
                      className="absolute bottom-0 right-4 flex items-center bg-linear-to-l from-white via-white to-transparent pl-4 text-gray"
                    >
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-[95%] items-end justify-end px-6 pb-16 sm:max-w-156 sm:px-8 lg:max-w-232 lg:px-16 lg:pb-20 xl:max-w-300 xl:px-4">
        <Eyebrow className="mt-2">
          Destination
        </Eyebrow>
      </div>
    </div>
  );
}
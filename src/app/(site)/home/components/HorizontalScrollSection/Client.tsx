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

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1, getDistance())}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });
    }, section);

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="absolute left-0 top-0 flex items-start gap-4 pt-16 lg:pt-20 will-change-transform"
      >
        {items.map((item, i) => {
          const imgH = i % 2 === 0 ? 255 : 380;

          return (
            <Link
              key={item.id}
              href={`/destinations?to=${item.id}`}
              className="relative block w-60 shrink-0 sm:w-80"
            >
              <div
                className="absolute left-0 right-0 top-0"
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
                      <p className="line-clamp-2 font-medium leading-tight text-primary-dark">
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

      <div className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-[95%] items-end justify-end px-6 pb-16 sm:max-w-156 sm:px-8 lg:max-w-232 lg:px-16 lg:pb-20 xl:max-w-300 xl:px-4">
        <h2 className="mt-2 uppercase text-gray type-h6 tracking-[73%] lg:tracking-[83%]">
          Destination
        </h2>
      </div>
    </div>
  );
}
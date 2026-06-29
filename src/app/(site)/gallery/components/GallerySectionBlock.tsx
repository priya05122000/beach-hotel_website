"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryCategory, Gallery } from "@/src/types";
import Section from "@/src/components/common/Section";
import { applySlideUp } from "@/src/lib/gsap/useSlideUp";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  section: GalleryCategory;
  galleries: Gallery[];
  index: number;
}

export default function GallerySectionBlock({ section, galleries, index }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 20%",
          scrub: 0.5,
        },
      },
    );

    applySlideUp([titleRef.current], { trigger: el, start: "top 80%", toggleActions: "play reverse play reverse" });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  const isEven = index % 2 === 0;
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  const imageItems = galleries.filter((g) => g.media_type === "image" && g.media_url);
  const videoItems = galleries.filter((g) => g.media_type === "video" && g.media_url);

  const allMedia = [...imageItems, ...videoItems].slice(0, 5);

  const first = allMedia[0] ?? null;
  const slotMedia = [
    allMedia[0] ?? first,
    allMedia[1] ?? first,
    allMedia[2] ?? first,
    allMedia[3] ?? first,
    allMedia[4] ?? first,
  ];

  const mainUrl = first ? `${apiBase}/uploads/${first.media_url}` : null;
  const mainIsVideo = first?.media_type === "video";

  const topItem = slotMedia[1] ?? slotMedia[0];
  const bottomItem = slotMedia[2] ?? slotMedia[1] ?? slotMedia[0];

  return (
    <div ref={wrapperRef} className="will-change-transform origin-center">
      <Section className="">
        <div
          className={`relative grid grid-cols-1 ${isEven ? "lg:grid-cols-[0.5fr_1.6fr_1fr]" : "lg:grid-cols-[1fr_1.6fr_0.5fr]"} min-h-130 lg:min-h-150 gap-6 border-b border-silver py-16 lg:py-20`}
        >
          <div className={`hidden lg:block${isEven ? "" : "lg:order-3"}`} />
          <div
            className={` lg:absolute lg:inset-0 lg:z-10
              flex flex-col ${isEven ? "items-start" : "lg:items-end"} justify-center
            `}
          >
            <div className="overflow-hidden mb-4">
              <h2 ref={titleRef} className="type-display-lg font-semibold text-primary-dark leading-tight">
                {section.category_name}
              </h2>
            </div>

            <p className={`text-charcoal  type-body font-arizona-flare-regular max-w-lg lg:max-w-37 xl:max-w-50 ${isEven ? "lg:text-left" : "lg:text-right"}`}>
              {section.short_description}
            </p>
          </div>

          <div
            className={`
              relative min-h-70 lg:min-h-0
              ${isEven ? "lg:order-2" : "lg:order-2"}
            `}
          >
            {mainUrl && (
              mainIsVideo ? (
                <video
                  src={mainUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={mainUrl}
                  alt={section.category_name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              )
            )}
          </div>

          <div
            className={`
              flex lg:flex-col gap-6
              ${isEven ? "lg:order-3" : "lg:order-1"}
            `}
          >
            <div className="relative flex-1 min-h-45">
              {topItem && (
                topItem.media_type === "video" ? (
                  <video
                    src={`${apiBase}/uploads/${topItem.media_url}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={`${apiBase}/uploads/${topItem.media_url}`}
                    alt={`${section.category_name} top`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                )
              )}
            </div>
            <div className="relative flex-1 min-h-45">
              {bottomItem && (
                bottomItem.media_type === "video" ? (
                  <video
                    src={`${apiBase}/uploads/${bottomItem.media_url}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={`${apiBase}/uploads/${bottomItem.media_url}`}
                    alt={`${section.category_name} bottom`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
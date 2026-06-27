"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GallerySection } from "@/src/data/gallery-sections";
import Section from "@/src/components/common/Section";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  section: GallerySection;
  index: number;
}

export default function GallerySectionBlock({ section, index }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  const isEven = index % 2 === 0;

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
            <h2 className="font-arizona-flare-regular font-normal text-primary leading-tight">
              {section.category}
            </h2>

            <p className="text-gray text-sm leading-relaxed font-arizona-flare-regular max-w-lg lg:max-w-xs">
              {section.description}
            </p>
          </div>

          <div
            className={`
              relative min-h-70 lg:min-h-0
              ${isEven ? "lg:order-2" : "lg:order-2"}
            `}
          >
            <Image
              src={section.images.main}
              alt={section.category}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div
            className={`
              flex lg:flex-col gap-6
              ${isEven ? "lg:order-3" : "lg:order-1"}
            `}
          >
            <div className="relative flex-1 min-h-45">
              <Image
                src={section.images.top}
                alt={`${section.category} top`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
            <div className="relative flex-1 min-h-45">
              <Image
                src={section.images.bottom}
                alt={`${section.category} bottom`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

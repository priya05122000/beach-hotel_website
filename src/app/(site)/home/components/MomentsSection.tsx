"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "1",
    title: "Gallery 1",
    short_description: "Gallery Image 1",
    media_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
  },
  {
    id: "2",
    title: "Gallery 2",
    short_description: "Gallery Image 2",
    media_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    id: "3",
    title: "Gallery 3",
    short_description: "Gallery Image 3",
    media_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
  },
];

export default function MomentsSection() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      containerRefs.current.forEach((container, i) => {
        const inner = innerRefs.current[i];

        if (!container || !inner) return;

        gsap.fromTo(
          inner,
          { y: -32 },
          {
            y: 32,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section className="bg-white py-16 lg:py-20">
      <div className="mb-32">
        <h2 className="mt-2 uppercase text-gray type-h6 tracking-[73%] lg:tracking-[83%] text-center">
          Influencer Spotlight
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 items-end">
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              containerRefs.current[i] = el;
            }}
            className="relative w-full overflow-hidden h-80 sm:h-96 lg:h-112"
          >
            <div
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={item.media_url}
                alt={item.title}
                fill
                className="object-cover object-center"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
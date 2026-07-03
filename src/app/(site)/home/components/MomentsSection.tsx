"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import type { Gallery } from "@/src/types";

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function MomentsSection({ galleries }: { galleries: Gallery[] }) {
  const items = galleries
    .filter((g) => g.media_type === "image")
    .slice(0, 3);

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
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <Section className="bg-white py-16 lg:py-20">
      <div className="mb-32">
        <h2 className={`mt-2 uppercase text-gray type-h6 tracking-[73%] lg:tracking-[83%] text-center`}>
          {/* Through the Creators&apos; Lens */}
          Influencer Spotlight
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 items-end">
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { containerRefs.current[i] = el; }}
            className="relative w-full overflow-hidden h-80 sm:h-96 lg:h-112"
          >
            <div
              ref={(el) => { innerRefs.current[i] = el; }}
              className="absolute -top-8 -bottom-8 inset-x-0"
            >
              <Image
                src={`${API_URL}/uploads/${item.media_url}`}
                alt={item.title ?? item.short_description ?? "A moment at The Beach Hotel"}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

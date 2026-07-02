"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import gsap from "gsap";
import { ANIM } from "@/src/lib/gsap/config";

const ParallaxGallery = () => {
  const galleryRef = useRef<HTMLElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const imgSmallRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(imgLeftRef.current, { yPercent: -ANIM.parallax.slow * 100 }, 0);
      tl.to(imgRightRef.current, { yPercent: -ANIM.parallax.slow * 50 }, 0);
      tl.to(imgSmallRef.current, { yPercent: -ANIM.parallax.base * 100 }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={galleryRef} className="py-16 px-8 lg:px-16 lg:py-0">
      <Section>
        {/* ── Mobile: two overlapping images, no animation ─────────── */}
        <div className="sm:hidden relative pb-25">
          <div className="relative aspect-3/2 w-[85%] overflow-hidden">
            <Image src="/facilities/2.webp" alt="Hotel room at The Beach Hotel" fill className="object-cover" sizes="85vw" />
          </div>
          <div className="absolute bottom-0 right-0 w-[48%]">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image src="/facilities/3.webp" alt="Hotel interior detail" fill className="object-cover" sizes="48vw" />
            </div>
          </div>
        </div>

        {/* ── Desktop: GSAP parallax offset grid ─────────────────────── */}
        <div className="hidden sm:grid grid-cols-12 gap-10 items-start">
          <div ref={imgLeftRef} className="col-span-4 will-change-transform">
            <div className="relative aspect-3/4 overflow-hidden">
              <Image src="/facilities/1.webp" alt="Hotel facilities at The Beach Hotel" fill className="object-cover" sizes="33vw" />
            </div>
          </div>

          <div className="col-span-1" />

          <div className="relative col-span-5 mt-[30%] pb-35">
            <div ref={imgRightRef} className="will-change-transform">
              <div className="relative aspect-3/2 overflow-hidden">
                <Image src="/facilities/2.webp" alt="Hotel room with sea view" fill className="object-cover" sizes="42vw" />
              </div>
            </div>

            <div
              ref={imgSmallRef}
              className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-40 will-change-transform"
            >
              <div className="relative aspect-4/5 lg:aspect-2/3 overflow-hidden">
                <Image src="/facilities/3.webp" alt="Hotel detail" fill className="object-cover" sizes="160px" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
};

export default ParallaxGallery;

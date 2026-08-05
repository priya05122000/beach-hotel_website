"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import gsap from "gsap";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";
import Eyebrow from "@/src/components/common/Eyebrow";

const TeamSection = () => {
  const galleryRef = useRef<HTMLElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line-by-line reveal using applySplitSlideUp
      const splitReveal = applySplitSlideUp({
        target: revealRef.current,
        trigger: revealRef.current,
        start: "top 80%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
        toggleActions: "play none none none",
      });

      // GSAP parallax (replaces manual scroll handler)
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
        tl.to(imgRightRef.current, { yPercent: ANIM.parallax.slow * 60 }, 0);
        tl.to(imgLeftRef.current, { yPercent: -ANIM.parallax.slow * 80 }, 0);
      });
      return () => splitReveal?.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-16 lg:py-20 bg-primary/4">
      <Section>
        {/* Content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-6 sm:gap-x-[2.2222222222vw] items-start">
          <div className="sm:col-span-3 lg:col-span-2 flex items-center pt-2">
            <Eyebrow className="type-h6  text-left uppercase">Identity</Eyebrow>
          </div>

          <div className="hidden sm:block sm:col-span-1" />

          <div className="sm:col-span-8 flex flex-col gap-8 sm:gap-12">
            {/* Animated line reveal */}
            <h3
              ref={revealRef}
              className="text-primary-dark type-display-2xl leading-tight"
            >
              Signature &<br />Stay
            </h3>

            <div className="type-body-xl text-charcoal max-w-full sm:max-w-75 lg:max-w-sm xl:max-w-md">
              The Beach Hotel stands as one of Kanyakumari's distinguished hospitality destinations, offering remarkable views of the meeting point of three seas. Created for travellers who value comfort, authenticity, and thoughtful service, our hotel brings together contemporary accommodation, fine dining, and memorable experiences in an exceptional coastal setting.
            </div>
          </div>
        </div>
      </Section>

      <section ref={galleryRef} className="mt-10 sm:mt-0 mb-0 sm:mb-20 px-6 sm:px-4">
        <div className="max-w-full sm:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto px-0 md:px-4 lg:px-12 xl:px-0">
          {/* ── Mobile ─────────── */}
          <div className="sm:hidden flex flex-col">
            <div className="relative aspect-3/2 w-[78%] ml-auto">
              <Image src="/facilities/2.webp" alt="Hotel room at The Beach Hotel" fill className="object-cover" sizes="78vw" />
            </div>
            <div className="relative aspect-4/5 w-[48%] -mt-20">
              <Image src="/facilities/3.webp" alt="Hotel interior" fill className="object-cover" sizes="48vw" />
            </div>
            <hr className="mt-6 mb-4 w-1/2" />
            <p className="type-body-sm w-2/3 text-gray leading-relaxed">
              Every stay is shaped by genuine care, meticulous attention to detail, and a commitment to creating lasting impressions.
            </p>
          </div>

          {/* ── Desktop: GSAP parallax grid ─────────────────────────── */}
          <div className="hidden sm:grid grid-cols-12 gap-10 items-start">
            <div className="relative col-span-6 mt-[30%]">
              <div ref={imgRightRef} className="will-change-transform">
                <div className="relative aspect-3/2">
                  <Image src="/facilities/2.webp" alt="Hotel room" fill className="object-cover" sizes="50vw" />
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2" />

            <div ref={imgLeftRef} className="col-span-5 lg:col-span-4 will-change-transform">
              <div className="relative aspect-3/4">
                <Image src="/facilities/1.webp" alt="Hotel facilities" fill className="object-cover" sizes="40vw" />
              </div>
              <hr className="mt-8 mb-6" />
              <p className="type-body text-charcoal">
                We believe in a fluid team approach that allows us to bring together the
                best designers, developers and agencies in the world in order to serve the
                needs of today&apos;s clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamSection;

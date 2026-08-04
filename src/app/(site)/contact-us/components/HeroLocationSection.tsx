"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import { Button } from "@/src/components/common/button";
import { ANIM, prefersReducedMotion } from "@/src/lib/gsap/config";
import { applySplitSlideUp, applyLinesSlideUp } from "@/src/lib/gsap/useSplitSlideUp";
import { applyParallax } from "@/src/lib/gsap/useParallax";
import SubHeading from "@/src/components/common/SubHeading";

export default function HeroLocationSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = prefersReducedMotion();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      applyParallax(imageInnerRef.current, { trigger: gridRef.current, from: -10, to: 10 });
    });

    let splitSub: ReturnType<typeof applySplitSlideUp>;

    if (!prefersReduced) {
      applyLinesSlideUp({
        lines: headingLinesRef.current,
        trigger: headingRef.current,
        start: "top 85%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
      });
      splitSub = applySplitSlideUp({
        target: subRef.current,
        trigger: subRef.current,
        start: "top 80%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.tight,
        ease: ANIM.ease.default,
      });
    }

    return () => {
      mm.revert();
      splitSub?.revert();
    };
  }, []);

  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] xl:grid-cols-2 gap-4 pt-16 lg:py-20">
        {/* Left Panel */}
        <div>
          <h1 ref={headingRef} className="font-semibold text-primary-dark type-h2 leading-tight">
            <div className="overflow-hidden">
              <span ref={(el) => { headingLinesRef.current[0] = el; }} className="block">A Conversation</span>
            </div>
            <div className="overflow-hidden">
              <span ref={(el) => { headingLinesRef.current[1] = el; }} className="block">Starts Right Here</span>
            </div>
          </h1>
        </div>
        {/* Right Panel */}
        <div className="flex flex-col justify-center">
          <div className="max-w-lg">
            <div
              ref={subRef}
              className="type-display-sm uppercase leading-tight text-primary-dark"
            >
              Your perfect stay begins the moment you reach out.
            </div>
            <p className="mt-6 type-body">
              However you wish to begin, our team is here — attentive, discreet and delighted to help craft a stay beyond compare.
            </p>
            <div className="mt-6 md:mt-8 lg:mt-10">
              {/* <Button href="#contact-form" className="text-sm tracking-widest font-arizona-sans-bold">
                Contact A Manager
              </Button> */}
              <Button href="#contact-form" className="pointer-events-auto whitespace-nowrap font-normal text-primary-dark cursor-pointer">
                Contact A Manager
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-12 gap-y-10 sm:gap-10 py-16 lg:py-20">
        <div className="sm:col-span-6 lg:col-span-4 space-y-5">
          {/* <div className="uppercase font-semibold text-primary-dark type-body-xl leading-tight">GETTING HERE</div> */}

          <SubHeading as="p" className="mb-4">
            GETTING HERE
          </SubHeading>
          <p className="type-body">
            Set at the southernmost tip of the Indian peninsula, The Beach Hotel is closer than you imagine — and worth every mile.
          </p>
          <p className="type-body">
            <b className="text-primary-dark font-bold mb-4 tracking-widest font-arizona-flare-regular">By Air</b> - The nearest international gateway is Trivandrum (Thiruvananthapuram) International Airport, approximately [90 km / a 2–2.5 hour scenic drive] away. Thoothukudi International Airport offers an alternative connection from within India.
          </p>
          <p className="type-body">
            <b className="text-primary-dark font-bold mb-4  tracking-widest font-arizona-flare-regular">By Rail</b> - Kanyakumari Railway Station, the final stop on India&apos;s longest rail route, lies just 1KM from the hotel and connects to major cities across. Nagercoil Junction offers further connections nearby.
          </p>
          <p className="type-body">
            <b className="text-primary-dark font-bold mb-4  tracking-widest font-arizona-flare-regular">By Road</b> - Reach us via NH44, the legendary Kashmir-to-Kanyakumari highway that ends where the land meets the sea. The town of Nagercoil is approximately [20 km] away. Chauffeur-driven transfers can be arranged for an easy arrival.
          </p>
        </div>

        <div className="hidden lg:block col-span-1 lg:col-span-2" />

        <div className="sm:col-span-6 lg:col-span-5 flex items-end">
          <div className="relative w-full h-100 overflow-hidden">
            <div
              ref={imageInnerRef}
              className="absolute inset-[-12%] will-change-transform"
            >
              <Image
                src="/contact-us/contact.jpg"
                alt="The Beach Hotel exterior"
                fill
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

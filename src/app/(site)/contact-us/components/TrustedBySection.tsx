"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Marquee from "react-fast-marquee";
import Section from "@/src/components/common/Section";
import { ANIM, prefersReducedMotion } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

const partners = [
  { name: "Seashore & Co", logo: "/contact-us/seashore.png" },
  { name: "GT Holidays", logo: "/contact-us/gtholidays.png" },
  { name: "Sri Maniya College", logo: "/contact-us/srimaniya.png" },
  { name: "Follicle", logo: "/contact-us/follicle.png" },
];

// `hover:grayscale-0` alone never fires on touch devices (no hover), so
// mobile users had no way to see a logo in color. Tapping now drives the
// same visual state that hover drives on desktop — and only one logo (by
// name, shared across every `autoFill`-cloned copy in the marquee) is
// colored at a time; selecting a new one restores the previous one to
// grayscale.
function PartnerLogo({
  partner,
  active,
  onSelect,
}: {
  partner: { name: string; logo: string };
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`mx-10 relative h-16 w-16 lg:h-22 lg:w-36 shrink-0 cursor-pointer lg:cursor-default transition-all duration-300 hover:opacity-70 hover:grayscale-0 ${active ? "opacity-70 grayscale-0" : "opacity-40 grayscale"
        }`}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        sizes="(max-width: 1024px) 64px, 144px"
        className="object-contain"
      />
    </div>
  );
}

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeName, setActiveName] = useState<string | null>(null);

  useLayoutEffect(() => {
    const prefersReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const split = applySplitSlideUp({
        target: headingRef.current,
        trigger: sectionRef.current,
        start: "top 85%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
      });

      return () => split?.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section className=" py-16 md:py-20">
      <div ref={sectionRef} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="sm:pr-10 sm:border-r sm:border-silver/60 text-center sm:text-left">
          <h2
            ref={headingRef}
            className="type-h2 font-semibold leading-tight text-primary-dark whitespace-nowrap"
          >
            Our Group
            <br />
            of Companies
          </h2>
        </div>

        <div className="w-full min-w-0">
          <Marquee
            speed={40}
            gradient={false}
            autoFill
            className="flex items-center"
          >
            {partners.map((partner) => (
              <PartnerLogo
                key={partner.name}
                partner={partner}
                active={activeName === partner.name}
                onSelect={() => {
                  // Desktop already reveals color on hover — tap-to-select
                  // is a mobile-only affordance for devices with no hover.
                  if (window.innerWidth >= 1024) return;
                  setActiveName((prev) => (prev === partner.name ? null : partner.name));
                }}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}

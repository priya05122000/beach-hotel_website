"use client";

import { useLayoutEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import type { NearbyDestination } from "@/src/types";
import Section from "@/src/components/common/Section";
import DestinationImageSlider from "./DestinationImageSlider";
import { Button } from "@/src/components/common/button";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

interface Props {
  destinations: NearbyDestination[];
}

function DestinationItem({ destination }: { destination: NearbyDestination }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!imageWrapRef.current || !sectionRef.current) return;
      gsap.fromTo(
        imageWrapRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    let splitInstance: ReturnType<typeof applySplitSlideUp>;

    if (!prefersReduced) {
      splitInstance = applySplitSlideUp({
        target: titleRef.current,
        trigger: sectionRef.current,
        start: "top 85%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
      });
    }

    return () => {
      mm.revert();
      splitInstance?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20">
      <div className="grid md:grid-cols-[1fr_0.8fr] lg:grid-cols-[0.5fr_1fr_0.8fr] gap-6 lg:gap-10">
        {/* Destination name — desktop sidebar only */}
        <div className="hidden lg:flex items-center">
          <h4 className="type-h6 text-left tracking-widest uppercase">
            {destination.destination_name}
          </h4>
        </div>

        {/* Image + content */}
        <div className="flex flex-col w-full items-start justify-center gap-4 sm:gap-6 lg:gap-10">
          {/* Name visible on mobile & tablet */}
          <h4 className="type-h6 tracking-widest uppercase lg:hidden">
            {destination.destination_name}
          </h4>
          <div ref={imageWrapRef} className="will-change-transform w-full sm:w-auto">
            <DestinationImageSlider
              images={destination.image_url}
              name={destination.destination_name}
            />
          </div>
          <div className="w-full sm:max-w-sm lg:max-w-md xl:max-w-lg">
            <h3
              ref={titleRef}
              className="type-display-sm text-primary-dark leading-tight mb-4"
            >
              {destination.short_description}
            </h3>

            {destination.distance && (
              <div className="flex items-center gap-2 text-dusty mb-4">
                <MapPin size={14} strokeWidth={1.5} />
                <span className="type-body tracking-widest uppercase">
                  {destination.distance} from hotel
                </span>
              </div>
            )}

            <Button
              href="#"
              className="text-[13px] text-primary font-semibold hover:text-primary/80"
            >
              Explore Destination
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start md:items-end">
          {destination.description && (
            <div
              className="text-charcoal type-body"
              dangerouslySetInnerHTML={{ __html: destination.description }}
            />
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-silver" />
    </section>
  );
}

export default function NearbyDestinationsSection({ destinations }: Props) {
  if (!destinations.length) return null;

  return (
    <Section className="py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver pb-10 pt-16 lg:py-20 type-body">
        <h2 className="type-h6 tracking-[73%] text-center sm:text-left lg:tracking-[83%] uppercase">Near By Destinations</h2>
        <div className="text-xl text-charcoal type-body-xl lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 leading-relaxed">
          Kanyakumari is a destination of many wonders — a sacred shore where
          three oceans meet, revered temples that have drawn pilgrims for two
          thousand years, and a hidden hinterland of misted mountains, secret
          waterfalls and timeless heritage that few ever discover. From the
          comfort of The Beach Hotel, every one of these treasures lies within
          easy reach. Let our concierge curate the journey; you need only
          choose where to wander first.
        </div>
      </div>
      <div>
        {destinations.map((destination) => (
          <DestinationItem key={destination.id} destination={destination} />
        ))}
      </div>
    </Section>
  );
}

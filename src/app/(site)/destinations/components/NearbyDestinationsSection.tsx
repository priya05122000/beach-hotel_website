"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import type { NearbyDestination } from "@/src/types";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";
import LazySection from "@/src/components/common/LazySection";
import { Button } from "@/src/components/common/button";
import PillLinkButton from "@/src/components/common/PillLinkButton";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";
import { applyParallax } from "@/src/lib/gsap/useParallax";

// Each destination renders its own carousel — don't fetch embla-carousel
// until the first one is about to scroll into view.
const DynamicDestinationImageSlider = dynamic(
  () => import("./DestinationImageSlider"),
  { ssr: false }
);

interface Props {
  destinations: NearbyDestination[];
}

function DestinationItem({
  destination,
  isLast,
  shouldHaveIvory,
}: {
  destination: NearbyDestination;
  isLast?: boolean;
  shouldHaveIvory: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      applyParallax(imageWrapRef.current, { trigger: sectionRef.current, from: -8, to: 8 });
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
    <Section
      ref={sectionRef}
      data-destination-id={destination.id}
      className={`relative py-16 lg:py-20 ${shouldHaveIvory ? "bg-ivory" : ""}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1fr_0.8fr]  gap-6 lg:gap-10">
        {/* Destination name — desktop sidebar only */}
        <div className="hidden lg:flex flex-col items-start justify-center gap-3">
          <h4 className="type-h6 text-left tracking-widest uppercase">
            {destination.destination_name}
          </h4>

          {destination.distance && (
            <div className="flex items-center gap-2 text-dusty">
              <MapPin size={14} strokeWidth={1.5} />
              <span className="type-body-sm tracking-widest uppercase">
                {destination.distance} from hotel
              </span>
            </div>
          )}
        </div>

        {/* Image + content */}
        <div className="flex flex-col w-full items-start justify-center gap-4 sm:gap-6 lg:gap-10">
          {/* Name visible on mobile & tablet */}
          <div className="flex flex-col gap-3 lg:hidden">
            <h4 className="type-h6 tracking-widest uppercase">
              {destination.destination_name}
            </h4>

            {destination.distance && (
              <div className="flex items-center  gap-2 text-dusty">
                <MapPin size={14} strokeWidth={1.5} />
                <span className="type-body-sm tracking-widest uppercase">
                  {destination.distance} from hotel
                </span>
              </div>
            )}
          </div>
          <div ref={imageWrapRef} className="will-change-transform w-full lg:w-auto">
            <LazySection
              className="w-full lg:w-90 xl:w-118 aspect-4/3"
              placeholder={
                <div className="w-full lg:w-90 xl:w-118 aspect-4/3 bg-silver/20" />
              }
            >
              <DynamicDestinationImageSlider
                images={destination.image_url}
                name={destination.destination_name}
              />
            </LazySection>
          </div>
          <div className="flex flex-col gap-4 w-full lg:max-w-md xl:max-w-lg">
            <h3
              ref={titleRef}
              className="type-display-sm text-primary-dark leading-tight"
            >
              {destination.short_description}
            </h3>



            <div className="flex flex-wrap items-center gap-x-8 pt-4 gap-y-3">
              <Button
                href={destination.destination_link || "#"}
                target={destination.destination_link ? "_blank" : undefined}
                rel={destination.destination_link ? "noopener noreferrer" : undefined}
                className="pointer-events-auto whitespace-nowrap font-normal text-primary-dark cursor-pointer"
              >
                Get Directions<span className="sr-only"> — {destination.destination_name}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start md:items-end">
          <div className="flex flex-col gap-4">
            {destination.description && (
              <div
                className="text-charcoal type-body"
                dangerouslySetInnerHTML={{ __html: destination.description }}
              />
            )}

            {destination.ticket_booking_link && (
              <PillLinkButton
                href={destination.ticket_booking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto mt-4 w-fit"
              >
                Book Tickets
              </PillLinkButton>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      {/* {!isLast && <div className="absolute bottom-0 left-0 right-0 h-px bg-silver" />} */}
    </Section>
  );
}

export default function NearbyDestinationsSection({ destinations }: Props) {
  if (!destinations.length) return null;

  return (
    <>
      <Section className="pt-16 sm:py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 border-b border-silver sm:border-b-0 pb-16  sm:pt-16 lg:pt-20 type-body">
          {/* h2 — the per-destination titles below are h3, so this needs to
            be a real heading or the outline jumps straight from h1 to h3
            ("H2: Missing"). */}
          <Eyebrow as="h2" align="responsive">Near By Destinations</Eyebrow>

          {/* Desktop — uppercase, wide-tracking heading style */}
          <div className="hidden lg:block uppercase type-h6 text-primary-dark lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 tracking-[0.2rem] leading-8">
            Kanyakumari is a destination of many wonders — a sacred shore where
            three oceans meet, revered temples that have drawn pilgrims for two
            thousand years, and a quiet hinterland of misted mountains and
            secret waterfalls that most visitors never get to see. From the
            comfort of The Beach Hotel, all of it lies within easy reach. Let
            our concierge plan the route; you need only choose where to start.
          </div>

          {/* Mobile/tablet — plain body-text style, easier to read at small sizes */}
          <p className="lg:hidden text-xl text-charcoal type-body-xl mt-10 sm:mt-0 leading-relaxed">
            Kanyakumari is a destination of many wonders — a sacred shore where
            three oceans meet, revered temples that have drawn pilgrims for two
            thousand years, and a quiet hinterland of misted mountains and
            secret waterfalls that most visitors never get to see. From the
            comfort of The Beach Hotel, all of it lies within easy reach. Let
            our concierge plan the route; you need only choose where to start.
          </p>
        </div>
      </Section>
      <div>
        {destinations.map((destination, i) => {
          const isEven = i % 2 === 0;
          // Same rule as RoomsList/GallerySectionBlock: alternate ivory
          // bands, flipping parity so an odd total still ends on ivory
          // instead of two whites in a row.
          const shouldHaveIvory =
            destinations.length % 2 === 0 ? isEven : !isEven;

          return (
            <DestinationItem
              key={destination.id}
              destination={destination}
              isLast={i === destinations.length - 1}
              shouldHaveIvory={shouldHaveIvory}
            />
          );
        })}
      </div>
    </>
  );
}

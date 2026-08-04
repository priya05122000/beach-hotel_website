"use client";

import { useRef } from "react";
import type { Reel } from "@/src/types";
import InfluencerCard from "./InfluencerCard";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";

interface Props {
  reels: Reel[];
}

export default function InfluencerGrid({ reels }: Props) {
  // Shared across every card so starting one video pauses whichever other
  // one is currently playing — same rule as the homepage Moments section.
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!reels.length) return null;

  return (
    <Section className="pb-16 sm:py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver py-16 lg:py-20">
        <Eyebrow as="h2" align="responsive">INFLUENCER</Eyebrow>

        {/* Desktop — uppercase, wide-tracking heading style */}
        <div className="hidden lg:block uppercase type-h6 text-primary-dark lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 tracking-[0.2rem] leading-8">
          Every creator brings a unique perspective, capturing the moments that make The Beach Hotel Kanyakumari unforgettable. Browse a collection of authentic stories, stunning visuals and memorable experiences shared from our shores. Through their lens, discover the charm, comfort and coastal beauty that await every guest.
        </div>

        {/* Mobile/tablet — plain body-text style, easier to read at small sizes */}
        <p className="lg:hidden text-xl text-charcoal type-body-xl mt-10 sm:mt-0 leading-relaxed">
          Every creator brings a unique perspective, capturing the moments that make The Beach Hotel Kanyakumari unforgettable. Browse a collection of authentic stories, stunning visuals and memorable experiences shared from our shores. Through their lens, discover the charm, comfort and coastal beauty that await every guest.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pt-16 lg:pt-20">
        {reels.map((reel, i) => (
          <InfluencerCard key={reel.id} reel={reel} videoRefs={videoRefs} index={i} />
        ))}
      </div>
    </Section>
  );
}

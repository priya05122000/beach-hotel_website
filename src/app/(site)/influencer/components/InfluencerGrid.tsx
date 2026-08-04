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
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver pb-10 pt-16 lg:py-20">
        <Eyebrow as="h2" align="responsive">Influencers</Eyebrow>
        <div className="type-body-xl text-charcoal lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 leading-relaxed">
          Creators and travellers who have stayed with us, sharing their own
          view of The Beach Hotel — from sunrise over the confluence of three
          oceans to quiet evenings by the pool. Watch their reels below, and
          follow along on Instagram.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {reels.map((reel, i) => (
          <InfluencerCard key={reel.id} reel={reel} videoRefs={videoRefs} index={i} />
        ))}
      </div>
    </Section>
  );
}

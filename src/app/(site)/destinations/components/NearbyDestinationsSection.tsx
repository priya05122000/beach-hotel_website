"use client";

import { MapPin, ArrowRight, Sparkle } from "lucide-react";
import type { NearbyDestination } from "@/src/types";
import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";
import DestinationImageSlider from "./DestinationImageSlider";
import { Button } from "@/src/components/common/button";

interface Props {
  destinations: NearbyDestination[];
}

function DestinationItem({ destination }: { destination: NearbyDestination }) {
  return (
    <section className="space-y-20">
      <div className="grid sm:grid-cols-[0.5fr_1fr_0.8fr gap-6 lg:gap-10">
        <div className="hidden sm:flex items-center">
          <p className="type-h6 text-center sm:text-left  tracking-widest uppercase">
            {destination.destination_name}
          </p>
        </div>
        <div className="flex flex-col w-full h-full items-start justify-center gap-6 sm:gap-10">
          <DestinationImageSlider
            images={destination.image_url}
            name={destination.destination_name}
          />
          <div className="w-full sm:max-w-sm lg:max-w-md xl:max-w-lg">
            <h2
              className={`type-display-sm text-primary-dark leading-tight mb-4 `}
            >
              {destination.short_description}
            </h2>

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
        <div className="flex items-end">
          {destination.description && (
            <div
              className="text-charcoal "
              dangerouslySetInnerHTML={{ __html: destination.description }}
            />
          )}
        </div>
      </div>

      {/* Subtle divider at bottom */}
      <div className="absolute bottom-0 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 h-px bg-silver" />
    </section>
  );
}

export default function NearbyDestinationsSection({ destinations }: Props) {
  if (!destinations.length) return null;

  return (

    <Section className="py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver pb-10 pt-16 lg:py-20 type-body">
        {/* <Sparkle size={10} fill="#012644" className="" />{" "} */}
        <p className="type-h6 tracking-[73%] text-center sm:text-left  lg:tracking-[83%] uppercase">Near By Destinations</p>
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
      <div className="py-16 lg:py-20">
        {destinations.map((destination) => (
          <DestinationItem key={destination.id} destination={destination} />
        ))}
      </div>


    </Section>
  );
}
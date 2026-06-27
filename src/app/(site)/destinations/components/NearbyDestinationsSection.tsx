"use client";

import { MapPin, ArrowRight } from "lucide-react";
import type { NearbyDestination } from "@/src/types";
import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";
import DestinationImageSlider from "./DestinationImageSlider";

interface Props {
  destinations: NearbyDestination[];
}

function DestinationItem({ destination }: { destination: NearbyDestination }) {
  return (
    <Section className="py-16 md:py-20">
      <div className="grid sm:grid-cols-[1fr_2fr]">
        <div className="hidden sm:flex items-center">
          <p className="text-gray text-xs sm:text-sm uppercase tracking-[0.25em] font-arizona-sans-regular">
            Nearby
          </p>
        </div>
        <div className="flex flex-col w-full h-full items-start justify-center gap-6 sm:gap-10">
          <DestinationImageSlider
            images={destination.image_url}
            name={destination.destination_name}
          />
          <div className="w-full sm:max-w-sm lg:max-w-md xl:max-w-lg">
            <h2
              className={`font-arizona-flare-regular font-normal text-primary leading-tight mb-2 ${typography.textFiXl}`}
            >
              {destination.destination_name}
            </h2>

            {destination.short_description && (
              <p
                className={`text-gray leading-relaxed mb-8 ${typography.textLg}`}
              >
                {destination.short_description}
              </p>
            )}

            {destination.distance && (
              <div className="flex items-center gap-2 text-dusty mb-8">
                <MapPin size={14} strokeWidth={1.5} />
                <span className="text-sm font-arizona-sans-regular tracking-widest uppercase">
                  {destination.distance} from hotel
                </span>
              </div>
            )}
            <a
              href="#"
              className="group inline-flex items-center gap-3 text-sm font-arizona-sans-regular text-primary uppercase tracking-widest"
            >
              <span className="relative flex items-center justify-center">
                <span className="block w-2 h-2 rounded-full border border-gray/40 transition-all duration-400 ease-in-out group-hover:scale-0 group-hover:opacity-0" />
                <span className="absolute flex items-center justify-center w-3 h-3 rounded-full bg-primary scale-0 opacity-0 transition-all duration-400 ease-in-out group-hover:scale-[3.2] group-hover:opacity-100 pl-[0.1px]">
                  <ArrowRight
                    size={5}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </span>
              </span>
              <span className="relative pb-0.5 transition-all duration-300 group-hover:ml-2">
                Explore Destination
                <span className="absolute left-0 bottom-0 h-px w-full bg-primary/50 origin-right transition-transform duration-600 group-hover:scale-x-0" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle divider at bottom */}
      <div className="absolute bottom-0 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 h-px bg-silver" />
    </Section>
  );
}

export default function NearbyDestinationsSection({ destinations }: Props) {
  if (!destinations.length) return null;

  return (
    <section>
      {destinations.map((destination) => (
        <DestinationItem key={destination.id} destination={destination} />
      ))}
    </section>
  );
}

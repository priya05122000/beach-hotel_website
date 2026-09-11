"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import type { Room } from "@/src/types";
import { applyParallax } from "@/src/lib/gsap/useParallax";

import CenterSection from "@/src/components/common/CenterSection";
import Eyebrow from "@/src/components/common/Eyebrow";
import Link from "next/link";
import { Button } from "@/src/components/common/button";
import {
  BedDouble,
  Ruler,
  Users,
  Wind,
  Wifi,
  Wine,
  DoorOpen,
  Bath,
  Waves,
  Droplets,
  UtensilsCrossed,
  Sofa,
  Tv,
  LockKeyhole,
  ConciergeBell,
  WashingMachine,
  Accessibility,
  PawPrint,
  Coffee,
  Shirt,
  AlarmClock,
  Sparkles,
  Expand,
  Sun,
  Star,
  Moon,
  Armchair,
  Building2,
  Clock,
  Heart,
  Compass,
  Sunrise,
  Sunset,
  Eye as EyeIcon,
} from "lucide-react";
import SubHeading from "@/src/components/common/SubHeading";
import Pill from "@/src/app/(site)/rooms/components/Pill";

// Kept in sync with ADDITIONAL_KEYS_OPTIONS in
// beachhotelcmsfrontend/src/app/(protected)/rooms/roomOptions.ts — every
// value the CMS lets an admin pick should have an icon here.
const AMENITY_MAP: Record<string, React.ElementType> = {
  "Air Conditioning": Wind,
  "Wi-Fi": Wifi,
  Minibar: Wine,
  Balcony: DoorOpen,
  Bathtub: Bath,
  "Private Pool": Waves,
  Jacuzzi: Droplets,
  Kitchen: UtensilsCrossed,
  "Living Room": Sofa,
  "Smart TV": Tv,
  "Safe Deposit Box": LockKeyhole,
  "Room Service": ConciergeBell,
  "Laundry Service": WashingMachine,
  "Wheelchair Accessible": Accessibility,
  "Pet Friendly": PawPrint,
  "Tea Maker / Kettle": Coffee,
  "Iron Board": Shirt,
  "Wake Up Call": AlarmClock,
  "Comfortable Bedding": BedDouble,
  "Neat Interiors": Sparkles,
  "Spacious Interiors": Expand,
  "Large Windows with Natural Light": Sun,
  "Well-Appointed Bedding": Star,
  "Restful Bedding Arrangement": Moon,
  "Private Lounge Access": Armchair,
  "Rooftop Access": Building2,
  "Suitable for Short Stays": Clock,
  "Suitable for Couples and Small Families": Heart,
};

// Kept in sync with VIEW_OPTIONS in the same CMS file.
const VIEW_MAP: Record<string, React.ElementType> = {
  "Sea View": Waves,
  "Fountain View": Droplets,
  "Rooftop View": Building2,
  "360 Degree Sea View": Compass,
  "Sunrise View": Sunrise,
  "Sunset View": Sunset,
};

interface RoomCardsSectionProps {
  rooms: Room[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const normalizeImages = (url?: string | string[] | null): string[] => {
  if (!url) return [];
  if (Array.isArray(url)) return url;
  try {
    const parsed = JSON.parse(url);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // url is a plain string, not JSON — fall through
  }
  return [url];
};

const resolveImage = (url?: string | string[] | null): string => {
  const images = normalizeImages(url);
  return images.length > 0 ? `${API_URL}/uploads/${images[0]}` : "/placeholder.jpg";
};

function RoomCard({ room }: { room: Room }) {
  const amenities = (room.additional_keys ?? []).map((key) => ({
    icon: AMENITY_MAP[key] ?? Sparkles,
    label: key,
  }));

  const views = (room.view ?? []).map((label) => ({
    icon: VIEW_MAP[label] ?? EyeIcon,
    label,
  }));

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden aspect-3/2">
        <Image
          src={resolveImage(room.image_url)}
          alt={room.name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="pt-6 flex flex-col gap-4">
        {room.view && (
          <p className="uppercase text-gray tracking-widest text-[11px]">
            {room.type}
          </p>
        )}

        <SubHeading as="h3" className="text-primary-dark">
          {room.name}
        </SubHeading>

        {room.description && (
          <div
            suppressHydrationWarning
            className="blog-content text-charcoal max-w-lg"
            dangerouslySetInnerHTML={{ __html: room.description }}
          />
        )}

        <div className="flex flex-wrap type-label gap-x-6 gap-y-3">
          {room.size && (
            <div className="flex items-center gap-2 text-gray">
              <Ruler size={13} strokeWidth={1.5} />
              <span className="tracking-widest uppercase">
                {room.size} sq. ft.
              </span>
            </div>
          )}
          {room.max_guests != null && (
            <div className="flex items-center gap-2 text-gray">
              <Users size={13} strokeWidth={1.5} />
              <span className="tracking-widest uppercase">
                Up to {room.max_guests} guests
              </span>
            </div>
          )}
          {room.bed_type && (
            <div className="flex items-center gap-2 text-gray">
              <BedDouble size={13} strokeWidth={1.5} />
              <span className="tracking-widest uppercase">
                {room.bed_type}
              </span>
            </div>
          )}
          {views.map((v) => (
            <div key={v.label} className="flex items-center gap-2 text-gray">
              <v.icon size={13} strokeWidth={1.5} />
              <span className="tracking-widest uppercase">{v.label}</span>
            </div>
          ))}
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {amenities.map((a) => (
              <Pill key={a.label} icon={a.icon} label={a.label} />
            ))}
          </div>
        )}

        <Link
          href={`/rooms?to=${room.id}`}
          className="flex items-center gap-1 type-label-sm tracking-[2px] text-gray uppercase mt-6 underline underline-offset-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}



export default function RoomCardsSectionClient({
  rooms,
}: RoomCardsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        cardsRef.current.forEach((card, index) => {
          applyParallax(card, {
            trigger: sectionRef.current,
            from: index === 0 ? 10 : 20,
            to: index === 0 ? -10 : -20,
            scrub: 1,
          });
        });

        ScrollTrigger.refresh();
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div className="py-16 lg:py-20 bg-ivory">
      <CenterSection>
        {/* Heading */}
        <div className="mb-8 lg:mb-12 text-center">
          <Eyebrow as="h2" align="center" className="mt-2">
            Room Types
          </Eyebrow>
          <p className="max-w-xl mx-auto my-10 text-charcoal type-body">
            Every room at The Beach Hotel is furnished for comfort and quiet
            grandeur. Choose your perfect room and wake to the most
            extraordinary edge of India.
          </p>
        </div>
        <div ref={sectionRef} className="min-h-screen flex items-center ">
          <div className="grid sm:grid-cols-2 gap-16 w-full">
            {rooms.slice(0, 2).map((room, index) => (
              <div
                key={room.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={index === 1 ? "lg:mt-24" : ""}
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </div>
      </CenterSection>

      <Section>
        <div className="flex justify-end">
          {/* <Button
            href="/rooms"
            className="cursor-pointer  text-end  w-40   px-3 py-1 whitespace-nowrap"
          >
            View All
          </Button> */}

          <Button href="/rooms" className="sm:w-50  whitespace-nowrap font-normal text-primary-dark cursor-pointer">
            Find Your Room
          </Button>
        </div>
      </Section>
    </div>
  );
}

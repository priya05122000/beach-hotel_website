"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import type { Room } from "@/src/types";
import { applyParallax } from "@/src/lib/gsap/useParallax";

gsap.registerPlugin(ScrollTrigger);

import CenterSection from "@/src/components/common/CenterSection";
import Eyebrow from "@/src/components/common/Eyebrow";
import Link from "next/link";
import { Button } from "@/src/components/common/button";
import { BedDouble, Eye, PawPrint, Ruler, Users } from "lucide-react";
import SubHeading from "@/src/components/common/SubHeading";

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

      <div className="pt-6">
        <div className="flex gap-2 flex-wrap mb-2">
          {room.view && (
            <p className="uppercase text-gray py-1 tracking-widest text-[11px]">
              {room.type}
            </p>
          )}

        </div>

        <SubHeading as="h3" className="text-primary-dark mb-4">
          {room.name}
        </SubHeading>

        <p className="mb-4 type-body text-charcoal">
          {room.description}
        </p>

        <ul className="space-y-2 text-sm text-gray">
          {room.size && (
            <li className="flex items-center gap-2">
              <Ruler size={16} className="" />
              <span> {room.size} sq. ft.</span>
            </li>
          )}

          {room.max_guests && (
            <li className="flex items-center gap-2">
              <Users size={16} className="" />
              <span> Up to {room.max_guests} guests</span>
            </li>
          )}

          {room.bed_type && (
            <li className="flex items-center gap-2">
              <BedDouble size={16} className="" />
              <span>{room.bed_type}</span>
            </li>
          )}

          {room.floor && (
            <li className="flex items-center gap-2">
              <Eye size={16} className="" />
              <span>{room.view}</span>
            </li>
          )}

          {room.additional_keys?.includes("Pet Friendly") && (
            <li className="flex items-center gap-2">
              <PawPrint size={16} />
              <span>Pet Friendly</span>
            </li>
          )}
        </ul>

        <Link
          href={`/rooms?to=${room.id}`}
          className="flex items-center gap-1 type-label-sm tracking-[2px] text-gray uppercase mt-10 underline underline-offset-2"
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
    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
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

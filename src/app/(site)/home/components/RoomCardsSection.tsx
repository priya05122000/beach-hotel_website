"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, Users, BedDouble, Sofa } from "lucide-react";

import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";

gsap.registerPlugin(ScrollTrigger);

import type { LucideIcon } from "lucide-react";
import CenterSection from "@/src/components/common/CenterSection";
import Link from "next/link";
import { Button } from "@/src/components/common/button";

interface RoomHighlight {
  text: string;
  accent: boolean;
  icon: LucideIcon;
}

interface Room {
  id: number;
  name: string;
  views: string[];
  description: string;
  highlights: RoomHighlight[];
  images: string[];
}

const rooms: Room[] = [
  {
    id: 1,
    name: "PAIZA CLUB ROOM",
    views: ["City View", "Sea View"],
    description:
      "An exquisitely designed and artfully curated haven of calm in the heart of the city.",
    highlights: [
      { text: "55 sqm on average", accent: false, icon: Maximize2 },
      { text: "Up to 3 guests", accent: true, icon: Users },
      { text: "1 king bed", accent: true, icon: BedDouble },
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    ],
  },
  {
    id: 2,
    name: "PAIZA BAY SUITE",
    views: ["Sea View"],
    description:
      "Feel entirely at home in the Paiza Bay Suite overlooking the ocean.",
    highlights: [
      { text: "75 sqm on average", accent: false, icon: Maximize2 },
      { text: "Up to 3 guests", accent: true, icon: Users },
      { text: "Living room", accent: true, icon: Sofa },
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
    ],
  },
];

function RoomCard({ room }: { room: Room }) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
  });

  return (
    <div className="flex flex-col">
      <div ref={emblaRef} className="relative overflow-hidden aspect-3/2">
        <div className="flex h-full">
          {room.images.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%]">
              <Image
                src={src}
                alt={room.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3
          className={`font-semibold tracking-wider type-body-lg text-primary-dark uppercase mb-4 `}
        >
          {room.name}
        </h3>

        <div className="flex gap-2 border border-primary/15 w-fit flex-wrap mb-4">
          {room.views.map((view, index) => (
            <p
              key={view}
              className={` px-3 py-1 text-xs ${
                index === 1 ? "bg-primary/15 text-gray" : ""
              }`}
            >
              {view}
            </p>
          ))}
        </div>

        <p className={` mb-4 type-body text-charcoal`}>{room.description}</p>

        <ul className="space-y-2">
          {room.highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={i}
                className="flex items-center gap-2 type-body text-charcoal"
              >
                <Icon size={16} className="shrink-0 text-gray-500" />
                <p>{item.text}</p>
              </li>
            );
          })}
        </ul>

        <Link
          href="/gallery"
          className="flex cursor-pointer items-center gap-1 type-body  text-gray-700 tracking-wider font-arizona-flare-regular mt-10  py-1 whitespace-nowrap underline underline-offset-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function RoomCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            yPercent: index === 0 ? 10 : 20,
          },
          {
            yPercent: index === 0 ? -10 : -20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              markers: false, // change to true for debugging
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-16 lg:py-20">
      <CenterSection>
        {/* Heading */}
        <div className="mb-8 lg:mb-12 text-center">
          <h2
            className={`mt-2 uppercase  text-gray type-h6 tracking-[73%]  lg:tracking-[83%]  `}
          >
            Room Types
          </h2>
          <p className="max-w-xl mx-auto my-10 text-charcoal type-body">
            Every room at The Beach Hotel is appointed with bespoke comfort and
            quiet grandeur. Choose your perfect haven and wake to the most
            extraordinary edge of India.
          </p>
        </div>
        <div ref={sectionRef} className="min-h-screen flex items-center ">
          <div className="grid sm:grid-cols-2 gap-16 w-full">
            {rooms.map((room, index) => (
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
          <Button
            href="/rooms"
            className="cursor-pointer text-sm text-end text-gray-700 w-40 tracking-wider font-arizona-flare-regular  px-3 py-1 whitespace-nowrap"
          >
            View All
          </Button>
        </div>
      </Section>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Users,
  BedDouble,
  Wifi,
  Wind,
  Wine,
  Bath,
  Waves,
  Tv,
  UtensilsCrossed,
  Sofa,
  LockKeyhole,
  ConciergeBell,
  WashingMachine,
  Accessibility,
  PawPrint,
  Sparkles,
  Ruler,
  Eye,
} from "lucide-react";

import type { Room } from "@/src/types";
import Section from "@/src/components/common/Section";
import RoomSlider from "./RoomSlider";
import Pill from "./Pill";

gsap.registerPlugin(ScrollTrigger);

function RoomRow({ room, index }: { room: Room; index: number }) {
  const isEven = index % 2 === 0;
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 640px)", () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          gsap.fromTo(
            card,
            { yPercent: i === 0 ? 30 : 15 },
            {
              yPercent: i === 0 ? -30 : -15,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
                markers: false,
              },
            },
          );
        });

        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const AMENITY_MAP: Record<
    string,
    { icon: React.ElementType; label: string }
  > = {
    "Air Conditioning": { icon: Wind, label: "Air Conditioning" },
    "Wi-Fi": { icon: Wifi, label: "Wi-Fi" },
    Minibar: { icon: Wine, label: "Minibar" },
    Balcony: { icon: Waves, label: "Balcony" },
    Bathtub: { icon: Bath, label: "Bathtub" },
    "Private Pool": { icon: Waves, label: "Private Pool" },
    Jacuzzi: { icon: Sparkles, label: "Jacuzzi" },
    Kitchen: { icon: UtensilsCrossed, label: "Kitchen" },
    "Living Room": { icon: Sofa, label: "Living Room" },
    "Smart TV": { icon: Tv, label: "Smart TV" },
    "Safe Deposit Box": { icon: LockKeyhole, label: "Safe Deposit Box" },
    "Room Service": { icon: ConciergeBell, label: "Room Service" },
    "Laundry Service": { icon: WashingMachine, label: "Laundry Service" },
    "Wheelchair Accessible": {
      icon: Accessibility,
      label: "Wheelchair Accessible",
    },
    "Pet Friendly": { icon: PawPrint, label: "Pet Friendly" },
  };
  const amenities = (room.additional_keys ?? [])
    .map((key) => AMENITY_MAP[key])
    .filter(Boolean) as { icon: React.ElementType; label: string }[];

  return (
    <div
      data-room-id={room.id}
      ref={sectionRef}
      className="py-16 md:py-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        <div
          ref={(el) => {
            cardsRef.current[0] = el;
          }}
          className={`${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          <RoomSlider images={room.image_url ?? []} name={room.name} />

          <div className="flex flex-col gap-4 pt-5 xl:pt-8">
            <div className="flex flex-wrap type-body-sm gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-gray">
                <Ruler size={13} strokeWidth={1.5} />
                <span className=" tracking-widest uppercase">
                  {room.size} sq. ft.
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <Users size={13} strokeWidth={1.5} />
                <span className=" tracking-widest uppercase">
                  Up to {room.max_guests} guests
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <BedDouble size={13} strokeWidth={1.5} />
                <span className=" tracking-widest uppercase">
                  {room.bed_type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <Eye size={13} strokeWidth={1.5} />
                <span className=" tracking-widest uppercase">
                  {room.view}
                </span>
              </div>
            </div>

            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {amenities.map((a) => (
                  <Pill key={a.label} icon={a.icon} label={a.label} />
                ))}
              </div>
            )}

            {/* <div className="flex items-center justify-between flex-wrap gap-4 border-t border-silver pt-5">
          <div>
            <p className="text-xs text-gray font-arizona-sans-regular tracking-widest uppercase mb-0.5">
              From
            </p>
            <p className="font-arizona-flare-regular text-primary-dark text-xl">
              ₹{room.price_per_night.toLocaleString("en-IN")}
              <span className="text-gray text-xs font-arizona-sans-regular tracking-widest ml-1">
                / night
              </span>
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center px-7 h-10 bg-primary text-white text-xs font-arizona-sans-regular tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
          >
            Book Now
          </a>
        </div> */}
          </div>
        </div>

        <div
          ref={(el) => {
            cardsRef.current[1] = el;
          }}
          className={`
          flex flex-col justify-center gap-4 pt-6 pb-2 sm:p-12 xl:p-16
          ${isEven ? "lg:order-2" : "lg:order-1"}
        `}
        >
          <p className="uppercase text-gray tracking-widest text-[11px]">
            {room.type}
          </p>

          <h2 className="tracking-wider type-body-xl text-primary-dark   font-semibold  leading-tight">
            {room.name}
          </h2>

          {/* <div className="w-2px bg-amber-300" /> */}

          <p className="text-charcoal leading-relaxed type-body max-w-md">
            {room.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* main */
export default function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <Section className="">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr]border-b border-silver pb-10 pt-16 lg:py-20 type-body">
        {/* <Sparkle size={10} fill="#012644" className="" />{" "} */}
        <p className="type-h6 tracking-[73%] text-center sm:text-left  lg:tracking-[83%] uppercase">Rooms & Suites</p>
        <div className=" text-charcoal uppercase type-body-lg lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 tracking-[0.1rem] leading-relaxed">
          At The Beach Hotel, every stay is an invitation to refined indulgence.
          Our accommodations are appointed with bespoke furnishings, the finest
          linens and thoughtful touches at every turn — from serene inland
          retreats to coveted sea-view sanctuaries, where floor-to-ceiling glass
          dissolves the line between suite and ocean and the rhythm of the waves
          becomes your constant companion. Whichever you choose, you are wrapped
          in quiet grandeur and impeccable comfort — and wake to the most
          extraordinary edge of India.
        </div>
      </div>
      <div className="divide-y divide-silver">
        {rooms.map((room, index) => (
          <RoomRow key={room.id} room={room} index={index} />
        ))}
      </div>
    </Section>
  );
}

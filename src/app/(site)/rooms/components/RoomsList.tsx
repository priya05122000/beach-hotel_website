"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  BedDouble,
  Maximize2,
  Wifi,
  Wind,
  Wine,
  Bath,
  Waves,
  MapPin,
} from "lucide-react";
import type { Room } from "@/src/data/rooms";
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
          }
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const amenities = [
    { icon: Wifi, label: "Free Wi-Fi", show: room.wifi },
    { icon: Wind, label: "AC", show: room.air_conditioning },
    { icon: Wine, label: "Minibar", show: room.minibar },
    { icon: Bath, label: "Bathtub", show: room.bathtub },
    { icon: Waves, label: "Balcony", show: room.balcony },
  ].filter((a) => a.show);

  return (
    <div ref={sectionRef} className="py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div ref={(el) => { cardsRef.current[0] = el; }} className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>

          <RoomSlider images={room.images} name={room.name} />

          <div className="flex flex-col gap-4 pt-5 xl:pt-8">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-gray">
                <Maximize2 size={13} strokeWidth={1.5} />
                <span className="text-xs font-arizona-sans-regular tracking-widest uppercase">
                  {room.size_sqm} sqm
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <Users size={13} strokeWidth={1.5} />
                <span className="text-xs font-arizona-sans-regular tracking-widest uppercase">
                  Up to {room.max_guests} guests
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <BedDouble size={13} strokeWidth={1.5} />
                <span className="text-xs font-arizona-sans-regular tracking-widest uppercase">
                  {room.bed_type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <MapPin size={13} strokeWidth={1.5} />
                <span className="text-xs font-arizona-sans-regular tracking-widest uppercase">
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
            <p className="font-arizona-flare-regular text-primary text-xl">
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
          ref={(el) => { cardsRef.current[1] = el; }}
          className={`
          flex flex-col justify-center gap-6 p-8 lg:p-12 xl:p-16
          ${isEven ? "lg:order-2" : "lg:order-1"}
        `}
        >
          <p className="text-xs font-arizona-sans-regular tracking-[0.3em] uppercase text-gray">
            {room.type}
          </p>

          <h2 className="font-arizona-flare-regular font-normal text-primary leading-tight">
            {room.name}
          </h2>

          <p className="text-gray leading-relaxed text-sm max-w-md">
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
      <div className="divide-y divide-silver">
        {rooms.map((room, index) => (
          <RoomRow key={room.id} room={room} index={index} />
        ))}
      </div>
    </Section>
  );
}

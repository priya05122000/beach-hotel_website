"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_H = 460;
const CAPTION_OFFSET = 20;
const captionY = CARD_H - CAPTION_OFFSET;

const items = [
    {
        id: 12,
        title: "Beach Pavilion",
        location: "Maldives",
        image: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=900&q=80",
        imgH: 255,
    },
    {
        id: 13,
        title: "Ocean Terrace",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
        imgH: 445,
    },
    {
        id: 14,
        title: "The Grand Suite",
        location: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80",
        imgH: 255,
    },
    {
        id: 15,
        title: "Coral Villa",
        location: "Seychelles",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
        imgH: 445,
    },
    {
        id: 16,
        title: "Sunset Bungalow",
        location: "Phuket, Thailand",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=80",
        imgH: 255,
    },
    {
        id: 17,
        title: "Palm Haven",
        location: "Mauritius",
        image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=900&q=80",
        imgH: 445,
    },
    {
        id: 18,
        title: "Azure Retreat",
        location: "Amalfi Coast, Italy",
        image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=900&q=80",
        imgH: 255,
    },

];

const filters = ["Chronological", "Alphabetical", ">5000 sq ft", "<5000 sq ft"];

export default function HorizontalScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${track.scrollWidth - window.innerWidth}`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="relative h-screen overflow-hidden  "
        >
            {/* ── Horizontal image track ──────────────────────────────── */}
            {/* trackRef sits directly in the section so GSAP measures scrollWidth correctly */}
            <div
                ref={trackRef}
                className="absolute top-0  left-0 flex items-start gap-4  will-change-transform"
                style={{ width: "max-content", height: `${CARD_H + 48}px` }}
            >
                    {items.map((item) => {
                        const overlaysImage = item.imgH > captionY;
                        return (
                            <div
                                key={item.id}
                                className="relative flex-shrink-0 w-96"
                                style={{ height: `${CARD_H}px` }}
                            >
                                {/* Image fills from top */}
                                <div
                                    className="absolute top-0 left-0 right-0 overflow-hidden"
                                    style={{ height: `${item.imgH}px` }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                    {overlaysImage && (
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent" />
                                    )}
                                </div>

                                {/* Caption — same Y inside every card */}
                                {/* <div
                                    className="absolute left-0"
                                    style={{ bottom: `${CAPTION_OFFSET}px` }}
                                >
                                    <div className="flex items-start gap-1.5">
                                        <span className="text-[15px] font-semibold leading-none mt-[1px]">
                                            {item.id}.
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-medium leading-snug">
                                                {item.title}
                                            </p>
                                            <p className="text-[10px] text-gray-500 leading-snug">
                                                {item.location}
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        );
                    })}
            </div>

            {/* ── Bottom: filters · counter · "Projects" ─────────────── */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-end px-12 pb-8">




                {/* Large display heading */}
                <p
                    className="font-arizona  leading-none select-none text-black/85"
                    style={{ fontSize: "clamp(4.5rem, 9vw, 9rem)", marginBottom: "-0.08em" }}
                >
                    Destination
                </p>
            </div>
        </div>
    );
}

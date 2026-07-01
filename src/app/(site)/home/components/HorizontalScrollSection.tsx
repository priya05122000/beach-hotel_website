"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";

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
        imgH: 380,
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
        imgH: 380,
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
        imgH: 380,
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

    useLayoutEffect(() => {
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
            className="relative h-screen overflow-hidden "
        >
            {/* ── Horizontal image track ──────────────────────────────── */}
            {/* trackRef sits directly in the section so GSAP measures scrollWidth correctly */}
            <div
                ref={trackRef}
                className="absolute top-0  pt-16 lg:pt-20  left-0 flex items-start gap-4  will-change-transform"
            >
                {items.map((item) => {
                    // const overlaysImage = item.imgH > captionY;
                    return (
                        <div
                            key={item.id}
                            className="relative shrink-0 w-60 sm:w-80 "
                        >
                            {/* Image fills from top */}
                            <div
                                className="absolute top-0 left-0 right-0 "
                                style={{ height: `${item.imgH}px` }}
                            >
                                <div>

                                </div>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* {overlaysImage && (
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent" />
                                )} */}

                                <div className="absolute -bottom-16">
                                    <div className="flex items-end gap-3 px-4">
                                        <span className="text-display-md font-extralight leading-none text-gray-900 mt-0.5">
                                            {item.id}
                                        </span>
                                        <div className="flex flex-col px- gap-0.5 type-body">
                                            <p className="font-semibold text-charcoal  leading-tight">
                                                {item.title}
                                            </p>
                                            <p className="text-gray leading-tight">
                                                {item.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    );
                })}
            </div>

            {/* ── Bottom: filters · counter · "Projects" ─────────────── */}
            <div className="absolute  max-w-[95%] sm:max-w-156  lg:max-w-232 xl:max-w-300 mx-auto px-6 sm:px-8 lg:px-16 xl:px-4 pb-16 lg:pb-20 bottom-0 left-0 right-0 flex items-end justify-end ">
                {/* Large display heading */}
                <h2 className={`mt-2 uppercase text-gray type-h6 tracking-[73%]  lg:tracking-[83%] `}>

                    Destination
                </h2>

            </div>
        </div>
    );
}

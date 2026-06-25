"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, Users, BedDouble, Sofa, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";

gsap.registerPlugin(ScrollTrigger);

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
    {
        id: 3,
        name: "PAIZA POOL VILLA",
        views: ["Garden View", "Pool View"],
        description:
            "A private sanctuary with your own plunge pool and landscaped garden retreat.",
        highlights: [
            { text: "90 sqm on average", accent: false, icon: Maximize2 },
            { text: "Up to 4 guests", accent: true, icon: Users },
            { text: "Private pool", accent: true, icon: Waves },
        ],
        images: [
            "https://images.unsplash.com/photo-1540541338537-2064dcf6c00a?w=1200&q=80",
        ],
    },
];

const yValues = [10, 20, 15];

function RoomCard({ room, flipped }: { room: Room; flipped?: boolean }) {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    const imageBlock = (
        <div
            ref={emblaRef}
            className="relative overflow-hidden aspect-[4/3]"
        >
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
    );

    const contentBlock = (
        <div className="pt-6">
            <h3 className={`font-bold uppercase mb-4 ${typography.textTwoXl}`}>
                {room.name}
            </h3>

            <div className="flex gap-2 flex-wrap mb-4">
                {room.views.map((view) => (
                    <span
                        key={view}
                        className="border rounded-full px-3 py-1 text-xs"
                    >
                        {view}
                    </span>
                ))}
            </div>

            <p className={`${typography.textBase} mb-5`}>{room.description}</p>

            <ul className="space-y-2">
                {room.highlights.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <li key={i} className="flex items-center gap-2">
                            <Icon size={16} className="shrink-0 text-gray-500" />
                            <span>{item.text}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <div className="flex flex-col">
            {flipped ? (
                <>
                    {contentBlock}
                    <div className="mt-6">{imageBlock}</div>
                </>
            ) : (
                <>
                    {imageBlock}
                    {contentBlock}
                </>
            )}
        </div>
    );
}

export default function FacilitiesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const y = yValues[index] ?? 10;

                gsap.fromTo(
                    card,
                    { yPercent: y },
                    {
                        yPercent: -y,
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

    return (
        <Section className="py-16 lg:py-20">
            <div className="mb-8 lg:mb-12 text-center">
                <h2 className={`mt-2 text-4xl font-normal text-gray ${typography.textFoXl}`}>
                    Room Types
                </h2>
            </div>

            <div ref={sectionRef} className="min-h-screen flex items-center">
                <div className="grid lg:grid-cols-3 gap-10 w-full">
                    {rooms.map((room, index) => (
                        <div
                            key={room.id}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className={
                                index === 1
                                    ? "lg:mt-16"
                                    : index === 2
                                    ? "lg:mt-32"
                                    : ""
                            }
                        >
                            <RoomCard room={room} flipped={index === 1} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

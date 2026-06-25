"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";

gsap.registerPlugin(ScrollTrigger);

interface RoomHighlight {
    text: string;
    accent: boolean;
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
            { text: "55 sqm on average", accent: false },
            { text: "Up to 3 guests", accent: true },
            { text: "1 king bed", accent: true },
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
            { text: "75 sqm on average", accent: false },
            { text: "Up to 3 guests", accent: true },
            { text: "Living room", accent: true },
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
            <div
                ref={emblaRef}
                className="relative overflow-hidden aspect-[4/3]"
            >
                <div className="flex h-full">
                    {room.images.map((src, i) => (
                        <div
                            key={i}
                            className="relative flex-[0_0_100%]"
                        >
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

                <p className={`${typography.textBase} mb-5`}>
                    {room.description}
                </p>

                <ul className="space-y-2">
                    {room.highlights.map((item, i) => (
                        <li key={i}>• {item.text}</li>
                    ))}
                </ul>
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
                    }
                );
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section className="py-16 lg:py-20">
            <div
                ref={sectionRef}
                className="min-h-screen flex items-center"
            >
                <div className="grid lg:grid-cols-2 gap-16 w-full">
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
        </Section>
    );
}
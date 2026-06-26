"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, Users, BedDouble, Sofa } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import type { LucideIcon } from "lucide-react";
import CenterSection from "@/src/components/common/CenterSection";
import type { Facility } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
    facilities: Facility[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";


const getImages = (image_url?: string | string[]) => {
    if (!image_url) return [];

    if (Array.isArray(image_url)) {
        return image_url.filter(Boolean);
    }

    try {
        const parsed = JSON.parse(image_url);

        if (Array.isArray(parsed)) {
            return parsed.filter(Boolean);
        }

        return [];
    } catch {
        return image_url ? [image_url] : [];
    }
};


export default function FacilitiesSection({ facilities }: Props) {

    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const colParallax = [
        { from: 5, to: -20 },
        { from: -15, to: 15 },
        { from: 10, to: -30 },
    ];
    const mtClasses = ["", "lg:mt-60", "lg:mt-80"];

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const { from, to } = colParallax[index % 3];

                gsap.fromTo(
                    card,
                    { yPercent: from },
                    {
                        yPercent: to,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
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

    const gridItems = facilities.flatMap((facility) => {
        const images = getImages(facility.image_url);

        const image =
            images.length > 0
                ? `${API_URL}/uploads/${images[0]}`
                : "/placeholder.jpg";

        return [
            {
                type: "image" as const,
                facility,
                image,
            },
            {
                type: "content" as const,
                facility,
            },
        ];
    });


    // Split items into 3 independent columns
    const columns = [[], [], []] as (typeof gridItems)[];

    gridItems.forEach((item, index) => {
        columns[index % 3].push(item);
    });

    return (
        <Section className="py-16 lg:py-20">

            <div
                ref={sectionRef}
                className="min-h-screen flex items-center"
            >
                <div className="grid lg:grid-cols-3   w-full">
                    {gridItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className={`
        ${mtClasses[index % 3]}
        bg-pink-300
        flex
        ${index % 3 === 0
                                    ? "justify-start"
                                    : index % 3 === 1
                                        ? "justify-center"
                                        : "justify-end"
                                }
    `}                     >
                            {item.type === "image" ? (
                                <div className="relative overflow-hidden h-90 w-2/3 flex ">
                                    <Image
                                        src={item.image}
                                        alt={item.facility.facility_name}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className=" bg-amber-300">

                                    <p className="mb-2">{String(item.facility.id).padStart(2, "0")}</p>

                                    <h3 className="mb-4 font-bold uppercase border-primary/10 border-b py-2">
                                        {item.facility.facility_name}
                                    </h3>

                                    <div
                                        suppressHydrationWarning
                                        dangerouslySetInnerHTML={{
                                            __html: item.facility.description ?? "",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
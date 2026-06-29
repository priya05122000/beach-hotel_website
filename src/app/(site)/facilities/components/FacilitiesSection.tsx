"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { Facility } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
    facilities: Facility[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const getImages = (image_url?: string | string[]) => {
    if (!image_url) return [];
    if (Array.isArray(image_url)) return image_url.filter(Boolean);
    try {
        const parsed = JSON.parse(image_url);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
        return [];
    } catch {
        return image_url ? [image_url] : [];
    }
};

const resolveImage = (facility: Facility): string => {
    const images = getImages(facility.image_url);
    return images.length > 0 ? `${API_URL}/uploads/${images[0]}` : "/placeholder.jpg";
};

const DESKTOP_PARALLAX = [
    { from: 5, to: -20 },
    { from: -15, to: 15 },
    { from: 10, to: -30 },
    { from: -10, to: 20 },
];

export default function FacilitiesSection({ facilities }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const mtClasses = ["", "lg:mt-30", "lg:mt-70", "lg:mt-90"];
    const alignClasses = ["justify-start", "justify-center", "justify-center", "justify-end"];

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Desktop only: 4-col layout
        mm.add("(min-width: 1024px)", () => {
            desktopCardsRef.current.forEach((card, index) => {
                if (!card) return;
                const { from, to } = DESKTOP_PARALLAX[index % 4];
                gsap.fromTo(card, { yPercent: from }, {
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
                });
            });
            ScrollTrigger.refresh();
        });

        return () => mm.revert();
    }, []);

    // Desktop flat items: always image → content per facility
    const gridItems: (
        | { type: "image"; facility: Facility; image: string }
        | { type: "content"; facility: Facility }
    )[] = [];

    facilities.forEach((facility) => {
        gridItems.push(
            { type: "image" as const, facility, image: resolveImage(facility) },
            { type: "content" as const, facility },
        );
    });

    return (
        <Section className="pb-16 pt-16 sm:pt-40 lg:pb-20 type-body">
            <div ref={sectionRef} className="min-h-screen flex items-center">

                {/* ── Mobile (<768px): single column, image → content, no animation ── */}
                <div className="md:hidden w-full space-y-10">
                    {facilities.map((facility, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <div className="relative overflow-hidden h-60 w-full">
                                <Image
                                    src={resolveImage(facility)}
                                    alt={facility.facility_name}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="mb-2">{String(facility.id).padStart(2, "0")}</p>
                                <h3 className="mb-4 text-primary-dark font-bold uppercase border-primary/10 border-b py-2">
                                    {facility.facility_name}
                                </h3>
                                <div
                                    suppressHydrationWarning className="text-charcoal"
                                    dangerouslySetInnerHTML={{ __html: facility.description ?? "" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Tablet (768px–1023px): 2-col alternating, no animation ── */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-10 w-full">
                    {facilities.map((facility, i) => {
                        const img = resolveImage(facility);
                        const isOdd = i % 2 === 1;

                        const imageCell = (
                            <div className="relative overflow-hidden h-80 w-full">
                                <Image
                                    src={img}
                                    alt={facility.facility_name}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                        );

                        const contentCell = (
                            <div className="">
                                <p className="mb-2">{String(facility.id).padStart(2, "0")}</p>
                                <h3 className="mb-4 text-primary-dark font-bold uppercase border-primary/10 border-b py-2">
                                    {facility.facility_name}
                                </h3>
                                <div
                                    suppressHydrationWarning className="text-charcoal"
                                    dangerouslySetInnerHTML={{ __html: facility.description ?? "" }}
                                />
                            </div>
                        );

                        return (
                            <div key={i} className="contents">
                                {isOdd
                                    ? <>{contentCell}{imageCell}</>
                                    : <>{imageCell}{contentCell}</>
                                }
                            </div>
                        );
                    })}
                </div>

                {/* ── Desktop (1024px+): 4-col with stagger offsets and parallax ── */}
                <div className="hidden lg:grid grid-cols-4  lg:gap-10 xl:gap-16 w-full">
                    {gridItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { desktopCardsRef.current[index] = el; }}
                            className={`${mtClasses[index % 4]} ${alignClasses[index % 4]} flex`}
                        >
                            {item.type === "image" ? (
                                <div className="relative overflow-hidden h-80 w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.facility.facility_name}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-60 ">
                                    <p className="mb-2">{String(item.facility.id).padStart(2, "0")}</p>
                                    <h3 className="mb-4 text-primary-dark font-bold uppercase border-primary/10 border-b py-2">
                                        {item.facility.facility_name}
                                    </h3>
                                    <div
                                        suppressHydrationWarning className="text-charcoal"
                                        dangerouslySetInnerHTML={{ __html: item.facility.description ?? "" }}
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

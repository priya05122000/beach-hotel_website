"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CenterSection from "@/src/components/common/CenterSection";
import type { Facility } from "@/src/types";

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getImages(imageUrl: string | string[] | undefined): string[] {
    if (!imageUrl) return ["/placeholder.jpg"];
    const urls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
    return urls.map((u) => `${API_URL}/uploads/${u}`);
}

function RoomCard({ facility }: { facility: Facility }) {
    const [emblaRef] = useEmblaCarousel({ loop: true });
    const images = getImages(facility.image_url);

    return (
        <div className="flex flex-col">
            <div ref={emblaRef} className="relative overflow-hidden aspect-[4/3]">
                <div className="flex h-full">
                    {images.map((src, i) => (
                        <div key={i} className="relative flex-[0_0_100%]">
                            <Image
                                src={src}
                                alt={facility.facility_name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <h3 className="font-bold uppercase mb-4">
                    {facility.facility_name}
                </h3>

                {facility.short_description && (
                    <p className="mb-5">{facility.short_description}</p>
                )}
            </div>
        </div>
    );
}

export default function FacilitiesSection({ facilities }: { facilities: Facility[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const active = facilities
        .filter((f) => f.is_active !== false)
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { yPercent: index === 0 ? 10 : 20 },
                    {
                        yPercent: index === 0 ? -10 : -20,
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
        <CenterSection className="py-16 lg:py-20">
            <div className="mb-8 lg:mb-12 text-center">
                <h2 className="mt-2 uppercase font-normal text-gray">
                    Room Types
                </h2>
            </div>
            <div ref={sectionRef} className="min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-16 w-full">
                    {active.map((facility, index) => (
                        <div
                            key={facility.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className={index === 1 ? "lg:mt-24" : ""}
                        >
                            <RoomCard facility={facility} />
                        </div>
                    ))}
                </div>
            </div>
        </CenterSection>
    );
}

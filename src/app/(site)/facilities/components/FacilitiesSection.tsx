"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { Facility } from "@/src/types";
import Section from "@/src/components/common/Section";
import SubHeading from "@/src/components/common/SubHeading";
import LazySection from "@/src/components/common/LazySection";
import { applyParallax } from "@/src/lib/gsap/useParallax";

interface Props {
    facilities: Facility[];
}

// Each facility renders its own carousel — don't fetch embla-carousel until
// the first one is about to scroll into view.
const DynamicFacilitySlider = dynamic(() => import("./FacilitySlider"), {
    ssr: false,
});

const DESKTOP_PARALLAX = [
    { from: 5, to: -20 },
    { from: -15, to: 15 },
    { from: 10, to: -30 },
];

export default function FacilitiesSection({ facilities }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const mtClasses = ["", "lg:mt-30", "lg:mt-90"];
    const alignClasses = ["justify-start", "justify-center", "justify-end"];

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Desktop only: 4-col layout
        mm.add("(min-width: 1024px)", () => {
            desktopCardsRef.current.forEach((card, index) => {
                const { from, to } = DESKTOP_PARALLAX[index % 3];
                applyParallax(card, { trigger: sectionRef.current, from, to });
            });
            ScrollTrigger.refresh();
        });

        return () => mm.revert();
    }, []);

    // Sequential display number (1, 2, 3…) by list order, independent of
    // each facility's actual database id.
    const orderMap = new Map(facilities.map((f, i) => [f.id, i + 1]));

    // Desktop paired rows: image(A), content(A + B stacked), image(B)
    const gridItems: (
        | { type: "image"; facility: Facility }
        | { type: "content-group"; facilities: Facility[] }
    )[] = [];

    for (let i = 0; i < facilities.length; i += 2) {
        const a = facilities[i];
        const b = facilities[i + 1];

        gridItems.push({ type: "image", facility: a });
        gridItems.push({ type: "content-group", facilities: b ? [a, b] : [a] });
        if (b) {
            gridItems.push({ type: "image", facility: b });
        }
    }

    return (
        <Section className="pb-16 pt-16 sm:pt-40 lg:pb-40  type-body">
            {/* Visually hidden — the per-facility titles below are h3, but
                this section has no visible heading of its own in the design.
                Without this, the outline jumps straight from h1 to h3
                ("H2: Missing"). */}
            <h2 className="sr-only">Our Facilities</h2>
            <div ref={sectionRef} className="min-h-screen flex items-center">
                {/* ── Mobile (<768px): single column, image → content, no animation ── */}
                <div className="md:hidden w-full space-y-10">
                    {facilities.map((facility, i) => (
                        <div key={i} data-facility-id={facility.id} className="flex flex-col gap-4">
                            <LazySection
                                className="relative overflow-hidden h-60 w-full"
                                placeholder={<div className="relative overflow-hidden h-60 w-full bg-silver/20" />}
                            >
                                <DynamicFacilitySlider
                                    images={facility.image_url}
                                    name={facility.facility_name}
                                    sizes="100vw"
                                />
                            </LazySection>
                            <div>
                                <p className="mb-2">{String(orderMap.get(facility.id)).padStart(2, "0")}</p>
                                <h3 className="mb-4 text-primary-dark font-bold uppercase border-primary/10 border-b py-2">                                   {facility.facility_name}
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
                        const isOdd = i % 2 === 1;

                        const imageCell = (
                            <div data-facility-id={facility.id} className="relative overflow-hidden h-80 w-full">
                                <LazySection
                                    className="h-full w-full"
                                    placeholder={<div className="h-full w-full bg-silver/20" />}
                                >
                                    <DynamicFacilitySlider
                                        images={facility.image_url}
                                        name={facility.facility_name}
                                        sizes="50vw"
                                    />
                                </LazySection>
                            </div>
                        );

                        const contentCell = (
                            <div className="">
                                <p className="mb-2">{String(orderMap.get(facility.id)).padStart(2, "0")}</p>
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

                {/* ── Desktop (1024px+): 3-col paired layout with stagger offsets and parallax ── */}
                <div className="hidden lg:grid grid-cols-12 lg:gap-10 xl:gap-16 w-full">
                    {gridItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { desktopCardsRef.current[index] = el; }}
                            data-facility-id={item.type === "image" ? item.facility.id : undefined}
                            className={`${item.type === "image" ? "col-span-3" : "col-span-6"} ${mtClasses[index % 3]} ${alignClasses[index % 3]} flex`}
                        >
                            {item.type === "image" ? (
                                <div className="relative overflow-hidden h-80 w-full">
                                    <LazySection
                                        className="h-full w-full"
                                        placeholder={<div className="h-full w-full bg-silver/20" />}
                                    >
                                        <DynamicFacilitySlider
                                            images={item.facility.image_url}
                                            name={item.facility.facility_name}
                                            sizes="25vw"
                                        />
                                    </LazySection>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-30 w-full ">
                                    {item.facilities.map((facility, facilityIndex) => (
                                        <div
                                            key={facility.id}
                                            className={`w-[55%] ${facilityIndex === 1 ? "self-end" : "self-start"}`}
                                        >
                                            <p className="mb-2">{String(orderMap.get(facility.id)).padStart(2, "0")}</p>
                                            <SubHeading className="mb-4 text-primary-dark border-primary/10 border-b py-2">
                                                {facility.facility_name}
                                            </SubHeading>
                                            <div
                                                suppressHydrationWarning className="text-charcoal"
                                                dangerouslySetInnerHTML={{ __html: facility.description ?? "" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </Section>
    );
}

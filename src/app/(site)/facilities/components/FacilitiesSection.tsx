"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { Facility } from "@/src/types";
import Section from "@/src/components/common/Section";
import SubHeading from "@/src/components/common/SubHeading";
import Eyebrow from "@/src/components/common/Eyebrow";
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

// Kept in sync with FACILITY_CATEGORY_OPTIONS in
// beachhotelcmsfrontend/src/app/(protected)/facility/facilityOptions.ts —
// uncategorized (null/undefined) facilities render first with no heading,
// then each real category gets its own heading + its own fresh zigzag
// section, in this order.
const CATEGORY_LABELS: { category: NonNullable<Facility["category"]>; label: string }[] = [
    { category: "inclusive", label: "Inclusive Facilities" },
    { category: "highlighted", label: "Highlighted Amenities" },
];

interface Group {
    label: string | null;
    items: Facility[];
}

// Desktop paired rows for one group: image(A), content(A + B stacked), image(B).
type GridItem =
    | { type: "image"; facility: Facility }
    | { type: "content-group"; facilities: Facility[] };

function buildGridItems(items: Facility[]): GridItem[] {
    const gridItems: GridItem[] = [];
    for (let i = 0; i < items.length; i += 2) {
        const a = items[i];
        const b = items[i + 1];
        gridItems.push({ type: "image", facility: a });
        gridItems.push({ type: "content-group", facilities: b ? [a, b] : [a] });
        if (b) {
            gridItems.push({ type: "image", facility: b });
        }
    }
    return gridItems;
}

export default function FacilitiesSection({ facilities }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const mtClasses = ["", "lg:mt-30", "lg:mt-90"];
    const alignClasses = ["justify-start", "justify-center", "justify-end"];

    // Group facilities by category, preserving order within each group.
    // Uncategorized items keep the current no-heading behaviour; each real
    // category gets its own heading and its own independent zigzag section.
    // Groups with no items are dropped so no empty heading ever renders.
    const groups: Group[] = [
        { label: null, items: facilities.filter((f) => !f.category) },
        ...CATEGORY_LABELS.map(({ category, label }) => ({
            label,
            items: facilities.filter((f) => f.category === category),
        })),
    ].filter((group) => group.items.length > 0);

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

    // Sequential display number (1, 2, 3…) restarting at the start of each
    // category group, independent of each facility's actual database id.
    const orderMap = new Map<number, number>();
    groups.forEach((group) => {
        group.items.forEach((f, i) => {
            orderMap.set(f.id, i + 1);
        });
    });

    // A running counter for desktopCardsRef slots, shared across every
    // group's desktop grid so parallax applies to every card — independent
    // of each group's own (restarting) mtClasses/alignClasses stagger index.
    let refSlot = 0;

    return (
        <Section className="pb-16 pt-16 sm:pt-32 lg:pb-40  type-body">
            {/* Visually hidden — the per-facility titles below are h3, but
                this section has no visible heading of its own in the design.
                Without this, the outline jumps straight from h1 to h3
                ("H2: Missing"). */}
            <h2 className="sr-only">Our Facilities</h2>
            <div ref={sectionRef} className="min-h-screen flex flex-col justify-center gap-16 lg:gap-20">
                {groups.map((group, groupIndex) => {
                    const gridItems = buildGridItems(group.items);

                    return (
                        <div key={group.label ?? `uncategorized-${groupIndex}`}>
                            {group.label && (
                                <Eyebrow align="center" className="text-gray font-normal mt-10 mb-20 lg:mb-14 lg:text-right">
                                    <span className="lg:border-b pb-2 border-gray/30">{group.label}</span>
                                </Eyebrow>
                            )}

                            {/* ── Mobile (<768px): single column, image → content, no animation ── */}
                            <div className="md:hidden w-full space-y-10">
                                {group.items.map((facility) => (
                                    <div key={facility.id} data-facility-id={facility.id} className="flex flex-col gap-4">
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
                                {group.items.map((facility, i) => {
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
                                        <div key={facility.id} className="contents">
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
                                {gridItems.map((item, index) => {
                                    const slot = refSlot++;
                                    return (
                                        <div
                                            key={index}
                                            ref={(el) => { desktopCardsRef.current[slot] = el; }}
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
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}

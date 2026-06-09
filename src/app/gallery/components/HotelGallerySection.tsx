"use client";

import Section from "@/src/components/common/Section";
import Image from "next/image";
import GalleryTabs from "./GalleryTabs";
import { typography } from "@/src/lib/typography";
import CenterSection from "@/src/components/common/CenterSection";

type Card = { src: string; alt: string; className?: string };
type SectionConfig = {
    id?: string;
    title?: string;
    titleAccent?: string;
    description?: string;
    bgClass?: string;
    cards: Card[];
    scrollMargin?: boolean;
};

const GalleryCard = ({ src, alt, className = "" }: Card) => (
    <div
        className={`group relative overflow-hidden rounded-md p-0.5 bg-[linear-gradient(to_right,#040286,#FF992AC2,#040286,#040286,#FF992AC2,#040286)] bg-size-[250%_100%] bg-left transition-all duration-1000 hover:bg-right shadow-xl ${className}`}
    >
        <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700"
            />
        </div>
    </div>
);

function GallerySection({
    id,
    title,
    titleAccent,
    description,
    bgClass = "bg-transparent",
    cards,
    scrollMargin = false,
}: SectionConfig) {
    return (
        <section
            id={id}
            className={`${bgClass} py-10 sm:py-14 lg:py-20 ${scrollMargin ? "scroll-mt-32" : ""}`}
        >
            <CenterSection>
                {(title || description) && (
                    <div className="mb-6 sm:mb-8">
                        {title && (
                            <span className="rounded bg-accent px-3 py-1 text-xs font-semibold uppercase text-white font-arizona">
                                {titleAccent ?? title}
                            </span>
                        )}
                        {description && (
                            <p
                                className={`mt-4 max-w-4xl ${typography.textBase} leading-relaxed ${title ? "text-white" : "text-primary"
                                    }`}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {cards.map((c, i) => (
                        <GalleryCard key={`${c.src}-${i}`} {...c} />
                    ))}
                </div>
            </CenterSection>
        </section>
    );
}

export default function HotelGallerySection() {
    const sections: SectionConfig[] = [
        {
            id: "hotel-section",
            title: "Hotels",
            description:
                "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience, Distinct From Individual Room Amenities.",
            bgClass: "bg-primary/43",
            scrollMargin: true,
            cards: [
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Room",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-2.png",
                    alt: "Premium Hotel Suite",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Interior",
                    className: "col-span-2 h-48 sm:h-64 lg:h-80",
                },
            ],
        },
        {
            bgClass: "bg-primary/19",
            cards: [
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Room",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-2.png",
                    alt: "Premium Hotel Suite",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Interior",
                    className: "col-span-2 h-48 sm:h-64 lg:h-80",
                },
            ],
        },
        {
            id: "spa-section",
            title: "Spa",
            description:
                "Relax, rejuvenate, and unwind with our premium spa experiences and wellness treatments.",
            bgClass: "bg-primary/13",
            scrollMargin: true,
            cards: [
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Room",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-2.png",
                    alt: "Premium Hotel Suite",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Interior",
                    className: "col-span-2 h-48 sm:h-64 lg:h-80",
                },
            ],
        },
        {
            bgClass: "bg-primary/7",
            cards: [
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Room",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-2.png",
                    alt: "Premium Hotel Suite",
                    className: "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-1.png",
                    alt: "Luxury Hotel Interior",
                    className: "col-span-2 h-48 sm:h-64 lg:h-80",
                },
            ],
        },
    ];

    return (
        <>
            <GalleryTabs />
            {sections.map((s, i) => (
                <GallerySection key={i} {...s} />
            ))}
        </>
    );
}
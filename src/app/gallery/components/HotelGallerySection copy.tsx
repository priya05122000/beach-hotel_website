"use client";

import Image from "next/image";
import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import { Gallery, GalleryCategory } from "@/src/types";

type Card = {
    src: string;
    alt: string;
    className?: string;
};

type SectionConfig = {
    id?: string;
    title?: string;
    description?: string;
    bgClass?: string;
    cards: Card[];
    scrollMargin?: boolean;
};

interface GalleryProps {
    galleryCategories: GalleryCategory[];
    galleries: Gallery[];
}

const GalleryCard = ({
    src,
    alt,
    className = "",
}: Card) => (
    <div
        className={`group relative overflow-hidden rounded-md p-0.5 bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)] bg-size-[250%_100%] bg-left transition-all duration-1000 hover:bg-right shadow-xl ${className}`}
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
    description,
    bgClass = "bg-transparent",
    cards,
    scrollMargin = false,
}: SectionConfig) {
    return (
        <section
            id={id}
            className={`${bgClass} py-10 sm:py-14 lg:py-20 ${scrollMargin ? "scroll-mt-32" : ""
                }`}
        >
            <CenterSection>
                {(title || description) && (
                    <div className="mb-6 sm:mb-8">
                        {title && (
                            <span className="rounded bg-accent px-3 py-1 text-xs font-semibold uppercase text-white font-arizona">
                                {title}
                            </span>
                        )}

                        {description && (
                            <p
                                className={`mt-4 max-w-4xl ${typography.textBase} leading-relaxed text-white`}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {cards.map((card, index) => (
                        <GalleryCard
                            key={`${card.src}-${index}`}
                            {...card}
                        />
                    ))}
                </div>
            </CenterSection>
        </section>
    );
}

export default function HotelGallerySection({
    galleryCategories,
}: GalleryProps) {
    const sections: SectionConfig[] = galleryCategories.map(
        (item, index) => ({
            id: `gallery-${item.id}`,
            title: item.category_name,
            description: item.short_description,
            bgClass:
                index % 2 === 0
                    ? "bg-primary/43"
                    : "bg-primary/19",
            scrollMargin: true,

            // Temporary images
            cards: [
                {
                    src: "/home/hero-1.webp",
                    alt: item.category_name,
                    className:
                        "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-2.png",
                    alt: item.category_name,
                    className:
                        "h-40 sm:h-56 lg:h-72",
                },
                {
                    src: "/home/hero-1.webp",
                    alt: item.category_name,
                    className:
                        "col-span-2 h-48 sm:h-64 lg:h-80",
                },
            ],
        })
    );

    return (
        <>
            {sections.map((section) => (
                <GallerySection
                    key={section.id}
                    {...section}
                />
            ))}
        </>
    );
}
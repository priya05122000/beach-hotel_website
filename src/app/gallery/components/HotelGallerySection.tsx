"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react"; import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import { Gallery, GalleryCategory } from "@/src/types";



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

interface GalleryProps {
    galleryCategories: GalleryCategory[];
    galleries: Gallery[];
}

type Card = {
    src: string;
    alt: string;
    thumbnail?: string;
    className?: string;
};

const isVideoFile = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);
};

const GalleryCard = ({
    src,
    alt,
    thumbnail,
    className = "",
}: Card) => {
    const isVideo = isVideoFile(src);
    const [playVideo, setPlayVideo] = useState(false);

    return (
        <div
            className={`group relative overflow-hidden rounded-md p-0.75 bg-[linear-gradient(to_right,#040286,#FF992AC2,#040286,#040286,#FF992AC2,#040286)] bg-size-[250%_100%] bg-left transition-all duration-1000 hover:bg-right shadow-xl ${className}`}
        >
            <div className="relative h-full w-full overflow-hidden rounded-md">
                {isVideo ? (
                    playVideo ? (
                        <video
                            src={src}
                            controls
                            autoPlay
                            playsInline
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setPlayVideo(true)}
                            className="relative h-full w-full cursor-pointer"
                        >
                            <Image
                                src={thumbnail || "/placeholder-video.jpg"}
                                alt={alt}
                                fill
                                unoptimized
                                className="object-cover"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                                    <Play
                                        size={30}
                                        className="ml-1 text-primary"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                        </button>
                    )
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 "
                    />
                )}
            </div>
        </div>
    );
};

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
    galleries,
}: GalleryProps) {
    const bgClasses = [
        "bg-primary/43",
        "bg-primary/19",
        "bg-primary/13",
        "bg-primary/7",
    ];

    const chunkArray = <T,>(array: T[], size: number): T[][] => {
        const result: T[][] = [];

        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }

        return result;
    };

    let sectionIndex = 0;

    return (
        <>
            {galleryCategories.flatMap((category) => {
                const categoryImages = galleries.filter(
                    (gallery) => gallery.category_id === category.id
                );

                const imageChunks = chunkArray(categoryImages, 3);

                return imageChunks.map((chunk, chunkIndex) => {
                    const currentBg =
                        bgClasses[sectionIndex++ % bgClasses.length];

                    return (
                        <GallerySection
                            key={`${category.id}-${chunkIndex}`}
                            id={
                                chunkIndex === 0
                                    ? `gallery-${category.id}`
                                    : undefined
                            }
                            title={
                                chunkIndex === 0
                                    ? category.category_name
                                    : undefined
                            }
                            description={
                                chunkIndex === 0
                                    ? category.short_description
                                    : undefined
                            }
                            bgClass={currentBg}
                            scrollMargin
                            cards={chunk.map((image, index) => ({
                                src: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image.media_url}`,

                                thumbnail: image.thumbnail_url
                                    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image.thumbnail_url}`
                                    : undefined,

                                alt: category.category_name,

                                className:
                                    chunk.length === 1
                                        ? "col-span-2 h-64 sm:h-80 lg:h-96"
                                        : index === 2
                                            ? "col-span-2 h-48 sm:h-64 lg:h-80"
                                            : "h-40 sm:h-56 lg:h-72",
                            }))}
                        />
                    );
                });
            })}
        </>
    );
}
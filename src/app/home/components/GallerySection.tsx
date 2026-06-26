"use client";

import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import { Gallery } from "@/src/types";
import Link from "next/link";

interface GallerySectionProps {
    galleries: Gallery[];
}

const isVideoFile = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);
};

type MediaItem = {
    mediaUrl: string;
    thumbnailUrl?: string;
    title: string;
};

function ReadMoreButton() {
    return (
        <Link href="/gallery" className="flex cursor-pointer items-center gap-1 text-sm text-gray-700 tracking-wider font-arizona-flare-regular  px-3 py-1 whitespace-nowrap underline underline-offset-2">
            Read more
        </Link>
    );
}

function MediaImage({ item }: { item: MediaItem }) {
    const [playVideo, setPlayVideo] = useState(false);
    const isVideo = isVideoFile(item.mediaUrl);

    if (isVideo) {
        if (playVideo) {
            return (
                <video
                    src={item.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                />
            );
        }
        return (
            <button
                type="button"
                onClick={() => setPlayVideo(true)}
                className="relative w-full h-full cursor-pointer"
            >
                <Image
                    src={item.thumbnailUrl || "/placeholder-video.jpg"}
                    alt={item.title || "Video thumbnail"}
                    fill
                    unoptimized
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center bg-white/90">
                        <Play size={20} className="ml-1 text-primary" fill="currentColor" />
                    </div>
                </div>
            </button>
        );
    }

    return (
        <Image
            src={item.mediaUrl}
            alt={item.title || "Gallery image"}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
        />
    );
}

function GalleryCard({ item, imageClassName }: { item: MediaItem; imageClassName: string }) {
    return (
        <div>
            <div className={`relative w-full overflow-hidden ${imageClassName}`}>
                <MediaImage item={item} />
            </div>
            <div className="flex items-center justify-between mt-3">
                <h3 className="font-bold  text-gray-900 leading-snug">
                    {item.title || "Gallery"}
                </h3>
                <ReadMoreButton />
            </div>
        </div>
    );
}

export default function GallerySection({ galleries }: GallerySectionProps) {
    const displayGalleries = galleries.slice(0, 4);

    const galleryMedia: MediaItem[] = displayGalleries.map((item) => ({
        mediaUrl: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.media_url}`,
        thumbnailUrl: item.thumbnail_url
            ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.thumbnail_url}`
            : undefined,
        title: item.title ?? item.short_description ?? "",
    }));

    const [item0, item1, item2, item3] = galleryMedia;

    return (
        <Section>
            <section className="py-16 lg:py-20 bg-white">
                <div className="mx-auto">

                    {/* Heading */}
                    <div className="mb-10">

                        <h2 className={`mt-2 uppercase text-4xl font-normal text-gray  ${typography.textFoXl}`}>
                            Gallery
                        </h2>
                    </div>

                    {/*
                        Layout (desktop):
                        [text col-3 rows 1-2] [item0 col-5 row-1 LARGE] [item1 col-4 row-1 SMALL]
                                             [item2 col-5 row-2 MEDIUM] [item3 col-4 row-2 LARGE]
                    */}
                    <div className="grid grid-cols-12 gap-x-5 gap-y-8">

                        {/* Left text — spans both rows on desktop */}
                        <div className="hidden md:flex md:col-span-3 md:row-span-2 flex-col pt-1">
                            <p className=" text-gray-500 leading-relaxed">
                                Explore the moments and spaces that define your stay with us. Every image tells a story of comfort, elegance, and coastal beauty.
                            </p>
                        </div>

                        {/* Item 0 — center top, LARGE */}
                        {item0 && (
                            <div className="col-span-12 md:col-span-5">
                                <GalleryCard item={item0} imageClassName="h-64 md:h-72 lg:h-80" />
                            </div>
                        )}

                        {/* Item 1 — right top, SMALL / SHORT */}
                        {item1 && (
                            <div className="col-span-12 md:col-span-4">
                                <GalleryCard item={item1} imageClassName="h-44 md:h-48 lg:h-52" />
                            </div>
                        )}

                        {/* Item 2 — center bottom, MEDIUM */}
                        {item2 && (
                            <div className="col-span-12 md:col-span-4">
                                <GalleryCard item={item2} imageClassName="h-52 md:h-56 lg:h-60" />
                            </div>
                        )}

                        {/* Item 3 — right bottom, LARGE / TALL */}
                        {item3 && (
                            <div className="col-span-12 md:col-span-5">
                                <GalleryCard item={item3} imageClassName="h-60 md:h-68 lg:h-76" />
                            </div>
                        )}

                    </div>

                </div>
            </section>
        </Section>
    );
}

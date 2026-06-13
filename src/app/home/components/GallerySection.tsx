"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import { Gallery } from "@/src/types";

interface GallerySectionProps {
    galleries: Gallery[];
}

const isVideoFile = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);
};



export default function GallerySection({
    galleries,
}: GallerySectionProps) {

    const displayGalleries =
        galleries.length >= 8
            ? galleries.slice(0, 8)
            : galleries.slice(0, 4);

    const galleryMedia = displayGalleries.map((item) => ({
        mediaUrl: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.media_url}`,
        thumbnailUrl: item.thumbnail_url
            ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.thumbnail_url}`
            : undefined,
    }));



    return (
        <Section>
            <section className="py-16 lg:py-20 bg-white">
                <div className="mx-auto">

                    {/* Heading */}
                    <div className="mb-12">
                        <p className="text-xs uppercase tracking-[0.2em] text-primary">
                            Gallery
                        </p>

                        <h2
                            className={`mt-2 text-4xl font-normal text-gray max-w-sm ${typography.textFoXl}`}
                        >
                            Experience At The Beach Hotel
                        </h2>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-12 gap-3">

                        {galleryMedia[0] && (
                            <div className="col-span-12 md:col-span-4 md:row-span-2">
                                <GalleryCard
                                    media={galleryMedia[0]}
                                    className="h-72 md:h-96 lg:h-125"
                                />
                            </div>
                        )}

                        {galleryMedia[1] && (
                            <div className="col-span-12 md:col-span-4">
                                <GalleryCard
                                    media={galleryMedia[1]}
                                    className="h-60 md:h-46.5 lg:h-61"
                                />
                            </div>
                        )}

                        {galleryMedia[2] && (
                            <div className="col-span-12 md:col-span-4 md:row-span-2">
                                <GalleryCard
                                    media={galleryMedia[2]}
                                    className="h-72 md:h-96 lg:h-125"
                                />
                            </div>
                        )}

                        {galleryMedia[3] && (
                            <div className="col-span-12 md:col-span-4">
                                <GalleryCard
                                    media={galleryMedia[3]}
                                    className="h-60 md:h-46.5 lg:h-61"
                                />
                            </div>
                        )}

                        {galleryMedia.length >= 8 && galleryMedia[4] && (
                            <div className="col-span-12 md:col-span-4">
                                <GalleryCard
                                    media={galleryMedia[4]}
                                    className="h-52 md:h-60 lg:h-55"
                                />
                            </div>
                        )}

                        {galleryMedia.length >= 8 && galleryMedia[5] && (
                            <div className="col-span-12 md:col-span-2">
                                <GalleryCard
                                    media={galleryMedia[5]}
                                    className="h-52 md:h-60 lg:h-55"
                                />
                            </div>
                        )}

                        {galleryMedia.length >= 8 && galleryMedia[6] && (
                            <div className="col-span-12 md:col-span-2">
                                <GalleryCard
                                    media={galleryMedia[6]}
                                    className="h-52 md:h-60 lg:h-55"
                                />
                            </div>
                        )}

                        {galleryMedia.length >= 8 && galleryMedia[7] && (
                            <div className="col-span-12 md:col-span-4">
                                <GalleryCard
                                    media={galleryMedia[7]}
                                    className="h-52 md:h-60 lg:h-55"
                                />
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </Section>
    );
}

type GalleryCardProps = {
    media?: {
        mediaUrl: string;
        thumbnailUrl?: string;
    };
    className?: string;
};

function GalleryCard({
    media,
    className,
}: GalleryCardProps) {
    const [playVideo, setPlayVideo] = useState(false);

    if (!media) return null;

    const isVideo = isVideoFile(media.mediaUrl);

    return (
        <div
            className={`group relative overflow-hidden rounded-md p-0.75 bg-[linear-gradient(to_right,#040286,#FF992AC2,#040286,#040286,#FF992AC2,#040286)] bg-size-[250%] bg-left duration-1000 transition-all hover:bg-right shadow-xl ${className}`}
        >
            <div className="relative h-full w-full overflow-hidden rounded">

                {isVideo ? (
                    playVideo ? (
                        <video
                            src={media.mediaUrl}
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
                                src={
                                    media.thumbnailUrl ||
                                    "/placeholder-video.jpg"
                                }
                                alt="Video Thumbnail"
                                fill
                                unoptimized
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                                    <Play
                                        size={24}
                                        className="ml-1 text-primary"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                        </button>
                    )
                ) : (
                    <Image
                        src={media.mediaUrl}
                        alt="Gallery Image"
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}

            </div>

            <div className="absolute inset-0 bg-black/0 transition-all duration-50" />
        </div>
    );
}
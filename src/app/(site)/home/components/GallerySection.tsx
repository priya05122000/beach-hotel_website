"use client";

import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";
import { Gallery } from "@/src/types";
import { Button } from "@/src/components/common/button";

gsap.registerPlugin(ScrollTrigger);

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

function useVideoPlayback() {
    const [started, setStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (started) {
            videoRef.current?.play().catch(() => { });
        }
    }, [started]);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    };

    return { started, setStarted, isPlaying, setIsPlaying, videoRef, togglePlayback };
}

function MediaImage({
    item,
    isVideo,
    started,
    videoRef,
    setIsPlaying,
}: {
    item: MediaItem;
    isVideo: boolean;
    started: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    setIsPlaying: (playing: boolean) => void;
}) {
    if (isVideo) {
        if (started) {
            return (
                <video
                    ref={videoRef}
                    src={item.mediaUrl}
                    poster={item.thumbnailUrl || "/placeholder-video.jpg"}
                    preload="auto"
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            );
        }
        return (
            <Image
                src={item.thumbnailUrl || "/placeholder-video.jpg"}
                alt={item.title || "Video thumbnail"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
            />
        );
    }

    return (
        <Image
            src={item.mediaUrl}
            alt={item.title || "Gallery image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
        />
    );
}

function GalleryCard({ item, imageClassName }: { item: MediaItem; imageClassName: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const isVideo = isVideoFile(item.mediaUrl);
    const { started, setStarted, isPlaying, setIsPlaying, videoRef, togglePlayback } = useVideoPlayback();

    useIsomorphicLayoutEffect(() => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        const ctx = gsap.context(() => {
            // Skip the decorative parallax on small screens — it's extra
            // scroll-driven work that competes with everything else animating
            // at once, and isn't worth the main-thread cost at mobile sizes.
            gsap.matchMedia().add("(min-width: 768px)", () => {
                gsap.fromTo(
                    inner,
                    { y: -32 },
                    {
                        y: 32,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div>
            <div ref={containerRef} className={`relative w-full overflow-hidden ${imageClassName}`}>
                <div ref={innerRef} className="absolute -top-8 -bottom-8 inset-x-0">
                    <MediaImage
                        item={item}
                        isVideo={isVideo}
                        started={started}
                        videoRef={videoRef}
                        setIsPlaying={setIsPlaying}
                    />
                </div>

                {isVideo && (
                    <button
                        type="button"
                        onClick={started ? togglePlayback : () => setStarted(true)}
                        aria-label={started && isPlaying ? "Pause video" : "Play video"}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                        {started && isPlaying ? (
                            <Pause size={50} className="text-cream opacity-0 transition-opacity duration-200 hover:opacity-100" fill="currentColor" />
                        ) : (
                            <Play size={50} className="ml-1 text-cream" fill="currentColor" />
                        )}
                    </button>
                )}
            </div>
            <div className="flex items-center  justify-between mt-3">
                <h3 className="font-bold text-gray  type-body  leading-snug">
                    {item.title || "Gallery"}
                </h3>
                {/* <ReadMoreButton /> */}
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
        <Section >
            <section className="py-16 lg:py-20 ">
                <div className="mx-auto">
                    {/* Heading */}
                    <div className="mb-16 sm:mb-32">
                        <Eyebrow align="center" className="mt-2">
                            Gallery
                        </Eyebrow>
                    </div>
                    {/*
                        Layout (desktop):
                        [text col-3 rows 1-2] [item0 col-5 row-1 LARGE] [item1 col-4 row-1 SMALL]
                                             [item2 col-5 row-2 MEDIUM] [item3 col-4 row-2 LARGE]
                    */}
                    <div className="grid sm:grid-cols-[1fr_2fr] gap-x-10 gap-y-8">

                        {/* Left text — spans both rows on desktop */}
                        <div className="flex  flex-col ">
                            <p className=" text-primary-dark type-h2 leading-tight">
                                Take a closer look at the places and moments that make every stay distinctive. Our gallery reflects beautifully appointed spaces, coastal landscapes and the welcoming atmosphere that defines The Beach Hotel.
                            </p>
                        </div>


                        <div className="grid grid-cols-12 gap-x-5 gap-y-8">


                            {/* Item 0 — center top, LARGE */}
                            {item0 && (
                                <div className="col-span-12 md:col-span-6">
                                    <GalleryCard item={item0} imageClassName="h-64 md:h-72 lg:h-80" />
                                </div>
                            )}

                            {/* Item 1 — right top, SMALL / SHORT */}
                            {item1 && (
                                <div className="col-span-12 md:col-span-6">
                                    <GalleryCard item={item1} imageClassName="h-64 md:h-48 lg:h-52" />
                                </div>
                            )}

                            {/* Item 2 — center bottom, MEDIUM */}
                            {item2 && (
                                <div className="col-span-12 md:col-span-6">
                                    <GalleryCard item={item2} imageClassName="h-64 md:h-56 lg:h-60" />
                                </div>
                            )}

                            {/* Item 3 — right bottom, LARGE / TALL */}
                            {item3 && (
                                <div className="col-span-12 md:col-span-6">
                                    <GalleryCard item={item3} imageClassName="h-64 md:h-68 lg:h-76" />
                                </div>
                            )}

                        </div>

                    </div>

                </div>


                <div className="flex justify-end  mt-16">
                    {/* <Button
                        href="/gallery"
                        className="cursor-pointer  text-end text-gray w-40   px-3 py-1 whitespace-nowrap"
                    >
                        Explore
                    </Button> */}

                    <Button href="/gallery" className="sm:w-50 whitespace-nowrap font-normal text-primary-dark cursor-pointer">
                        View Gallery
                    </Button>
                </div>
            </section>
        </Section>
    );
}

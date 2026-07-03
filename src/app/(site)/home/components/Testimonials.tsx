"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { GuestReview } from "@/src/types";
import CenterSection from "@/src/components/common/CenterSection";

interface TestimonialProps {
    reviews: GuestReview[];
}

const getImageSrc = (img?: string | null) => {
    const fallback = "/home/default.jpg";
    if (!img) return fallback;
    const s = String(img).trim();
    if (!s) return fallback;
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${s.replace(/^\/+/, "")}`;
};

const pad = (n: number) => String(n).padStart(2, "0");

function StarIcon({
    type = "full",
}: {
    type: "full" | "half" | "empty";
}) {
    if (type === "half") {
        return (
            <div className="relative w-5 h-5">
                {/* Empty Star */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="absolute inset-0 w-5 h-5 fill-primary/18"
                >
                    <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
                </svg>

                {/* Half Filled */}
                <div className="absolute inset-0 overflow-hidden w-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="w-5 h-5 fill-[#FFE433]"
                    >
                        <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className={`w-5 h-5 ${type === "full"
                ? "fill-[#FFE433]"
                : "fill-gray/30"
                }`}
        >
            <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
        </svg>
    );
}

function StarRating({
    stars,
    max = 5,
}: {
    stars: number;
    max?: number;
}) {
    return (
        <div className="flex gap-1 mt-2">
            {Array.from({ length: max }).map((_, index) => {
                const value = index + 1;

                let type: "full" | "half" | "empty" = "empty";

                if (stars >= value) {
                    type = "full";
                } else if (stars >= value - 0.5) {
                    type = "half";
                }

                return (
                    <StarIcon
                        key={index}
                        type={type}
                    />
                );
            })}
        </div>
    );
}

export default function Testimonials({ reviews }: TestimonialProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const total = reviews.length;

    return (
        <CenterSection className="py-16 lg:py-20 bg-ivory">

            {/* Heading */}
            <div className="mb-10">
                <h2 className={`mt-2  uppercase text-gray type-h6 tracking-[73%]  lg:tracking-[83%] text-center `}>
                    Reviews
                </h2>
            </div>

            {/* Single carousel wrapper — desktop: 80% wide, mobile: full width */}
            <div className="relative">

                {/* Desktop-only arrows: absolutely positioned so carousel stays as one instance */}
                <div className="hidden sm:flex absolute top-0 right-0 w-[20%] items-start gap-2 pt-1 z-10">
                    <div className="flex items-center w-52">
                        <button
                            onClick={scrollPrev}
                            className="text-xl cursor-pointer font-semibold"
                        >
                            {pad(activeIndex + 1)}
                        </button>

                        <div className="w-1/3 h-px bg-gray-300 mx-4" />

                        <button
                            onClick={scrollNext}
                            className="text-xl cursor-pointer font-semibold"
                        >
                            {pad(
                                activeIndex === total - 1
                                    ? 1 // if looping
                                    : activeIndex + 2
                            )}
                        </button>
                    </div>
                </div>

                {/* THE single carousel — constrained to 80% on desktop, full width on mobile */}
                <div ref={emblaRef} className="overflow-hidden w-full sm:w-[75%]">
                    <div className="flex">
                        {reviews.map((item) => (
                            <div key={item.id} className="min-w-0 type-body flex-[0_0_100%]">

                                {/* Author */}
                                <div className="flex items-center  gap-4 mb-8">
                                    <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 grayscale">
                                        <Image
                                            src={getImageSrc(item.image_url)}
                                            alt={item.guest_name ?? "Guest"}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold uppercase text-primary-dark ">
                                            {item.guest_name ?? "Anonymous"}
                                        </p>
                                        <p className=" text-gray mt-0.5">
                                            {item.review_title ?? "Verified Guest"}
                                        </p>
                                    </div>
                                </div>

                                {/* Review text */}
                                <p className="text-charcoal  sm:max-w-[70%] my-4 ">
                                    {item.review}
                                </p>

                                {/* Stars — mobile only */}
                                <div >
                                    <StarRating stars={item.rating ?? 0} />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>


            <div className="sm:hidden mt-10">
                <div className="flex items-center w-52">
                    <button onClick={scrollPrev} className="text-xl cursor-pointer font-semibold">
                        {pad(activeIndex + 1)}
                    </button>
                    <div className="w-1/3 h-px bg-gray-300 mx-4" />
                    <button onClick={scrollNext} className="text-xl cursor-pointer font-semibold">
                        {pad(activeIndex === total - 1 ? 1 : activeIndex + 2)}
                    </button>
                </div>
            </div>

        </CenterSection>
    );
}

"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ANIMATIONS } from "@/src/components/common/Animations";
import { Calendar } from "lucide-react";
import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import { GuestReview } from "@/src/types";


interface TestimonialProps {
    reviews: GuestReview[];
}


type AnimationKey = keyof typeof ANIMATIONS;


const reviewStyles = [
    {
        position: "top-0 left-4",
        size: "  w-[120px] h-[120px] sm:w-[110px] sm:h-[110px] lg:w-[120px] lg:h-[120px]",
        animations: "fadeRight",
    },
    {
        position: " top-2 left-1/2 translate-x-[calc(-50%-(-18px))]",
        size: "w-[90px] h-[90px] lg:w-[100px] lg:h-[100px]",
        animations: "fadeDown",
    },
    {
        position: "top-15 right-0",
        size: "w-[90px] h-[90px] lg:w-[100px] lg:h-[100px]",
        animations: "fadeLeft",
    },
    {
        position: "bottom-10 left-0",
        size: "w-[90px] h-[90px] lg:w-[100px] lg:h-[100px]",
        animations: "fadeRight",
    },
    {
        position: " bottom-12.5 left-1/2 translate-x-[calc(-50%-(8px))]",
        size: "  w-[120px] h-[120px] sm:w-[110px] sm:h-[110px] lg:w-[120px] lg:h-[120px]",
        animations: "fadeUp",
    },
    {
        position: "bottom-0 right-4",
        size: "w-[90px] h-[90px] lg:w-[100px] lg:h-[100px]",
        animations: "fadeLeft",
    },
];


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

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    const limitedReviews = reviews.slice(0, 6);

    return (
        <div className="bg-surface py-16 lg:py-20  rounded-[14px]">
            <CenterSection>
                <div className="grid grid-cols-1 gap-6 min-h-87.5 lg:min-h-90 sm:grid-cols-12 xl:gap-10 ">

                    {/* Left Side Images */}
                    <div className="relative col-span-6 xl:col-span-5 min-h-55  flex items-center justify-center w-full">
                        <div className=" w-full relative  flex  items-center justify-center rounded-md p-4 min-h-80 sm:p-6">

                            {limitedReviews.map((t, index) => {
                                const ui = reviewStyles[index % reviewStyles.length];
                                const anim = ANIMATIONS[ui.animations as AnimationKey];
                                const aos = anim?.['data-aos'];
                                const aosDuration = anim?.['data-aos-duration'];


                                return (
                                    <div
                                        key={t.id}
                                        data-aos={aos}
                                        data-aos-duration={aosDuration}
                                        suppressHydrationWarning
                                        onClick={() => {
                                            setActiveIndex(index);
                                            emblaApi?.scrollTo(index);
                                        }}
                                        className={`absolute ${ui.position} cursor-pointer transition-transform duration-300 hover:scale-105`.replace(/\s+/g, ' ').trim()}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Select testimonial from ${t.guest_name}`}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                setActiveIndex(index);
                                                emblaApi?.scrollTo(index);
                                            }
                                        }}
                                    >


                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${t.image_url}`}
                                            alt={t.guest_name || "Guest Review"}
                                            width={100}
                                            height={100}
                                            unoptimized
                                            className={`object-cover rounded-md shadow-[0px_4px_4px_0px_#00000040] border-2 transition-all duration-300 ${activeIndex === index
                                                ? "bg-linear-to-r from-primary via-accent/76 to-primary"
                                                : "border-white grayscale "
                                                } ${ui.size}`}
                                            loading="lazy"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* Right Side Content */}
                    <div className="flex min-h-70 col-span-6 xl:col-span-7  flex-col justify-center rounded-[14px] py-6 sm:px-6 sm:min-h-80 sm:py-8 lg:pl-10">
                        <div className="mb-2 hidden sm:block">
                            {/* <Quote
                                className="h-10 w-10 rotate-180 text-primary"
                                aria-hidden="true"
                            /> */}

                            <svg xmlns="http://www.w3.org/2000/svg" height={40} viewBox="0 0 310 310"><path d="M70.62 54.59 20 155.84v101.25h101.25V155.84H70.62l50.63-101.25zM290 52.91h-50.62l-50.63 101.25v101.25H290V154.16h-50.62z" fill="#012644"></path></svg>
                        </div>

                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {reviews.map((item) => (
                                    <div
                                        key={item.id}
                                        className="min-w-0 flex-[0_0_100%]"
                                    >
                                        <p
                                            className={`max-w-lg text-gray ${typography.textLg}`}
                                        >
                                            {item.review}
                                        </p>


                                        <span className="flex items-center mt-2  gap-1 text-dark text-xs">
                                            <Calendar className="w-3 h-3" />
                                            {item.created_at
                                                ? new Date(item.created_at).toLocaleDateString("en-IN")
                                                : ""}
                                        </span>

                                        <p
                                            className={`text-primary font-semibold mt-2 ${typography.textXl}`}
                                        >
                                            {item.guest_name}
                                        </p>

                                        {/* <span className="text-sm text-dark">
                                            {item.location}

                                        </span> */}

                                        <StarRating stars={item.rating ?? 0} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </CenterSection >
        </div >
    );
}

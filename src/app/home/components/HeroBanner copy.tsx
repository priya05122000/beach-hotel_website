"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, ChevronLeft, ChevronRight, Users } from "lucide-react";
import CenterSection from "@/src/components/common/CenterSection";

const slides = [
    {
        id: 1,
        image: "/home/hero-1.webp",
        alt: "Hotel Exterior",
    },
    {
        id: 2,
        image: "/home/hero-2.png",
        alt: "Hotel Room",
    },
];

export default function HeroBanner() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
        },
        [
            Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    return (
        <>
            <section className="relative h-screen">
                {/* Hero Carousel - 80% */}
                <div className="relative h-screen overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="relative min-w-0 flex-[0_0_100%]"
                            >
                                <div className="relative h-full w-full">
                                    <Image
                                        src={slide.image}
                                        alt={slide.alt}
                                        fill
                                        priority={index === 0}
                                        loading={index === 0 ? undefined : "lazy"}
                                        quality={90}
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Left Arrow */}
                    <button
                        onClick={scrollPrev}
                        aria-label="Previous Slide"
                        className="absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-white cursor-pointer"
                    >
                        <ChevronLeft className="h-7 w-7" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollNext}
                        aria-label="Next Slide"
                        className="absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-white cursor-pointer"
                    >
                        <ChevronRight className="h-7 w-7" />
                    </button>


                    {/* Hero Content */}
                    <div className="absolute bottom-10 left-1/2 z-20 w-full  -translate-x-1/2 ">

                        <CenterSection>
                            <form className="flex flex-wrap items-center gap-2 bg-primary/14 p-4 backdrop-blur-xl">

                                {/* Check In */}
                                <div className="relative flex h-10 min-w-45 flex-1 items-center border border-white/40 px-4 text-white">
                                    <CalendarDays size={16} className="mr-2" />

                                    <span className="text-sm">Check In</span>

                                    <input
                                        type="date"
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                </div>

                                {/* Check Out */}
                                <div className="relative flex h-10 min-w-45 flex-1 items-center border border-white/40 px-4 text-white">

                                    <CalendarDays size={16} className="mr-2" />

                                    <span className="text-sm">Check Out</span>

                                    <input
                                        type="date"
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                </div>

                                {/* Guests */}
                                <div className="relative flex h-10 min-w-45 flex-1 items-center border border-white/40 px-4 text-white">
                                    <Users size={16} className="mr-2" />

                                    <select className="w-full bg-transparent outline-none text-sm">
                                        <option className="text-black">1 Guest</option>
                                        <option className="text-black">2 Guests</option>
                                        <option className="text-black">3 Guests</option>
                                        <option className="text-black">4 Guests</option>
                                    </select>
                                </div>

                                {/* Promo Code */}
                                <div className="flex h-10 flex-1 min-w-45 items-center border border-white/40 px-4 text-white">
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        className="w-full bg-transparent outline-none placeholder:text-white text-sm"
                                    />
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="h-10 bg-accent px-8 text-sm font-semibold uppercase text-white transition hover:opacity-90"
                                >
                                    Book Now
                                </button>
                            </form>
                        </CenterSection>

                    </div>
                </div>

            </section>

            {/* Bottom Content - 20% */}
            <div className="flex h-[40vh] items-center justify-center bg-primary px-4 text-white relative">

                <div className="pointer-events-none absolute -bottom-6 ">

                    <Image
                        src="/home/thebeach_hotel.png"
                        alt="The Beach Hotel"
                        width={1920}
                        height={1200}
                        className="w-full h-full object-cover"
                    />

                </div>


                <div className="z-0 text-center">
                    <h1 className="text-2xl font-bold uppercase">
                        The Beach Hotel
                    </h1>

                    <p className="mt-2 text-sm max-w-80 text-white font-extralight">
                        Erumanayakkanpatti Beach Road, Kanyakumari 629702, India
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-4">
                        <button className="mt-4 rounded-md bg-accent px-6 h-10 text-sm font-semibold text-white shadow-lg uppercase w-40">
                            About Us
                        </button>
                        <button className="mt-4 rounded-md bg-white px-6 h-10 text-sm font-semibold text-primary shadow-lg w-40">
                            +91 12345 67890
                        </button>
                    </div>
                </div>


            </div>
        </>
    );
}
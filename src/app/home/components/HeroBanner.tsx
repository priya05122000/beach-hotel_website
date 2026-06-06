"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/home/hero-1.png",
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
                    <div className="absolute bottom-10 left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-4">
                        <form className="flex flex-wrap items-center gap-2 bg-primary/14 p-4 backdrop-blur-xl">

                            {/* Check In */}
                            <div className="flex h-10 flex-1 min-w-45 items-center border border-white/40 px-4 text-white">
                                <input
                                    type="date"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>

                            {/* Check Out */}
                            <div className="flex h-10 flex-1 min-w-45 items-center border border-white/40 px-4 text-white">
                                <input
                                    type="date"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>

                            {/* Guests */}
                            <div className="flex h-10 flex-1 min-w-45 items-center border border-white/40 px-4 text-white">
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
                                    className="w-full bg-transparent outline-none placeholder:text-white/70 text-sm"
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
                    </div>
                </div>

            </section>

            {/* Bottom Content - 20% */}
            <div className="flex h-[40vh] items-center justify-center bg-primary px-4 text-white relative">

                <div className="pointer-events-none absolute -bottom-2 sm:-bottom-6 lg:-bottom-8 xl:-bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase leading-none text-white/10">
                    <span className="text-[10vw]  tracking-wider">
                        The Beach Hotel
                    </span>
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
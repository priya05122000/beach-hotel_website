"use client";

import Section from "@/src/components/common/Section";
import Image from "next/image";
import GalleryTabs from "./GalleryTabs";

const GalleryCard = ({
    src,
    alt,
    className = "",
}: {
    src: string;
    alt: string;
    className?: string;
}) => {
    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-md
                p-[2px]
                bg-[linear-gradient(to_right,#040286,#FF992AC2,#040286,#040286,#FF992AC2,#040286)]
                bg-[length:250%_100%]
                bg-left
                transition-all
                duration-1000
                hover:bg-right
                shadow-xl
                ${className}
            `}
        >
            <div className="relative h-full w-full overflow-hidden rounded-[4px]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700"
                />
            </div>
        </div>
    );
};

export default function HotelGallerySection() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);

        if (!element) return;

        const offset = 120; // header height
        const top =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    return (
        <>
            <GalleryTabs />


            {/* HOTEL SECTION 1 */}
            <section
                id="hotel-section"
                className="bg-primary/43 py-20 scroll-mt-32"
            >
                <Section>
                    <div className="mb-8">
                        <span className="rounded bg-accent px-3 py-1 text-xs font-semibold uppercase text-white">
                            Hotels
                        </span>

                        <p className="mt-4 max-w-4xl text-base leading-relaxed text-white">
                            Hotel Facilities Are Designated Spaces And Services
                            Designed To Enhance The Guest Experience, Distinct
                            From Individual Room Amenities.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Luxury Hotel Room"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-2.png"
                            alt="Premium Hotel Suite"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Luxury Hotel Interior"
                            className="col-span-2 h-[340px]"
                        />
                    </div>
                </Section>
            </section>

            {/* HOTEL SECTION 2 */}
            <section className="bg-primary/19 py-20">
                <Section>
                    <div className="grid grid-cols-2 gap-4">
                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Luxury Hotel Room"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-2.png"
                            alt="Premium Hotel Suite"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Luxury Hotel Interior"
                            className="col-span-2 h-[340px]"
                        />
                    </div>
                </Section>
            </section>

            {/* SPA SECTION 1 */}
            <section
                id="spa-section"
                className="bg-primary/13 py-20 scroll-mt-32"
            >
                <Section>
                    <div className="mb-8">
                        <span className="rounded bg-accent px-3 py-1 text-xs font-semibold uppercase text-white">
                            Spa
                        </span>

                        <p className="mt-4 max-w-4xl text-base leading-relaxed text-primary">
                            Relax, rejuvenate, and unwind with our premium spa
                            experiences and wellness treatments.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Spa Room"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-2.png"
                            alt="Spa Experience"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Luxury Spa"
                            className="col-span-2 h-[340px]"
                        />
                    </div>
                </Section>
            </section>

            {/* SPA SECTION 2 */}
            <section className="bg-primary/7 py-20">
                <Section>
                    <div className="grid grid-cols-2 gap-4">
                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Spa Room"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-2.png"
                            alt="Spa Experience"
                            className="h-[280px]"
                        />

                        <GalleryCard
                            src="/home/hero-1.png"
                            alt="Luxury Spa"
                            className="col-span-2 h-[340px]"
                        />
                    </div>
                </Section>
            </section>
        </>
    );
}
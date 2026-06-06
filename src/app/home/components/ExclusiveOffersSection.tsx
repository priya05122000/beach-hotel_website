"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "@/src/components/common/Section";

const offers = [
    {
        id: 1,
        image: "/home/hero-1.png",
        title:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
    {
        id: 2,
        image: "/home/hero-2.png",
        title:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
    {
        id: 3,
        image: "/home/hero-1.png",
        title:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
];

export default function ExclusiveOffersSection() {
    return (
        <section className="bg-light py-20">
            <Section>
                <div className="mb-12">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        Offers
                    </span>

                    <h2 className="mt-3 text-4xl font-medium uppercase text-primary lg:text-5xl">
                        Exclusive Offers
                    </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="group relative h-[500px] overflow-hidden rounded-[24px] border border-accent"
                        >
                            {/* Normal Image */}
                            <Image
                                src={offer.image}
                                alt={offer.title}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                            />

                            {/* Normal Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                            {/* Hover Orange Background */}
                            <div className="absolute inset-0 bg-accent opacity-0 transition-all duration-700 group-hover:opacity-100" />

                            {/* Hover Image */}
                            <div className="absolute left-6 top-6 h-[180px] w-[180px] overflow-hidden rounded-[28px] opacity-0 transition-all duration-700 group-hover:opacity-100">
                                <Image
                                    src={offer.image}
                                    alt={offer.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="inline-block rounded bg-accent px-3 py-1 text-[10px] font-medium uppercase text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary">
                                    Exclusive Offer
                                </span>

                                <div className="mt-4 flex items-end justify-between gap-4">
                                    <p className="max-w-[240px] text-sm leading-relaxed text-white">
                                        {offer.title}
                                    </p>

                                    <button className="flex h-10 w-10 items-center justify-center rounded bg-white text-primary transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </section>
    );
}
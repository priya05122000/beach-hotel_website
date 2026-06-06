"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";

const faqData = [
    {
        question: "Hotel Management?",
        answer:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
    {
        question: "Hotel Management?",
        answer:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
    {
        question: "Hotel Management?",
        answer:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
    {
        question: "Hotel Management?",
        answer:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience.",
    },
];

const categories = [
    "Stay",
    "Dining",
    "Facilities",
    "Spa",
    "Events",
    "Booking",
    "Location",
    "Loyalty",
    "Brand",
];

export default function FAQSection() {
    const [activeCategory, setActiveCategory] =
        useState("Loyalty");

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-primary/18 py-20">
            <Section>
                {/* Header */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
                        FAQ
                    </p>

                    <h2 className="mt-2 text-4xl font-medium text-primary">
                        FAQ
                    </h2>

                    {/* Categories */}
                    <div className="mt-8 flex flex-wrap gap-2">
                        {categories.map((item) => (
                            <button
                                key={item}
                                onClick={() =>
                                    setActiveCategory(item)
                                }
                                className={`px-4 py-2 text-[11px] uppercase transition ${activeCategory === item
                                    ? "bg-primary text-white"
                                    : "bg-white text-primary"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                {/* Content */}
                <div className="mt-16 grid gap-20 lg:grid-cols-12">
                    {/* FAQ */}
                    <div className="lg:col-span-7">
                        <div className="space-y-8">
                            {faqData.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div key={index}>
                                        <button
                                            onClick={() =>
                                                setOpenIndex(
                                                    isOpen ? -1 : index
                                                )
                                            }
                                            className="flex w-full items-start justify-between text-left"
                                        >
                                            <span className="text-3xl text-primary">
                                                {faq.question}
                                            </span>

                                            <span className="text-3xl text-neutral-500">
                                                {isOpen ? "−" : "+"}
                                            </span>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                                                    ? "mt-4 max-h-32 opacity-100"
                                                    : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <p className="max-w-lg text-lg leading-relaxed text-neutral-500">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            <div className="overflow-hidden rounded-md">
                                <Image
                                    src="/home/hero-1.png"
                                    alt="FAQ"
                                    width={700}
                                    height={800}
                                    className="h-[400px] w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}
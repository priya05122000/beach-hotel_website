"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import { FAQ, FaqCategory } from "@/src/types";

interface FAQSectionProps {
    faqCategories: FaqCategory[];
    faqDatas: FAQ[];
}
interface FAQSectionProps {
    faqCategories: FaqCategory[];
}


export default function FAQSection({
    faqCategories,
    faqDatas,
}: FAQSectionProps) {
    const [activeCategory, setActiveCategory] = useState(
        faqCategories?.[0]?.category_name || ""
    );

    const [openIndex, setOpenIndex] = useState(0);

    const activeCategoryData = faqCategories.find(
        (category) => category.category_name === activeCategory
    );

    const filteredFaqs = faqDatas.filter(
        (faq) => faq.category_id === activeCategoryData?.id
    );

    return (
        <section className="bg-primary/18 py-16 lg:py-20">
            <Section>
                {/* Header */}
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">
                        FAQ
                    </p>

                    <h2
                        className={`mt-2 ${typography.textFoXl} font-normal text-gray`}
                    >
                        FAQ
                    </h2>

                    {/* Categories */}
                    <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-2">
                        {faqCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.category_name);
                                    setOpenIndex(0);
                                }}
                                className={`px-4 py-2  text-xs uppercase transition ${activeCategory === category.category_name
                                        ? "bg-primary text-white"
                                        : "bg-white text-primary"
                                    }`}
                            >
                                {category.category_name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-16 grid gap-10 lg:gap-20 xl:gap-30 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr]">
                    {/* FAQ */}
                    <div>
                        <div className="space-y-8">
                            {filteredFaqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div key={faq.id}>
                                        <button
                                            onClick={() =>
                                                setOpenIndex(
                                                    isOpen ? -1 : index
                                                )
                                            }
                                            className={`flex w-full items-start justify-between text-left ${typography.textTwoXl}`}
                                        >
                                            <span className="text-primary">
                                                {faq.question}
                                            </span>

                                            <span className="text-gray cursor-pointer">
                                                {isOpen ? "-" : "+"}
                                            </span>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                                                    ? "mt-4 max-h-40 opacity-100"
                                                    : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <p
                                                className={`max-w-md xl:max-w-xl ${typography.textLg} text-gray`}
                                            >
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="hidden sm:block">
                        <div className="sticky top-24">
                            <div className="overflow-hidden ">
                                <Image
                                    src="/home/faq.jpg"
                                    alt="FAQ"
                                    width={700}
                                    height={800}
                                    className="h-100 w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}
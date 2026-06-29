"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import type { FAQ } from "@/src/types";

interface FAQAboutSectionProps {
  faqs: FAQ[];
}

export default function FAQAboutSection({ faqs }: FAQAboutSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className=" py-16 lg:py-20">
      <div className="mb-6 lg:mb-10 flex items-start justify-between gap-4">
        <h2
          className={`font-normal text-primary-dark leading-tight ${typography.textFoXl}`}
        >
          YOUR QUESTIONS,
          <br />
          <div className="font-light mt-2 text-charcoal text-sm lg:text-base leading-snug max-w-xs md:max-w-sm">
            thoughtfully answered — so all that's left is to arrive
          </div>
        </h2>

        <p
          className={`hidden sm:block text-right text-primary-dark max-w-60 leading-snug ${typography.textBase}`}
        >
          We&apos;ve gathered answers to everything you might be wondering about
        </p>
      </div>
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-between gap-4 lg:gap-10">
          <div className="overflow-hidden">
            <Image
              src="/home/faq.jpg"
              alt="Got Questions"
              width={700}
              height={600}
              className="h-72 w-full object-cover sm:h-96 lg:h-105"
            />
          </div>

          <p
            className={`italic text-gray leading-relaxed max-w-60 ${typography.textLg}`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            «&thinsp;We believe every stay in Kanyakumari should be
            unforgettable. We make it that way&thinsp;»
          </p>
        </div>

        <div className="divide-y divide-silver">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <p className={`text-foreground ${typography.textBase}`}>
                    {faq.question}
                  </p>

                  <span className="shrink-0 flex h-7 w-7 items-center justify-center text-gray text-sm transition-transform duration-300">
                    {isOpen ? "↑" : "↓"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p
                    className={`text-gray leading-relaxed ${typography.textBase}`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

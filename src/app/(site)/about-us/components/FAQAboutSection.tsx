"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Section from "@/src/components/common/Section";
import SubHeading from "@/src/components/common/SubHeading";
import type { FAQ } from "@/src/types";

interface FAQAboutSectionProps {
  faqs: FAQ[];
}

export default function FAQAboutSection({ faqs }: FAQAboutSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className=" py-16 lg:py-20">
      <div className="mb-6 lg:mb-10 flex flex-col sm:flex-row items-start justify-between gap-4">
        <h3 className="type-h2 font-semibold text-primary-dark leading-tight">
          YOUR QUESTIONS,
          <br />
          <span className="block type-body font-light mt-2 text-charcoal leading-snug max-w-xs md:max-w-sm">
            Thoughtfully answered — so all that&apos;s left is to arrive
          </span>
        </h3>

        <p className="type-body text-left sm:text-right text-charcoal max-w-xs sm:max-w-60 leading-snug">
          We&apos;ve gathered answers to everything you might be wondering about
        </p>
      </div>
      <div className="grid gap-8  lg:gap-16 lg:grid-cols-[1fr_1.4fr] items-start">
        <div className="flex flex-col justify-between gap-4 lg:gap-10">
          <div className="overflow-hidden">
            <Image
              src="/home/faq.webp"
              alt="Got Questions"
              width={700}
              height={600}
              className="h-72 w-full object-cover sm:h-96 lg:h-105"
            />
          </div>

          <p
            className="type-label-lg italic text-charcoal leading-relaxed max-w-60"

          >
            « We believe every stay in Kanyakumari should be
            unforgettable. We make it that way »
          </p>
        </div>

        <div>
          <div className="divide-y divide-silver">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.id} className="py-5">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <SubHeading as="p" className="text-primary-dark">
                      {faq.question}
                    </SubHeading>

                    <span
                      className={`shrink-0 flex h-7 w-7 items-center justify-center text-gray transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    >
                      <ChevronDown size={18} strokeWidth={1.5} />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${isOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="type-body text-charcoal leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="type-body text-charcoal mt-6">
            Still Have Questions?{" "}
            <Link
              href="/contact-us"
              className="text-primary-dark underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

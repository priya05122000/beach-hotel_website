"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

const faqs = [
  {
    id: 1,
    question: "How can I be sure the property is legally verified?",
    answer:
      "We only work with properties that have passed a full legal check: we verify ownership rights, debts, restrictions, developer reputation, and deal history. Each transaction is supervised by a lawyer with experience in 100+ deals.",
  },
  {
    id: 2,
    question: "Can I buy property if I'm not from this country?",
    answer:
      "Yes, foreign nationals can purchase property here. We guide you through the entire process, including documentation, legal requirements, and any applicable restrictions for non-residents.",
  },
  {
    id: 3,
    question: "Do I need to be present in person for the paperwork?",
    answer:
      "Not necessarily. We offer remote transaction support with power-of-attorney options so you can complete the purchase without being physically present.",
  },
  {
    id: 4,
    question: "How long does the whole process take?",
    answer:
      "On average, the full process from selection to handover takes 4–8 weeks depending on the property type and financing method.",
  },
  {
    id: 5,
    question: "I'm afraid of losing my money — how is this protected?",
    answer:
      "All funds are held in a secure escrow account and released only upon successful title transfer. We use licensed escrow agents and insured transactions for complete peace of mind.",
  },
  {
    id: 6,
    question: "Can I rent out the property after I buy it?",
    answer:
      "Absolutely. We offer property management and rental services to help you generate income from your investment. Our team handles listings, guests, and maintenance.",
  },
  {
    id: 7,
    question: "I don't understand legal details — who will explain everything?",
    answer:
      "Our dedicated legal advisor will walk you through every document in plain language. We believe real estate should feel simple, and we make it that way.",
  },
];

export default function FAQAboutSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-ivory py-16 lg:py-20">
      <div className="mb-6 lg:mb-10 flex items-start justify-between gap-4">
        <h2
          className={`font-normal text-primary leading-tight ${typography.textFoXl}`}
        >
          GOT QUESTIONS?
          <br />
          <span className="italic font-light text-accent">
            we&apos;ve got you
          </span>
        </h2>

        <p
          className={`hidden sm:block text-right text-primary max-w-60 leading-snug ${typography.textBase}`}
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
            «&thinsp;We believe real estate should feel simple. We make it that
            way&thinsp;»
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

                  <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-silver text-gray text-sm transition-transform duration-300">
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

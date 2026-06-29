"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

const partners = [
  { name: "Seashore & Co", logo: "/contact-us/seashore.png" },
  { name: "GT Holidays", logo: "/contact-us/gtholidays.png" },
  { name: "Sri Maniya College", logo: "/contact-us/srimaniya.png" },
  { name: "Follicle", logo: "/contact-us/follicle.png" },
];

export default function TrustedBySection() {
  return (
    <Section className=" py-12 md:py-20">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="sm:pr-10 sm:border-r sm:border-silver/60 text-center sm:text-left">
          {/* <p className={`${typography.textXl} font-semibold text-primary-dark  whitespace-nowrap`}> */}
          <p
            className={`type-h2 font-semibold leading-tight text-primary-dark  whitespace-nowrap`}
          >
            Trusted by 50+
            <br />
            top companies
          </p>
        </div>

        <div className="w-full min-w-0">
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover
            autoFill
            className="flex items-center"
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="mx-10 relative h-16 w-16 lg:h-22 lg:w-36 shrink-0 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 1024px) 64px, 144px"
                  className="object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}

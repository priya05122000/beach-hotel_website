"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/common/button";

gsap.registerPlugin(ScrollTrigger);

export default function HeroLocationSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      if (!imageInnerRef.current) return;
      gsap.fromTo(
        imageInnerRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <Section className="bg-white ">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] xl:grid-cols-2 gap-4  py-16 lg:py-20">
        {/* Left Panel */}
        <p className={`font-semibold text-primary-dark  type-h2 leading-tight`}>
          A Conversation <br /> Begins Your  Journey
        </p>
        {/* Right Panel */}
        <div className="flex flex-col justify-center">
          <div className="max-w-lg">
            <div
              className={` type-display-sm uppercase  leading-tight  text-primary-dark `}
            >
              Your perfect stay begins the moment you reach out.
            </div>
            <p className="mt-6 type-body">
              However you wish to begin, our team is here — attentive, discreet and delighted to help craft a stay beyond compare.
            </p>

            {/* CTA Button */}
            <div className="mt-6 md:mt-8 lg:mt-10">
              {/* <a
                href="#contact-form"
                className="inline-block border border-foreground/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Contact A Manager
              </a> */}
              <Button href="#contact-form" className="text-sm tracking-[0.1em] font-arizona-sans-bold">
                Contact A Manager
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-12 gap-y-10 sm:gap-10 py-16 lg:py-20">
        <div className="sm:col-span-6 lg:col-span-4 space-y-5">
          <div className="uppercase font-semibold text-primary-dark  type-body-xl leading-tight"> GETTING HERE</div>
          <p className="type-body">
            Set at the southernmost tip of the Indian peninsula, The Beach Hotel is closer than you imagine — and worth every mile.
          </p>
          <p className="type-body"> <b className="type-body-xl">By Air </b> - The nearest international gateway is Trivandrum (Thiruvananthapuram) International Airport, approximately [90 km / a 2–2.5 hour scenic drive] away. Thoothukudi International Airport offers an alternative connection from within India.
          </p>

          <p className="type-body"> <b className="type-body-xl">By Rail </b> - Kanyakumari Railway Station, the final stop on India's longest rail route, lies just 1KM from the hotel and connects to major cities across. Nagercoil Junction offers further connections nearby.

          </p>
          <p className="type-body"> <b className="type-body-xl">By Road </b> -  Reach us via NH44, the legendary Kashmir-to-Kanyakumari highway that ends where the land meets the sea. The town of Nagercoil is approximately [20 km] away. Chauffeur-driven transfers can be arranged for a seamless arrival.</p>

        </div>

        <div className="hidden lg:block col-span-1 lg:col-span-2"></div>

        <div className="sm:col-span-6 lg:col-span-5 flex items-end">
          <div className="relative w-full h-100 overflow-hidden">
            <div
              ref={imageInnerRef}
              className="absolute inset-[-12%] will-change-transform"
            >
              <Image
                src="/contact-us/contact.jpg"
                alt="The Beach Hotel exterior"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}

import Image from "next/image";
import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";
import { MapPin } from "lucide-react";

export default function HeroLocationSection() {
  return (
    <Section className="bg-white py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] xl:grid-cols-2 gap-2 mb-8 md:mb-14 xl:mb-20">
        {/* Left Panel */}
        <p className={`font-semibold text-primary ${typography.textThXl}`}>
          KanniyaKumari <br />
          Southernmost Tip of India
        </p>
        {/* Right Panel */}
        <div className="flex flex-col justify-center">
          <div>
            <h1
              className={`font-semibold  text-primary ${typography.textFiXl}`}
            >
              A Premier Category (A)
              <br />
              Business Centre
              <br />
              at the Heart of
              <br />
              Kanniyakumari&apos;s
              <br />
              Economic Activity
            </h1>

            {/* CTA Button */}
            <div className="mt-6 md:mt-8 lg:mt-10">
              <a
                href="#contact-form"
                className="inline-block border border-foreground/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Contact A Manager
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="relative h-60 overflow-hidden">
            <Image
              src="/contact-us/contact.jpg"
              alt="The Beach Hotel exterior"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-3 text-[11px] flex gap-1 items-start justify-end">
            <MapPin size={12} className="inline mt-1" />
            <p>Beach Rd, Kanniyakumari, <br /> Tamil Nadu 629702, India</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

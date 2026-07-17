"use client";

import Image from "next/image";
import Section from "@/src/components/common/Section";
import PillLinkButton from "@/src/components/common/PillLinkButton";

const FeaturedHighlightSection = () => {
  return (
    <Section className="bg-ivory py-16 lg:py-20">

      {/* Heading block */}
      <div className="grid sm:grid-cols-[1fr_1fr_1fr] gap-2">
        <div className="hidden sm:block" />
        <div className="col-span-2 flex flex-col text-left sm:text-right">
          <h2 className="mt-2 text-primary-dark type-h2">
            The Soul of Southern India

          </h2>
          <p className="max-w-lg sm:ml-auto mt-4 mb-10 type-body text-charcoal">
            Kanyakumari is a destination of many wonders — a sacred shore where
            sunrise, sunset and moonrise can all be witnessed over the sea,
            where the sands shift through hues of gold and crimson, and where
            ancient temples have drawn pilgrims for two thousand years. Beyond
            the coast lies a hidden hinterland of misted mountains, secret
            waterfalls and timeless heritage that few ever discover. To stay
            with us is to stand at this meeting of nature, culture and spirit —
            and to let it become part of your own story.
          </p>
        </div>
      </div>

      {/* Image + blur panel */}
      <div className=" min-h-105 sm:min-h-80 md:min-h-100 overflow-hidden">
        <div className="relative h-full sm:w-[80%] min-h-100 sm:min-h-80 lg:min-h-105">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"
            alt="Luxury beach hotel view"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 66vw"
            priority
          />

          {/* Blur panel — bottom strip on mobile, right third on sm+ */}
          <div className="absolute bottom-0 sm:inset-y-0 right-0 w-full sm:w-1/2 lg:w-1/3 h-1/2 sm:h-auto">
            <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
            <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-6 lg:p-8">
              <p className="type-body text-white leading-relaxed ">
                Access your account or create a new profile to manage
                bookings, view offers and enjoy a smoother stay experience at
                The Beach Hotel, Kanniyakumari.
              </p>
              <div className="mt-auto w-fit self-end">
                <PillLinkButton href="/" variant="light">
                  Sign In
                </PillLinkButton>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block" />
      </div>
    </Section>
  );
};

export default FeaturedHighlightSection;

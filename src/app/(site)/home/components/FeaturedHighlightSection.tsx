"use client";

import Image from "next/image";
import { Button } from "@/src/components/common/button";
import Section from "@/src/components/common/Section";

const FeaturedHighlightSection = () => {
  return (
    <Section className="bg-ivory py-16 lg:py-20">


      <div className="grid sm:grid-cols-[1fr_1fr_1fr] gap-2">
        <div />
        <div className="col-span-2 flex flex-col text-right">
          <h2 className={`mt-2 uppercase text-gray type-h6 tracking-[73%]  lg:tracking-[83%] `}>
            A SETTING LIKE NO OTHER
          </h2>
          <p className={`max-w-lg  ml-auto my-10 type-body sm:text-right text-charcoal`}>
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

      <div className="grid sm:grid-cols-[1fr_1fr_0.6fr] gap-1 min-h-80 md:min-h-80 overflow-hidden rounded-none">
        <div className="relative min-h-55 sm:min-h-0 col-span-2">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"
            alt="Luxury beach hotel view"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 66vw"
            priority
          />
          <div className="absolute inset-y-0 right-0 w-full sm:w-1/3 min-h-50 sm:min-h-0">
            <div className="absolute inset-0 backdrop-blur-xl bg-primary/60" />

            <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
              <div>
                <p className="type-body  text-white leading-relaxed">
                  Access your account or create a new profile to manage
                  bookings, view offers and enjoy a smoother stay experience at
                  The Beach Hotel, Kanniyakumari.
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  href="/"
                  lineColor="bg-white"
                  className="text-white text-sm font-arizona-sans-bold w-30"
                >
                  Sign In
                </Button>
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

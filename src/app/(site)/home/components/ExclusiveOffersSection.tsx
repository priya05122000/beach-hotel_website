"use client";

import { useState, useCallback } from "react";
import Section from "@/src/components/common/Section";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { typography } from "@/src/lib/typography";
import { Offer } from "@/src/types";

interface ExclusiveOffersSectionProps {
  offerDatas: Offer[];
}

const BlobOverlay = ({
  id,
  imageSrc,
}: {
  id: number;
  imageSrc: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1170"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <mask id={`blobMask-${id}`}>
        <rect
          x="0"
          y="0"
          width="1024"
          height="1170"
          fill="white"
        />
        <g
          transform="translate(0,1170) scale(0.067368,-0.067396)"
          fill="black"
          stroke="none"
        >
          <path d="M0 13917 l0 -3443 43 -21 c121 -59 270 -216 340 -358 81 -164 99 -294 78 -575 -6 -85 -23 -310 -36 -500 -14 -190 -48 -650 -75 -1022 -56 -760 -59 -855 -30 -975 61 -254 254 -473 505 -574 201 -80 427 -80 625 0 104 42 194 108 350 252 145 134 994 919 1440 1331 129 119 255 232 280 251 245 185 593 217 870 78 127 -63 6 44 1510 -1346 273 -253 515 -468 553 -492 70 -46 166 -89 252 -114 34 -9 99 -14 205 -13 142 0 162 2 238 28 239 79 416 233 522 452 71 147 82 282 55 644 -8 107 -28 382 -45 610 -124 1696 -121 1643 -96 1762 63 294 275 530 565 628 37 12 312 59 675 115 336 51 892 137 1236 189 344 53 648 102 675 110 135 37 281 123 371 218 155 164 234 366 234 596 0 265 -114 496 -319 650 -42 31 -517 359 -1056 727 -628 430 -1004 693 -1048 735 -243 228 -328 569 -219 884 18 51 88 185 189 361 1100 1912 1103 1918 1133 2013 17 51 33 127 37 168 l6 74 -5032 0 -5031 0 0 -3443z" />
        </g>
      </mask>

      <filter
        id={`frostedBlur-${id}`}
        x="-5%"
        y="-5%"
        width="110%"
        height="110%"
      >
        <feGaussianBlur stdDeviation="55" />
      </filter>

      <linearGradient
        id={`specular-${id}`}
        x1="0%"
        y1="0%"
        x2="40%"
        y2="60%"
      >
        <stop
          offset="0%"
          stopColor="#ffffff"
          stopOpacity="0.45"
        />
        <stop
          offset="60%"
          stopColor="#ffffff"
          stopOpacity="0.08"
        />
        <stop
          offset="100%"
          stopColor="#ffffff"
          stopOpacity="0"
        />
      </linearGradient>
    </defs>

    <image
      href={imageSrc}
      x="0"
      y="0"
      width="100%"
      height="1170"
      preserveAspectRatio="xMidYMid slice"
      filter={`url(#frostedBlur-${id})`}
      mask={`url(#blobMask-${id})`}
    />

    <rect
      x="0"
      y="0"
      width="1024"
      height="1170"
      fill="#FFC13B"
      fillOpacity="0.42"
      mask={`url(#blobMask-${id})`}
    />

    <rect
      x="0"
      y="0"
      width="100%"
      height="1170"
      fill={`url(#specular-${id})`}
      mask={`url(#blobMask-${id})`}
    />
  </svg>
);

export default function ExclusiveOffersSection({
  offerDatas,
}: ExclusiveOffersSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = useCallback(
    (offerId: string, isActive: boolean) => {
      if (window.innerWidth < 1024) {
        setActiveCard(isActive ? null : offerId);
      }
    },
    []
  );

  return (
    <Section className="pt-32 pb-16  lg:pt-40 lg:pb-20">
      <h2
        className={` text-gray text-center uppercase font-normal `}
      >
        Exclusive Offers
      </h2>

      <p className={`max-w-md ml-auto my-10 sm:text-right `}>
        Hotel facilities are designated spaces and services designed to enhance the guest
      </p>

      <div className="grid gap-6 xl:gap-10 md:grid-cols-2 lg:grid-cols-3">
        {offerDatas.map((offer, index) => {
          const isActive = activeCard === offer.id;

          const imageUrl = offer.image_url
            ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${offer.image_url}`
            : "/placeholder.jpg";

          return (
            <div
              key={offer.id}
              onClick={() =>
                handleCardClick(
                  offer.id,
                  isActive
                )
              }
              className="group relative h-100 xl:h-110 overflow-hidden "
            >
              <div className="relative h-full w-full overflow-hidden ">
                <Image
                  src={imageUrl}
                  alt={offer.title}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 opacity-0 lg:group-hover:opacity-100 ${isActive
                    ? "opacity-100 lg:opacity-0"
                    : ""
                    }`}
                >
                  <BlobOverlay
                    id={index}
                    imageSrc={imageUrl}
                  />
                </div>
              </div>

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex group-hover:bg-linear-to-r from-primary to-accent p-0.5 h-8 text-white bg-primary/24 ">
                    <p
                      className={`flex items-center px-2 transition-all duration-700   lg:group-hover:bg-white lg:group-hover:text-primary ${isActive
                        ? "bg-white text-primary lg:bg-accent lg:text-white"
                        : ""
                        }`}
                    >
                      EXCLUSIVE OFFER
                    </p>
                  </div>


                </div>

                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pb-5 lg:pb-0 max-h-0 opacity-0 translate-y-4 lg:group-hover:max-h-32 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 ${isActive
                    ? "max-h-32 opacity-100 translate-y-0 lg:max-h-0 lg:opacity-0 lg:translate-y-4"
                    : ""
                    }`}
                >
                  <p
                    className={`lg:mt-3  text-white `}
                  >
                    {offer.short_description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
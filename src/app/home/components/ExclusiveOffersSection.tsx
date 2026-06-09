"use client";
import { useState } from "react";
import Section from "@/src/components/common/Section";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { typography } from "@/src/lib/typography";

const offers = [
  {
    id: 1,
    image: "/home/ireland.webp",
    alt: "Ireland",
    title: "Study in Ireland",
  },
  {
    id: 2,
    image: "/home/ireland.webp",
    alt: "Ireland",
    title: "Study in Ireland",
  },
  {
    id: 3,
    image: "/home/ireland.webp",
    alt: "Ireland",
    title: "Study in Ireland",
  },
];

const hoverImage = "/home/hoverimage.png";

const ExclusiveOffersSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <Section className="py-16 lg:py-20">
      <h2
        className={`${typography.textFoXl} font-arizona text-gray uppercase font-normal mb-10 `}
      >
        Exclusive Offers
      </h2>
      <div className="grid gap-6 xl:gap-10 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => {
          const isActive = activeCard === offer.id;

          return (
            <div
              key={offer.id}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setActiveCard(isActive ? null : offer.id);
                }
              }}
              className="group relative h-100 xl:h-110 overflow-hidden rounded-3xl will-change-transform p-0.5 bg-linear-to-br from-accent to-primary "
            >
              {/* Default Image */}
              <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                <Image
                  src={offer.image}
                  alt={offer.alt}
                  fill
                  className="
            object-cover
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-110
        "
                />

                <div
                  className={`
                    absolute inset-0 z-10 pointer-events-none
                    transition-opacity duration-700
                    opacity-0
                    lg:group-hover:opacity-100
                    ${isActive ? "opacity-100 lg:opacity-0" : ""}
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1170"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <mask id="invertBlob">
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
                          <path
                            d="M0 13917 l0 -3443 43 -21 c121 -59 270 -216 340 -358 81 -164 99
-294 78 -575 -6 -85 -23 -310 -36 -500 -14 -190 -48 -650 -75 -1022 -56 -760
-59 -855 -30 -975 61 -254 254 -473 505 -574 201 -80 427 -80 625 0 104 42
194 108 350 252 145 134 994 919 1440 1331 129 119 255 232 280 251 245 185
593 217 870 78 127 -63 6 44 1510 -1346 273 -253 515 -468 553 -492 70 -46
166 -89 252 -114 34 -9 99 -14 205 -13 142 0 162 2 238 28 239 79 416 233 522
452 71 147 82 282 55 644 -8 107 -28 382 -45 610 -124 1696 -121 1643 -96
1762 63 294 275 530 565 628 37 12 312 59 675 115 336 51 892 137 1236 189
344 53 648 102 675 110 135 37 281 123 371 218 155 164 234 366 234 596 0 265
-114 496 -319 650 -42 31 -517 359 -1056 727 -628 430 -1004 693 -1048 735
-243 228 -328 569 -219 884 18 51 88 185 189 361 1100 1912 1103 1918 1133
2013 17 51 33 127 37 168 l6 74 -5032 0 -5031 0 0 -3443z"
                          />
                          <path
                            d="M14365 17345 c314 -30 467 -86 600 -220 138 -137 194 -301 224 -645
6 -65 9 60 10 393 l1 487 -482 -1 c-455 -1 -475 -2 -353 -14z"
                          />
                          <path
                            d="M1 488 l-1 -488 483 1 c308 1 451 5 397 10 -351 32 -508 87 -645 224
-135 134 -191 289 -220 605 -12 127 -13 108 -14 -352z"
                          />
                          <path
                            d="M15186 863 c-19 -307 -85 -493 -223 -630 -136 -135 -304 -193 -643
-222 -65 -6 61 -9 393 -10 l487 -1 0 485 c0 267 -2 485 -4 485 -1 0 -6 -48
-10 -107z"
                          />
                        </g>
                      </mask>
                    </defs>

                    <rect
                      x="0"
                      y="0"
                      width="1024"
                      height="1170"
                      fill="#FF9A20"
                      mask="url(#invertBlob)"
                    />

                    <g
                      transform="translate(0,1170) scale(0.067368,-0.067396)"
                      fill="none"
                      stroke="none"
                    >
                      <path
                        d="M0 13917 l0 -3443 43 -21 c121 -59 270 -216 340 -358 81 -164 99
-294 78 -575 -6 -85 -23 -310 -36 -500 -14 -190 -48 -650 -75 -1022 -56 -760
-59 -855 -30 -975 61 -254 254 -473 505 -574 201 -80 427 -80 625 0 104 42
194 108 350 252 145 134 994 919 1440 1331 129 119 255 232 280 251 245 185
593 217 870 78 127 -63 6 44 1510 -1346 273 -253 515 -468 553 -492 70 -46
166 -89 252 -114 34 -9 99 -14 205 -13 142 0 162 2 238 28 239 79 416 233 522
452 71 147 82 282 55 644 -8 107 -28 382 -45 610 -124 1696 -121 1643 -96
1762 63 294 275 530 565 628 37 12 312 59 675 115 336 51 892 137 1236 189
344 53 648 102 675 110 135 37 281 123 371 218 155 164 234 366 234 596 0 265
-114 496 -319 650 -42 31 -517 359 -1056 727 -628 430 -1004 693 -1048 735
-243 228 -328 569 -219 884 18 51 88 185 189 361 1100 1912 1103 1918 1133
2013 17 51 33 127 37 168 l6 74 -5032 0 -5031 0 0 -3443z"
                      />
                      <path
                        d="M14365 17345 c314 -30 467 -86 600 -220 138 -137 194 -301 224 -645
6 -65 9 60 10 393 l1 487 -482 -1 c-455 -1 -475 -2 -353 -14z"
                      />
                      <path
                        d="M1 488 l-1 -488 483 1 c308 1 451 5 397 10 -351 32 -508 87 -645 224
-135 134 -191 289 -220 605 -12 127 -13 108 -14 -352z"
                      />
                      <path
                        d="M15186 863 c-19 -307 -85 -493 -223 -630 -136 -135 -304 -193 -643
-222 -65 -6 61 -9 393 -10 l487 -1 0 485 c0 267 -2 485 -4 485 -1 0 -6 -48
-10 -107z"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                {/* Top Row - Always Visible */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex  bg-linear-to-r from-primary to-accent p-0.5 h-10 text-sm font-normal text-white rounded-xs">
                    <span
                      className={`
        flex items-center px-2 transition-all duration-700

        bg-dusty

        lg:group-hover:bg-white
        lg:group-hover:text-primary

        ${isActive ? "bg-white text-primary lg:bg-dusty lg:text-white" : ""}
    `}
                    >
                      EXCLUSIVE OFFER
                    </span>
                  </div>

                  <button
                    className={`
        flex h-10 w-10 items-center justify-center
        rounded-xs border border-primary bg-white text-primary
        transition-all duration-700

        lg:group-hover:scale-105

        ${isActive ? "scale-105 lg:scale-100" : ""}
    `}
                  >
                    <ArrowUpRight size={20} />
                  </button>
                </div>

                <div
                  className={`
        overflow-hidden
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
pb-5 lg:pb-0
        max-h-0
        opacity-0
        translate-y-4

        lg:group-hover:max-h-24
        lg:group-hover:opacity-100
        lg:group-hover:translate-y-0

        ${
          isActive
            ? "max-h-24 opacity-100 translate-y-0 lg:max-h-0 lg:opacity-0 lg:translate-y-4"
            : ""
        }
    `}
                >
                  <p
                    className={` lg:mt-3 leading-snufg text-white ${typography.textBase}`}
                  >
                    Discover exciting opportunities and start your international
                    education journey today.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ExclusiveOffersSection;

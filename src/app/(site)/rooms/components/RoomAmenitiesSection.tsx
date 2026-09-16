"use client";

import Image from "next/image";
import {
  ConciergeBell,
  Coffee,
  GlassWater,
  Sofa,
  Wine,
  Fan,
  Snowflake,
  Brush,
  Shirt,
  Refrigerator,
  Droplets,
  LampDesk,
  DoorOpen,
  ChevronRight,
} from "lucide-react";
import Section from "@/src/components/common/Section";
import { useFadeIn } from "@/src/lib/gsap/useFadeIn";
import { ANIM } from "@/src/lib/gsap/config";

interface RoomAmenityItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ROOM_AMENITIES: RoomAmenityItem[] = [
  // {
  //   icon: ConciergeBell,
  //   title: "Room Service",
  //   description:
  //     "Room service is available for guests who prefer to dine or request refreshments in the comfort of their room.",
  // },
  {
    icon: Coffee,
    title: "Coffee Machine",
    description:
      "Make yourself a fresh cup anytime, right from the comfort of your room.",
  },
  {
    icon: GlassWater,
    title: "Mineral Water",
    description:
      "Bottled mineral water is placed in your room and refilled daily.",
  },
  {
    icon: Sofa,
    title: "Sofa Chair",
    description:
      "A cosy corner to sit back, relax, and unwind after a long day.",
  },
  {
    icon: Wine,
    title: "Mini Bar",
    description:
      "A few handy essentials and drinks stocked in your room, just in case.",
  },
  {
    icon: Fan,
    title: "Hair Dryer",
    description:
      "Every room comes with a hair dryer, ready to use whenever you need it.",
  },
  {
    icon: Snowflake,
    title: "Air Conditioning",
    description:
      "Rooms are fitted with air conditioning to keep you comfortable through the day and night.",
  },
  {
    icon: Brush,
    title: "Dental Kit",
    description:
      "A complimentary dental kit is provided in your room for your convenience.",
  },
  {
    icon: Shirt,
    title: "Ironing Board",
    description:
      "An ironing board is available on request, so you always look your best.",
  },
  {
    icon: Refrigerator,
    title: "Mini Fridge",
    description:
      "A mini fridge in your room keeps your snacks and drinks nicely chilled.",
  },
  {
    icon: Droplets,
    title: "Toiletries",
    description:
      "Quality toiletries are provided in every room for a comfortable stay.",
  },
  {
    icon: LampDesk,
    title: "Work Desk",
    description:
      " A dedicated work desk is set up for guests who need to get a little work done.",
  },
  {
    icon: DoorOpen,
    title: "Interconnected Rooms",
    description:
      "Interconnected rooms are available in select categories, ideal for families or groups travelling together.",
  },
];

function RoomAmenityItemBlock({ item }: { item: RoomAmenityItem }) {
  return (
    <div className="flex flex-col items-center text-center">
      <item.icon size={32} strokeWidth={1} className="text-ivory mb-3" />
      <div className="flex items-center gap-1.5 mb-1">
        {/* <ChevronRight size={11} strokeWidth={2} className="text-accent shrink-0" /> */}
        <p className="type-body-sm uppercase font-medium text-ivory">{item.title}</p>
      </div>
      <p className="type-body-sm text-xs text-ivory/70 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

export default function RoomAmenitiesSection() {
  const gridRef = useFadeIn<HTMLDivElement>({
    children: true,
    stagger: ANIM.stagger.tight,
    duration: ANIM.duration.base,
    y: 24,
  });

  return (

    <>


      <Section className="py-16 lg:py-20 bg-ivory">
        {/* Heading block */}
        <div className="grid sm:grid-cols-[1fr_1fr_1fr] gap-2 mb-10 lg:mb-14">
          <div className="hidden sm:block" />
          <div className="col-span-2 flex flex-col text-left sm:text-right">
            <h2 className="mt-2 text-primary-dark type-h2">Room Facilities</h2>
            <p className="max-w-lg sm:ml-auto mt-4 type-body text-charcoal">
              Everything you need for a comfortable stay — thoughtfully placed
              in every room, from morning coffee to a well-deserved rest.
            </p>
          </div>
        </div>

        {/* Image + blur panel with amenities */}
        <div className="relative w-full overflow-hidden">
          <Image
            src="/home/home.webp"
            alt="Room Facilities"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-primary-dark/60 backdrop-blur-md transform-gpu"
            style={{ WebkitBackdropFilter: "blur(20px)", backdropFilter: "blur(20px)" }}
          />
          <div
            ref={gridRef}
            className="relative z-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-6 sm:p-10 lg:p-14"
          >
            {ROOM_AMENITIES.map((item) => (
              <RoomAmenityItemBlock key={item.title} item={item} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 lg:py-20 ">
        <div className="type-h2 mb-4 font-semibold text-primary-dark  ">
          Good to Know
        </div>
        <div className="max-w-3xl type-body text-charcoal space-y-4">
          <div>
            <strong className="text-primary-dark uppercase tracking-widest">Pet :</strong>
            <p className="mt-2">One pet is allowed per room, and dogs only are permitted. Dogs must be well-behaved and kept under control at all times. Only dogs up to 45 cm in height at the shoulder are allowed. Large or aggressive breeds are not permitted.</p>
          </div>
          <div>
            <strong className="text-primary-dark uppercase tracking-widest">Cot :</strong>
            <ul className="list-disc pl-10 mt-2 ">
              <li>Extra cot for guests above 8 years: ₹1,000 + taxes.</li>
              <li>Extra cot for guests below 8 years: ₹700 + taxes.</li>
            </ul>
          </div>
        </div>
      </Section>

    </>
  );
}

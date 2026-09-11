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
  {
    icon: ConciergeBell,
    title: "Room Service",
    description:
      "Room service is available for guests who prefer to dine or request refreshments in the comfort of their room.",
  },
  {
    icon: Coffee,
    title: "Coffee Machine",
    description:
      "Selected rooms feature a coffee machine for preparing a fresh cup of coffee at your convenience.",
  },
  {
    icon: GlassWater,
    title: "Mineral Water",
    description:
      "Complimentary mineral water is provided in the room for your convenience.",
  },
  {
    icon: Sofa,
    title: "Sofa Chair",
    description:
      "Selected rooms include a comfortable sofa chair, providing a relaxing space to sit and unwind.",
  },
  {
    icon: Wine,
    title: "Mini Bar",
    description:
      "A well-stocked mini bar is available in selected rooms with a range of refreshments.",
  },
  {
    icon: Fan,
    title: "Hair Dryer",
    description:
      "A hair dryer is provided in the room for convenient personal grooming.",
  },
  {
    icon: Snowflake,
    title: "Air Conditioning",
    description:
      "Air-conditioned rooms provide a cool and comfortable setting throughout your stay.",
  },
  {
    icon: Brush,
    title: "Dental Kit",
    description:
      "A dental kit is provided with essential personal care items for your convenience.",
  },
  {
    icon: Shirt,
    title: "Ironing Board",
    description:
      "An ironing board is available to help you keep your clothes neat and presentable.",
  },
  {
    icon: Refrigerator,
    title: "Mini Fridge",
    description:
      "Selected rooms feature a mini fridge for storing beverages and personal refreshments.",
  },
  {
    icon: Droplets,
    title: "Toiletries",
    description:
      "Essential toiletries are provided in the bathroom for your everyday personal care.",
  },
  {
    icon: LampDesk,
    title: "Work Desk",
    description:
      "A dedicated work desk provides a convenient space for working, reading or attending to personal tasks.",
  },
  {
    icon: DoorOpen,
    title: "Interconnected Rooms",
    description:
      "Interconnected rooms are available in selected room categories, making them a practical choice for families and groups travelling together.",
  },
];

function RoomAmenityItemBlock({ item }: { item: RoomAmenityItem }) {
  return (
    <div className="flex flex-col items-center text-center">
      <item.icon size={32} strokeWidth={1} className="text-ivory mb-3" />
      <div className="flex items-center gap-1.5 mb-1">
        <ChevronRight size={11} strokeWidth={2} className="text-accent shrink-0" />
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
            src="/facilities/1.webp"
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

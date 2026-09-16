"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Cigarette,
  Refrigerator,
  Newspaper,
  WashingMachine,
  Wifi,
  Wind,
  Timer,
  ConciergeBell,
  Languages,
  Accessibility,
  Camera,
  FireExtinguisher,
  Shield,
  Luggage,
  BatteryCharging,
  ArrowUpDown,
  BrushCleaning,
  CircleParking,
  Handshake,
  Stethoscope,
  Ticket,
  PersonStanding,
  Briefcase,
} from "lucide-react";
import Section from "@/src/components/common/Section";
import CenterSection from "@/src/components/common/CenterSection";
import Eyebrow from "@/src/components/common/Eyebrow";
import SubHeading from "@/src/components/common/SubHeading";
import { useFadeIn } from "@/src/lib/gsap/useFadeIn";
import { ANIM } from "@/src/lib/gsap/config";

interface AmenityItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface AmenityCategory {
  title: string;
  variant: "card" | "list" | "tinted" | "steps" | "feature";
  items: AmenityItem[];
}

const CATEGORIES: AmenityCategory[] = [
  {
    title: "Basic Amenities",
    variant: "card",
    items: [
      {
        icon: ConciergeBell,
        title: "Room Service",
        description:
          "Order meals, beverages, and other essentials directly to your room for added convenience.",
      },
      {
        icon: Cigarette,
        title: "Smoking Room",
        description:
          "Designated smoking rooms provide a suitable space for guests who prefer this option.",
      },
      {
        icon: BatteryCharging,
        title: "Power Backup",
        description:
          "Power backup supports uninterrupted access to essential hotel services during power interruptions.",
      },
      {
        icon: ArrowUpDown,
        title: "Elevator / Lift",
        description:
          "Move between the hotel's floors with ease using the elevator or lift.",
      },
      {
        icon: Refrigerator,
        title: "Refrigerator",
        description:
          "Keep beverages and personal items chilled with the refrigerator provided in selected rooms.",
      },
      {
        icon: BrushCleaning,
        title: "Housekeeping",
        description:
          "Regular housekeeping keeps your room clean, organised, and ready for a comfortable stay.",
      },
      {
        icon: Newspaper,
        title: "Newspaper",
        description:
          "Catch up on the latest local, national, and international news with newspaper access.",
      },
      {
        icon: CircleParking,
        title: "Free Parking",
        description:
          "Guests travelling by vehicles can make use of complimentary parking within the hotel premises.",
      },
      {
        icon: WashingMachine,
        title: "Laundry Service",
        description:
          "Paid laundry service takes care of your clothing needs during your stay.",
      },
      {
        icon: Wifi,
        title: "Wi-Fi",
        description:
          "Stay connected with reliable Wi-Fi access across the hotel.",
      },
      {
        icon: Wind,
        title: "Air Conditioning",
        description:
          "Air-conditioned rooms provide a pleasant indoor environment throughout your stay.",
      },
      {
        icon: Timer,
        title: "Express Check-in & Check-out",
        description:
          "Save time at the front desk with quick and convenient check-in and check-out procedures.",
      },
    ],
  },
  {
    title: "Safety & Security",
    variant: "steps",
    items: [
      {
        icon: Camera,
        title: "CCTV Surveillance",
        description:
          "CCTV surveillance covers key areas of the property as part of our security arrangements.",
      },
      {
        icon: FireExtinguisher,
        title: "Fire Extinguishers",
        description:
          "Fire extinguishers are placed at designated points throughout the property for emergency use.",
      },
      {
        icon: Shield,
        title: "Security Services",
        description:
          "Security staff are available to help maintain a safe environment across the property.",
      },
    ],
  },
  {
    title: "General Services",
    variant: "tinted",
    items: [
      {
        icon: Handshake,
        title: "Concierge",
        description:
          "Personalised assistance for bookings, recommendations, and travel needs.",
      },
      {
        icon: Accessibility,
        title: "Wheelchair Access",
        description: "Barrier-free spaces across the hotel.",
      },
      {
        icon: Languages,
        title: "Multilingual Staff",
        description: "Support in multiple languages, round the clock.",
      },
      {
        icon: Luggage,
        title: "Luggage Assistance",
        description: "Hands-free arrivals and departures.",
      },
      {
        icon: Stethoscope,
        title: "Doctor on Call",
        description: "On-call medical support, whenever needed.",
      },
      {
        icon: Ticket,
        title: "Ticket / Tour Assistance",
        description: "Sightseeing, tours, and bookings, arranged for you.",
      },
      {
        icon: PersonStanding,
        title: "Facilities for Guests with Disability",
        description: "Thoughtful design for effortless accessibility.",
      },
    ],
  },
  {
    title: "Other Facilities",
    variant: "feature",
    items: [
      {
        icon: Briefcase,
        title: "Cloakroom",
        description:
          "A cloakroom is available for guests to safely store their belongings when needed.",
      },
    ],
  },
];

function AmenityIconRing({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="shrink-0 w-11 h-11 rounded-full shadow-[0px_4px_4px_0px_#00000040] relative overflow-hidden p-px bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)] bg-size-[250%] bg-right">
      <div className="bg-ivory w-full h-full rounded-full flex items-center justify-center">
        <Icon size={18} strokeWidth={1.5} className="text-primary-dark" />
      </div>
    </div>
  );
}

function AmenityCard({ item }: { item: AmenityItem }) {
  return (
    <div className="relative border shadow-md border-silver pt-6 pb-5 px-5">
      <div className="absolute -top-5 left-5">
        <AmenityIconRing icon={item.icon} />
      </div>
      <p className="type-h6  tracking-widest text-primary-dark my-2 mb-4  font-bold uppercase border-primary/10 border-b py-2">
        {item.title}
      </p>
      <p className="type-body-sm text-charcoal leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

function AmenityFeature({ item }: { item: AmenityItem }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,320px)_1fr] gap-8 sm:gap-12 items-center">
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <Image
          src="/facilities/3.webp"
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <div className="mb-5">
          <AmenityIconRing icon={item.icon} />
        </div>
        <SubHeading as="h3" className="text-primary-dark mb-4">
          {item.title}
        </SubHeading>
        <p className="type-body-sm text-charcoal leading-relaxed max-w-md">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function AmenityListRow({ item }: { item: AmenityItem }) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-silver last:border-b-0">
      <div className="shrink-0 w-10 h-10 rounded-full bg-ivory flex items-center justify-center">
        <item.icon size={18} strokeWidth={1.5} className="text-primary-dark" />
      </div>
      <div>
        <p className="type-label-lg font-medium uppercase tracking-wide text-primary-dark mb-1">
          {item.title}
        </p>
        <p className="type-body-sm text-charcoal leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function AmenityStepsRow({ items }: { items: AmenityItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4">
      {items.map((item, index) => (
        <div key={item.title} className="relative flex flex-col items-center text-center px-2">
          {index % 4 !== 0 && (
            <div className="hidden lg:block absolute top-5 right-1/2 w-full h-px bg-silver" />
          )}
          <div className="relative z-10 mb-5">
            <AmenityIconRing icon={item.icon} />
          </div>
          <SubHeading as="h4" className="text-primary-dark mb-2">
            {item.title}
          </SubHeading>
          <p className="type-body-sm text-charcoal leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function AmenityTintedCard({ item }: { item: AmenityItem }) {
  return (
    <div className="relative flex items-start gap-4 p-5 sm:p-6 overflow-hidden border border-primary-dark/10">
      <div
        className="absolute inset-0 bg-primary-dark/10 backdrop-blur-xl transform-gpu"
        style={{ WebkitBackdropFilter: "blur(24px)", backdropFilter: "blur(24px)" }}
      />
      <div className="relative z-10 shrink-0 flex items-center justify-center">
        <item.icon size={40} strokeWidth={1.5} className="text-primary-dark w-8 h-8 sm:w-10 sm:h-10" />
      </div>
      <div className="relative z-10">
        <SubHeading as="h4" className="text-primary-dark mb-2">
          {item.title}
        </SubHeading>
        <p className="type-body-sm text-charcoal leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}





function CategoryBlock({ category }: { category: AmenityCategory }) {
  const gridRef = useFadeIn<HTMLDivElement>({
    children: true,
    stagger: ANIM.stagger.tight,
    duration: ANIM.duration.base,
    y: 24,
  });

  const hasIvoryBg =
    category.title === "Safety & Security" || category.title === "Other Facilities";

  return (
    <Section className={`py-16 lg:py-20 ${hasIvoryBg ? "bg-ivory" : ""}`}>
      <Eyebrow align="center" className="text-gray pb-10 sm:pb-14 lg:pb-20 font-normal">
        {category.title}
      </Eyebrow>

      {category.variant === "card" && (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10"
        >
          {category.items.map((item) => (
            <AmenityCard key={item.title} item={item} />
          ))}
        </div>
      )}

      {category.variant === "list" && (
        <div ref={gridRef} className="max-w-3xl border-t border-silver">
          {category.items.map((item) => (
            <AmenityListRow key={item.title} item={item} />
          ))}
        </div>
      )}

      {category.variant === "steps" && (
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 lg:gap-14 items-center">
          <div ref={gridRef}>
            <AmenityStepsRow items={category.items} />
          </div>
          <div className="relative w-full aspect-4/3 overflow-hidden bg-ivory">
            <Image
              src="/facilities/2.webp"
              alt={category.title}
              fill
              className="object-cover"
            />

          </div>
        </div>
      )}

      {category.variant === "tinted" && (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6"
        >
          {category.items.map((item) => (
            <AmenityTintedCard key={item.title} item={item} />
          ))}
        </div>
      )}

      {category.variant === "feature" && (
        <CenterSection>
          <div ref={gridRef}>
            {category.items.map((item) => (
              <AmenityFeature key={item.title} item={item} />
            ))}
          </div>
        </CenterSection>
      )}
    </Section>
  );
}

export default function FacilityAmenitiesSection() {
  return (
    <div>
      {CATEGORIES.map((category) => (
        <CategoryBlock key={category.title} category={category} />
      ))}
    </div>
  );
}

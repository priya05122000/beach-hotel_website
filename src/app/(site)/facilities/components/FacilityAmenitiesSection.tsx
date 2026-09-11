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
} from "lucide-react";
import Section from "@/src/components/common/Section";
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
  variant: "card" | "list" | "tinted" | "steps";
  items: AmenityItem[];
}

const CATEGORIES: AmenityCategory[] = [
  {
    title: "Basic Amenities",
    variant: "card",
    items: [
      {
        icon: Cigarette,
        title: "Smoking Rooms",
        description:
          "Designated smoking rooms are available for guests who prefer a smoking-friendly room.",
      },
      {
        icon: Refrigerator,
        title: "Refrigerator",
        description:
          "Selected rooms include a refrigerator for storing beverages and personal refreshments.",
      },
      {
        icon: Newspaper,
        title: "Newspaper",
        description:
          "Newspapers are available for guests who wish to keep up with the latest news.",
      },
      {
        icon: WashingMachine,
        title: "Laundry Service",
        description:
          "Paid laundry service is available for guests who require convenient clothing care.",
      },
      {
        icon: Wifi,
        title: "Wi-Fi",
        description:
          "Complimentary Wi-Fi is available throughout the hotel to keep you connected.",
      },
      {
        icon: Wind,
        title: "Air Conditioning",
        description:
          "Air-conditioned rooms provide a cool and comfortable setting throughout your visit.",
      },
      {
        icon: Timer,
        title: "Express Check-in & Check-out",
        description:
          "Express check-in and check-out make arrival and departure quick and hassle-free.",
      },
    ],
  },
  {
    title: "General Services",
    variant: "steps",
    items: [
      {
        icon: ConciergeBell,
        title: "Concierge Service",
        description:
          "Our concierge team is available to assist with guest requests and local information.",
      },
      {
        icon: Languages,
        title: "Multilingual Staff",
        description:
          "Our multilingual staff are available to assist guests in different languages.",
      },
      {
        icon: Accessibility,
        title: "Facilities for Guests with Disabilities",
        description:
          "Accessible facilities are available to support guests with disabilities throughout the property.",
      },
      {
        icon: Luggage,
        title: "Cloakroom",
        description:
          "Our cloakroom provides a convenient space for guests to keep their belongings while using the hotel's facilities.",
      },
    ],
  },
  {
    title: "Safety & Security",
    variant: "tinted",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4">
      {items.map((item, index) => (
        <div key={item.title} className="relative flex flex-col items-center text-center px-2">
          {index > 0 && (
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

function AmenityRingBadge({
  icon: Icon,
  active,
}: {
  icon: React.ElementType;
  active: boolean;
}) {
  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[0px_4px_4px_0px_#00000040] relative overflow-hidden p-px bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)] bg-size-[250%] duration-1000 transition-all ${active ? "bg-right" : "bg-left group-hover:bg-right"
        }`}
    >
      <div className="bg-ivory transition-all duration-300 w-full h-full rounded-full flex items-center justify-center">
        <Icon size={22} strokeWidth={1.5} className="text-primary-dark" />
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

  return (
    <div className="py-16 lg:py-20">
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
    </div>
  );
}

export default function FacilityAmenitiesSection() {
  return (
    <Section>
      <div>
        {CATEGORIES.map((category) => (
          <CategoryBlock key={category.title} category={category} />
        ))}
      </div>
    </Section>
  );
}

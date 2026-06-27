import Section from "@/src/components/common/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const leftLocations = [
  {
    icon: "/icons/blue_beach.svg",
    label: "Kanyakumari\nBeach",
    time: "10 min",
    length: "md:w-25 lg:w-35 xl:w-60",
  },
  {
    icon: "/icons/blue_airport.svg",
    label: "Airport",
    time: "< 5 min",
    length: "md:w-20 lg:w-30 xl:w-40",
  },
];

const rightLocations = [
  {
    icon: "/icons/blue_cart.svg",
    label: "Shopping Mall\nSPITSA",
    time: "10 min",
    length: "md:w-25 lg:w-35 xl:w-60",
  },
  {
    icon: "/icons/blue_hill.svg",
    label: "Thiruvalluvar\nStatue",
    time: "5 min",
    length: "md:w-20 lg:w-30 xl:w-40",
  },
];

interface LocationNodeProps {
  icon: string;
  label: string;
  side: "left" | "right";
}

function LocationNode({ icon, label, side }: LocationNodeProps) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-1 ${
        side === "left" ? "mr-2" : "ml-2"
      }`}
    >
      <Image src={icon} alt="Icon" width={24} height={24} className="w-5 h-5" />
      <p className="text-xs font-semibold text-primary uppercase tracking-wide  whitespace-pre-line">
        {label}
      </p>
    </div>
  );
}

interface ArrowRowProps {
  time: string;
  direction: "left-to-center" | "center-to-right";
  length: string;
}

function ArrowRow({ time, direction, length }: ArrowRowProps) {
  const isLeft = direction === "left-to-center";
  return (
    <div className={`flex flex-col items-center ${length}`}>
      <span className="text-xs text-primary mb-1">{time}</span>
      <div className="relative flex items-center w-full">
        {isLeft ? <ChevronLeft className="text-primary w-4 h-5" /> : <></>}
        <div className="flex-1 border-b-2 border-primary" />
        {isLeft ? <></> : <ChevronRight className="text-primary w-4 h-5" />}
      </div>
    </div>
  );
}

export default function NearbyLocationsSection() {
  return (
    <Section className="bg-white pb-10 lg:pb-16">
      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-center gap-0">
        {/* Left column: two rows stacked */}
        <div className="flex flex-col gap-10">
          {leftLocations.map((loc, i) => (
            <div key={i} className="flex items-center justify-end">
              <LocationNode icon={loc.icon} label={loc.label} side="left" />
              <ArrowRow
                time={loc.time}
                direction="left-to-center"
                length={loc.length}
              />
            </div>
          ))}
        </div>

        <div className="px-4 lg:px-8">
          <Image
            src="/blue_logo.png"
            alt="logo"
            width={200}
            height={200}
            className="h-60 w-60 xl:w-80"
          />
        </div>

        {/* Right column: two rows stacked */}
        <div className="flex flex-col gap-10">
          {rightLocations.map((loc, i) => (
            <div key={i} className="flex items-center">
              <ArrowRow
                time={loc.time}
                direction="center-to-right"
                length={loc.length}
              />
              <LocationNode icon={loc.icon} label={loc.label} side="right" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center gap-6">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/navbar_logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="h-25 w-60"
          />
          <p className="text-primary pt-4 text-sm uppercase">Nearby location</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {[...leftLocations, ...rightLocations].map((loc, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white/40 rounded p-3 gap-1"
            >
              <Image
                src={loc.icon}
                alt="Icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <p className="text-[11px] font-semibold text-primary uppercase tracking-wide  whitespace-pre-line">
                {loc.label}
              </p>
              <span className="text-[10px] text-primary/70">{loc.time}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

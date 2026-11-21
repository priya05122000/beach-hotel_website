import type { Metadata } from "next";
import HeroLocationSection from "./components/HeroLocationSection";
import LocationSection from "./components/LocationSection";
import NearbyLocationsSection from "./components/NearbyLocationsSection";
import ContactFormSection from "./components/ContactFormSection";
import LazyTrustedBySection from "./components/LazyTrustedBySection";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "Contact The Beach Bay | Kanyakumari Resort & Spa" },
  description:
    "Contact The Beach Bay Resort & Spa in Kanyakumari for room bookings and enquiries. Find our address, phone numbers, directions and guest assistance.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact The Beach Bay | Kanyakumari Resort & Spa",
    description:
      "Contact The Beach Bay Resort & Spa in Kanyakumari for room bookings and enquiries. Find our address, phone numbers, directions and guest assistance.",
    url: "/contact-us",
    images: [{ url: "/contact-us/hotel-entrance-outdoor-cafe-seating.jpg", width: 1200, height: 800 }],
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-18">
      <HeroLocationSection />
      <NearbyLocationsSection />
      <ContactFormSection />
      <LazyTrustedBySection />
      <LocationSection />
    </div>
  );
}

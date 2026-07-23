import type { Metadata } from "next";
import HeroLocationSection from "./components/HeroLocationSection";
import LocationSection from "./components/LocationSection";
import NearbyLocationsSection from "./components/NearbyLocationsSection";
import ContactFormSection from "./components/ContactFormSection";
import LazyTrustedBySection from "./components/LazyTrustedBySection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Beach Hotel, Kanyakumari. Plan your visit, make a reservation, or enquire about special packages. We'd love to hear from you.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact The Beach Hotel",
    description:
      "Plan your visit, make a reservation, or enquire about special packages at The Beach Hotel, Kanyakumari.",
    url: "/contact-us",
    images: [{ url: "/contact-us/contact.jpg", width: 1200, height: 800 }],
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

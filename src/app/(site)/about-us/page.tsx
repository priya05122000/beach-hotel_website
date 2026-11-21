import type { Metadata } from "next";
import AboutUs from "./components/AboutUs";
import FAQAboutSection from "./components/FAQAboutSection";
import ParallaxGallery from "./components/ParallaxGallery";
import StatementSection from "./components/StatementSection";
import TeamSection from "./components/TeamSection";
import { getFaqData } from "@/src/service/faqs";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "About The Beach Bay | Kanyakumari Resort & Spa" },
  description:
    "Learn about The Beach Bay Resort & Spa in Kanyakumari, its sea-view accommodation, infinity pool, spa, dining and hospitality by the southern coast.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About The Beach Bay | Kanyakumari Resort & Spa",
    description:
      "Learn about The Beach Bay Resort & Spa in Kanyakumari, its sea-view accommodation, infinity pool, spa, dining and hospitality by the southern coast.",
    url: "/about-us",
    images: [{ url: "/common/banner/sea-view-hotel-suite-sunset.webp", width: 1600, height: 900 }],
  },
};

export default async function AboutUsPage() {
  const faqData = await getFaqData();

  return (
    <>
      <AboutUs />
      <ParallaxGallery />
      <StatementSection />
      <TeamSection />
      <FAQAboutSection faqs={faqData.data.slice(0, 8)} />
    </>
  );
}

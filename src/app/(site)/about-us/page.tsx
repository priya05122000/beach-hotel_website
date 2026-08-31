import type { Metadata } from "next";
import AboutUs from "./components/AboutUs";
import FAQAboutSection from "./components/FAQAboutSection";
import ParallaxGallery from "./components/ParallaxGallery";
import StatementSection from "./components/StatementSection";
import TeamSection from "./components/TeamSection";
import { getFaqData } from "@/src/service/faqs";

export const metadata: Metadata = {
  title: "About Us — Our Story & Team",
  description:
    "Learn the story behind The Beach Hotel — our heritage, our team, and our commitment to delivering an extraordinary luxury experience in Kanyakumari.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About The Beach Hotel",
    description:
      "Learn the story behind The Beach Hotel — our heritage, our team, and our commitment to luxury in Kanyakumari.",
    url: "/about-us",
    images: [{ url: "/common/banner/facilities.webp", width: 1600, height: 900 }],
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

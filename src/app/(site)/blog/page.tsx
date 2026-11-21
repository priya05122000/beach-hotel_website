import type { Metadata } from "next";
import CommonBanner from "@/src/components/common/CommonBanner";
import BlogInfluencerSection from "./components/BlogInfluencerSection";
import { getBlogList } from "@/src/service/blogs";
import { getReelsData } from "@/src/service/reels";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "Kanyakumari Travel Guides & Tips | The Beach Bay" },
  description:
    "Read Kanyakumari travel guides from The Beach Bay, covering temple timings, sightseeing, Glass Bridge tickets, family itineraries and local food.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Kanyakumari Travel Guides & Tips | The Beach Bay",
    description:
      "Read Kanyakumari travel guides from The Beach Bay, covering temple timings, sightseeing, Glass Bridge tickets, family itineraries and local food.",
    url: "/blog",
    images: [{ url: "/blog/beachfront-hotel-lobby-reception-sea-view.webp", width: 1600, height: 900 }],
  },
};

export default async function BlogPage() {
  const [{ data: blogs }, { data: reels }] = await Promise.all([
    getBlogList(),
    getReelsData(),
  ]);

  const activeBlogs = blogs.filter((b) => b.active !== false && b.is_published);
  const activeReels = reels
    .filter((r) => r.is_active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <div>
      <CommonBanner
        title="NOTES FROM THE BEACH BAY"
        src="/blog/beachfront-hotel-lobby-reception-sea-view.webp"
        alt="Beachfront hotel lobby and reception with sea view at The Beach Bay, Kanyakumari"
      />
      <BlogInfluencerSection blogs={activeBlogs} reels={activeReels} />
    </div>
  );
}

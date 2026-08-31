import type { Metadata } from "next";
import CommonBanner from "@/src/components/common/CommonBanner";
import BlogInfluencerSection from "./components/BlogInfluencerSection";
import { getBlogList } from "@/src/service/blogs";
import { getReelsData } from "@/src/service/reels";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | The Beach Hotel" template —
  // this title already contains the brand name, so templating it would
  // double it up ("...Tips | The Beach Hotel").
  title: { absolute: "The Beach Hotel Blog — Travel Notes & Tips" },
  description:
    "Stories, travel tips, and insider insights from The Beach Hotel, Kanyakumari. Read our journal and get inspired for your next coastal escape.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Notes from the Beach Hotel",
    description:
      "Stories, travel tips, and insider insights from The Beach Hotel, Kanyakumari.",
    url: "/blog",
    images: [{ url: "/blog/blog.webp", width: 1600, height: 900 }],
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
        title="NOTES FROM THE BEACH HOTEL"
        src="/blog/blog.webp"
        alt="Blog — Notes from The Beach Hotel, Kanyakumari"
      />
      <BlogInfluencerSection blogs={activeBlogs} reels={activeReels} />
    </div>
  );
}

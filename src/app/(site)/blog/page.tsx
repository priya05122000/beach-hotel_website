import type { Metadata } from "next";
import CommonBanner from "@/src/components/common/CommonBanner";
import BlogGrid from "./components/BlogGrid";
import { getBlogList } from "@/src/service/blogs";

export const metadata: Metadata = {
  title: "Blog — Notes from the Beach Hotel",
  description:
    "Stories, travel tips, and insider insights from The Beach Hotel, Kanyakumari. Explore our journal and get inspired for your next coastal escape.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Notes from the Beach Hotel",
    description:
      "Stories, travel tips, and insider insights from The Beach Hotel, Kanyakumari.",
    url: "/blog",
    images: [{ url: "/banner/blog.webp", width: 1600, height: 900 }],
  },
};

export default async function BlogPage() {
  const { data: blogs } = await getBlogList();
  const activeBlogs = blogs.filter((b) => b.active !== false && b.is_published);

  return (
    <div>
      <CommonBanner
        title="NOTES FROM THE BEACH HOTEL"
        src="/banner/blog.webp"
        alt="Blog — Notes from The Beach Hotel, Kanyakumari"
      />
      <BlogGrid blogs={activeBlogs} />
    </div>
  );
}

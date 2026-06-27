import { BLOG_DATA } from "@/src/data/blogs";
import { notFound } from "next/navigation";
import BlogHero from "./components/BlogHero";
import BlogStatement from "./components/BlogStatement";
import BlogIntro from "./components/BlogIntro";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = BLOG_DATA.find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <div>
      <BlogHero blog={blog} />
      <BlogIntro blog={blog} />
      <BlogStatement blog={blog} />
    </div>
  );
}

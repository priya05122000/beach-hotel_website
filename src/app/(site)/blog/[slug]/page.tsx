import { getBlogBySlug } from "@/src/service/blogs";
import { notFound } from "next/navigation";
import BlogHero from "./components/BlogHero";
import BlogStatement from "./components/BlogStatement";
import BlogIntro from "./components/BlogIntro";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);

  const blog = res.data;

  return (
    <div>
      <BlogHero blog={blog} />
      <BlogIntro blog={blog} />
      <BlogStatement blog={blog} />
    </div>
  );
}

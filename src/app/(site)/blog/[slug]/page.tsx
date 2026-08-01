import type { Metadata } from "next";
import { getBlogBySlug } from "@/src/service/blogs";
import { ApiError } from "@/src/lib/api";
import { notFound } from "next/navigation";
import BlogHero from "./components/BlogHero";
import BlogStatement from "./components/BlogStatement";
import BlogIntro from "./components/BlogIntro";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getBlogBySlug(slug);
    const blog = res.data;
    const description = blog.description_1
      ? blog.description_1.replace(/<[^>]+>/g, "").slice(0, 155)
      : blog.sub_title;

    return {
      title: blog.title,
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title: blog.title,
        description,
        url: `/blog/${slug}`,
        type: "article",
        publishedTime: blog.published_at ?? undefined,
        images: blog.image_url
          ? [{ url: blog.image_url, width: 1200, height: 630, alt: blog.title }]
          : [],
      },
      twitter: { card: "summary_large_image", title: blog.title, description },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let res;
  try {
    res = await getBlogBySlug(slug);
  } catch (err) {
    // Random/scanner-bot slugs (e.g. `*.php`) hit this route constantly and
    // 404 at the backend — treat that as a normal not-found instead of an
    // unhandled server exception. Any other failure (backend down, 500s)
    // still surfaces as a real error.
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const blog = res.data;

  if (!blog) notFound();

  return (
    <div>
      <BlogHero blog={blog} />
      <BlogIntro blog={blog} />
      <BlogStatement blog={blog} />
    </div>
  );
}

import type { Metadata } from "next";
import { getBlogBySlug, getBlogList } from "@/src/service/blogs";
import { ApiError } from "@/src/lib/api";
import { notFound } from "next/navigation";
import type { Blog } from "@/src/types";
import BlogHero from "./components/BlogHero";
import BlogStatement from "./components/BlogStatement";
import BlogIntro from "./components/BlogIntro";
import RelatedBlogs from "./components/RelatedBlogs";

interface Props {
  params: Promise<{ slug: string }>;
}

const RELATED_LIMIT = 3;

// Prefer posts in the same category, then fill with the most recent of the
// rest. Current post and unpublished/inactive posts are always excluded.
function pickRelated(all: Blog[], current: Blog, limit = RELATED_LIMIT): Blog[] {
  const pool = all.filter(
    (b) => b.slug !== current.slug && b.active !== false && b.is_published
  );

  const byDateDesc = (a: Blog, b: Blog) =>
    new Date(b.published_at ?? b.created_at ?? 0).getTime() -
    new Date(a.published_at ?? a.created_at ?? 0).getTime();

  const sameCategory = pool.filter(
    (b) => !!current.category_id && b.category_id === current.category_id
  );
  const rest = pool.filter(
    (b) => !current.category_id || b.category_id !== current.category_id
  );

  return [...sameCategory.sort(byDateDesc), ...rest.sort(byDateDesc)].slice(
    0,
    limit
  );
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

  // Kick off the list fetch in parallel; a failure here must not break the
  // article page, so the related section just renders nothing.
  const relatedPoolPromise = getBlogList()
    .then((r) => r.data)
    .catch(() => [] as Blog[]);

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

  const relatedBlogs = pickRelated(await relatedPoolPromise, blog);

  return (
    <div>
      <BlogHero blog={blog} />
      <BlogIntro blog={blog} />
      <BlogStatement blog={blog} />
      <RelatedBlogs blogs={relatedBlogs} />
    </div>
  );
}

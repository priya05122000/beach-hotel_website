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
    // Meta description = the admin-entered meta description only (required
    // in the CMS).
    const description = blog.meta_description?.trim() || undefined;
    // image_url is a path on the API's uploads dir (e.g. "images/foo.png").
    // It must be made absolute here, otherwise Next resolves it against
    // metadataBase (the website domain), where the file doesn't exist.
    const ogImage = blog.image_url
      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url.replace(/^\/+/, "")}`
      : undefined;
    // CMS titles can carry double/trailing spaces.
    const title = blog.title.replace(/\s+/g, " ").trim();
    // The layout template adds " | The Beach Bay" (16 chars), which pushed
    // 60-char CMS titles over 60 ("Page Titles: Over 60 Characters").
    // Keep the suffix only when the full title still fits in 60.
    const SUFFIX = " | The Beach Bay";
    const pageTitle =
      title.length + SUFFIX.length <= 60 ? `${title}${SUFFIX}` : title;

    return {
      title: { absolute: pageTitle },
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `/blog/${slug}`,
        type: "article",
        publishedTime: blog.published_at ?? undefined,
        images: ogImage
          ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
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

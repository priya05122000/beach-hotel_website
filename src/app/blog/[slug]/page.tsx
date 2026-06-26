import { BLOG_DATA } from "@/src/data/blogs";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = BLOG_DATA.find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <div className="pt-20 md:pt-24">
      <p>{blog.title}</p>
    </div>
  );
}

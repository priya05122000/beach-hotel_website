import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/src/types";
import { Button } from "@/src/components/common/button";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  const date = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${blog.slug}`} className="block overflow-hidden">
        <div className="relative w-full h-90 xl:h-100 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
            alt={blog.title}
            fill
            unoptimized
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="pt-5 flex flex-col flex-1">
        {date && (
          <div className="text-gray text-xs font-arizona-sans-regular tracking-widest uppercase mb-2">
            {date}
          </div>
        )}

        <Link href={`/blog/${blog.slug}`}>
          <h3 className="font-arizona-flare-regular text-foreground leading-snug mb-2 hover:text-primary-dark transition-colors">
            {blog.title}
          </h3>
        </Link>

        <div
          className="text-gray text-sm leading-relaxed mb-5 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.description_1 }}
        />

        {/* <Link
          href={`/blog/${blog.slug}`}
          className="group/link mt-auto inline-flex items-center gap-3 text-xs font-arizona-sans-regular text-foreground uppercase tracking-widest"
        >
          <span className="font-semibold">More Details</span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link> */}
        <Button href={`/blog/${blog.slug}`} className="mt-auto text-[13px] text-primary font-semibold hover:text-primary/80">
          More Details
        </Button>
      </div>
    </article>
  );
}

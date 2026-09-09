import Link from "next/link";
import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";

interface Props {
  blogs: Blog[];
}

export default function RelatedBlogs({ blogs }: Props) {
  if (!blogs.length) return null;

  return (
    <Section className="py-16 md:py-20 border-t border-silver">
      <div className="type-h2 mb-4 font-semibold text-primary-dark  ">Related Articles</div>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blog/${blog.slug}`}
              className="block py-2 type-h6 text-primary-dark leading-snug transition-colors hover:text-primary underline underline-offset-4"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
  blogs: Blog[];
}

export default function RelatedBlogs({ blogs }: Props) {
  if (!blogs.length) return null;

  return (
    <Section className="  ">
      <div className="py-16 md:py-20 sm:text-right">
        <div className="type-h2 mb-4 font-semibold text-primary-dark">
          Related Articles
        </div>

        <ul className="flex flex-col sm:items-end">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                href={`/blog/${blog.slug}`}
                className="group/link flex items-center gap-3 py-2 type-h6 leading-snug underline underline-offset-4 transition-colors duration-300 text-gray decoration-silver hover:text-primary-dark hover:decoration-primary-dark sm:justify-end"
              >
                {blog.title}
                {/* <ArrowLeft
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform duration-300 group-hover/link:-translate-x-1"
                /> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

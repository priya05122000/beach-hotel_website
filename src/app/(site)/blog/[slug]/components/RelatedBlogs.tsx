import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";

interface Props {
  blogs: Blog[];
}

export default function RelatedBlogs({ blogs }: Props) {
  if (!blogs.length) return null;

  return (
    <Section className="  ">
      <div className=" py-16 md:py-20 border-t border-silver">
        <div className="type-h2 mb-4 font-semibold text-primary-dark  ">
          Related Articles
        </div>

        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                href={`/blog/${blog.slug}`}
                className="group/link flex items-center gap-3 py-2 type-h6 text-primary-dark leading-snug transition-colors hover:text-primary underline underline-offset-4"
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform duration-300 group-hover/link:translate-x-1"
                />
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

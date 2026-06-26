import type { Blog } from "@/src/types";
import BlogCard from "./BlogCard";
import Section from "@/src/components/common/Section";

interface Props {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: Props) {
  return (
    <Section className="py-16 lg:py-20">
      {/* Heading row */}
      <div className="flex items-end justify-between mb-10 lg:mb-14 border-b border-silver pb-6">
        <h2 className="font-arizona-flare-regular font-normal text-primary uppercase">
          Latest Articles
        </h2>
        <p className="text-gray text-sm font-arizona-sans-regular tracking-widest uppercase hidden sm:block">
          {blogs.length} Articles
        </p>
      </div>

      {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </Section>
  );
}

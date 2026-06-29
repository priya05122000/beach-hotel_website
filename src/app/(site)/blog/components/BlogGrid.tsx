import type { Blog } from "@/src/types";
import BlogCard from "./BlogCard";
import Section from "@/src/components/common/Section";

interface Props {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: Props) {
  return (
    <Section className="py-16 lg:py-20">
      {/* <div className="flex items-end justify-between mb-10 lg:mb-14 border-b border-silver pb-6">
        <h2 className="font-arizona-flare-regular font-normal text-primary-dark uppercase">
          Latest Articles
        </h2>
        <p className="text-gray text-sm font-arizona-sans-regular tracking-widest uppercase hidden sm:block">
          {blogs.length} Articles
        </p>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </Section>
  );
}

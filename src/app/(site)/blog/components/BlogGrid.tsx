import type { Blog } from "@/src/types";
import BlogCard from "./BlogCard";

interface Props {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pt-16 lg:pt-20">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

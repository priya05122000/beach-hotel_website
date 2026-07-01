import type { Blog } from "@/src/types";
import BlogCard from "./BlogCard";
import Section from "@/src/components/common/Section";
import { Sparkle } from "lucide-react";

interface Props {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: Props) {
  return (

    <Section className="py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver pb-10 pt-16 lg:py-20">
        {/* <Sparkle size={10} fill="#012644" className="" />{" "} */}
        <h2 className="type-h6 tracking-[73%] text-center sm:text-left lg:tracking-[83%] uppercase">Blogs</h2>
        <div className="type-body-xl text-charcoal lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 leading-relaxed">
          There is a story in every corner of this remarkable land, and our
          journal is where we tell them. Wander through insider guides to
          Kanyakumari's coast and countryside, seasonal highlights, and tales
          from within the walls of The Beach Hotel. We hope these pages inspire
          you — to explore further, to savour deeper, and to dream of the sea.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </Section>
  );
}

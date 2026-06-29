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
      <div className="grid sm:grid-cols-[0.5fr_1fr] pb-10">
        <div className="text-primary-darkflex gap-3 items-center mb-4 sm:mb-0 sm:h-25">
          <Sparkle size={10} fill="#012644" className="" /> <p>Blogs</p>
        </div>
        <div className="text-xl text-primary-darkfont-arizona-flare-regular lg:max-w-md xl:max-w-150 tracking-wide leading-relaxed">
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

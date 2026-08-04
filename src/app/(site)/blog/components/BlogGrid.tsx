import type { Blog } from "@/src/types";
import BlogCard from "./BlogCard";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";

interface Props {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: Props) {
  return (

    <Section className="py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver py-16 lg:py-20">
        {/* <Sparkle size={10} fill="#012644" className="" />{" "} */}
        {/* h2 (not the default p) — BlogCard's per-post titles below are
            h3, so this needs to be a real heading or the outline jumps
            straight from h1 to h3 ("H2: Non-Sequential"). */}
        <Eyebrow as="h2" align="responsive">Blogs</Eyebrow>

        {/* Desktop — uppercase, wide-tracking heading style */}
        <div className="hidden lg:block uppercase type-h6 text-primary-dark lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 tracking-[0.2rem] leading-8">
          There is a story in every corner of this remarkable land, and our
          journal is where we tell them. Wander through insider guides to
          Kanyakumari&apos;s coast and countryside, seasonal highlights, and tales
          from within the walls of The Beach Hotel. We hope these pages inspire
          you to look further, savour deeper, and dream of the sea.
        </div>

        {/* Mobile/tablet — plain body-text style, easier to read at small sizes */}
        <p className="lg:hidden text-xl text-charcoal type-body-xl mt-10 sm:mt-0 leading-relaxed">
          There is a story in every corner of this remarkable land, and our
          journal is where we tell them. Wander through insider guides to
          Kanyakumari&apos;s coast and countryside, seasonal highlights, and tales
          from within the walls of The Beach Hotel. We hope these pages inspire
          you to look further, savour deeper, and dream of the sea.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pt-16 lg:pt-20">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </Section>
  );
}

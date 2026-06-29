import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
  blog: Blog;
}

export default function BlogStatement({ blog }: Props) {
  return (
    <Section className="py-16 md:py-20">
      <div className="flex flex-col justify-between">
        <div className="w-full md:w-[70%] lg:w-[62%] mt-auto">
          <h2
            className="type-display-xl leading-none tracking-tight"
          >
            {blog.title}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-10 mt-10 lg:mt-20 pt-5 md:pt-5 border-t border-silver">
          <div className="hidden sm:block" />
          <div
            className="text-charcoal type-body leading-relaxed sm:text-right"
            dangerouslySetInnerHTML={{ __html: blog.description_3 }}
          />
        </div>
      </div>
    </Section>
  );
}

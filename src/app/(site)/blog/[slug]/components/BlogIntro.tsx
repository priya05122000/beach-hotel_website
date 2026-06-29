import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
  blog: Blog;
}

export default function BlogIntro({ blog }: Props) {
  return (
    <Section className="pt-16 lg:pt-20">
      <div className="border-b border-silver pb-10">
        <div className="pt-1 pr-20 float-left">
          <p className="text-gray type-overline font-arizona-sans-regular tracking-[0.25em] ">
            {blog.tag_1 ?? "Article"}
          </p>
        </div>

        <div>
          <h3
            className="type-h2  text-primary-dark leading-snug"
          >
            {blog.sub_title}
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-[0.8fr_1fr] pt-10 gap-3">
        <p className="text-gray tracking-[0.25em] type-body uppercase ">{blog.tag_2}</p>
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="blog-content text-charcoal leading-snug max-w-md" dangerouslySetInnerHTML={{ __html: blog.description_1 }} />
          <div className="border-t border-silver" />
          <div className="blog-content text-charcoal leading-snug pt-5 max-w-md" dangerouslySetInnerHTML={{ __html: blog.description_2 }} />
        </div>
      </div>
    </Section>
  );
}

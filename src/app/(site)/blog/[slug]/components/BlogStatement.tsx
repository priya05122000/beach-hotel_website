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
            className="font-arizona-flare-regular font-normal text-foreground leading-none tracking-tight"
            style={{ fontSize: "clamp(36px, 6.5vw, 96px)" }}
          >
            {blog.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:gap-10 mt-10 lg:mt-20 pt-5 md:pt-5 border-t border-silver">
          <div />

          <div
            className="text-primary-dark text-sm font-arizona-flare-regular leading-relaxed sm:text-right"
            dangerouslySetInnerHTML={{ __html: blog.description_3 }}
          />
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";
import { applySlideUp } from "@/src/lib/gsap/useSlideUp";

interface Props {
  blog: Blog;
}

export default function BlogStatement({ blog }: Props) {
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    applySlideUp([titleRef.current], { trigger: titleWrapperRef.current, start: "top 80%", toggleActions: "play reverse play reverse" });
  }, []);

  return (
    <Section className="py-16 md:py-20">
      <div className="flex flex-col justify-between">
        <div ref={titleWrapperRef} className="w-full md:w-[70%] lg:w-[62%] mt-auto">
          <div className="overflow-hidden">
            <h2
              ref={titleRef}
              className="type-display-xl leading-none tracking-tight"
            >
              {blog.title}
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-10 mt-10 lg:mt-20 pt-5 md:pt-5 border-t border-silver">
          <div className="hidden sm:block" />
          <div
            className="blog-content text-charcoal leading-relaxed sm:text-right"
            dangerouslySetInnerHTML={{ __html: blog.description_3 }}
          />
        </div>
      </div>
    </Section>
  );
}

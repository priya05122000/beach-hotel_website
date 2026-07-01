"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

interface Props {
  blog: Blog;
}

export default function BlogIntro({ blog }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const split = applySplitSlideUp({
        target: titleRef.current,
        trigger: wrapperRef.current,
        start: "top 85%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
      });

      return () => split?.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section className="pt-16 lg:pt-20">
      <div className="border-b border-silver pb-10">
        <div className="pt-1 pr-20 sm:float-left">
          <p className="text-gray type-overline font-arizona-sans-regular tracking-[0.25em] mb-3 sm:mb-0">
            {blog.tag_1 ?? "Article"}
          </p>
        </div>

        <div ref={wrapperRef}>
          <h3
            ref={titleRef}
            className="type-h2 text-primary-dark leading-snug"
          >
            {blog.sub_title}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] pt-10 gap-y-6 gap-x-3">
        <p className="text-gray tracking-[0.25em] type-body uppercase">{blog.tag_2}</p>
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="blog-content text-charcoal leading-snug max-w-md" dangerouslySetInnerHTML={{ __html: blog.description_1 }} />
          <div className="border-t border-silver" />
          <div className="blog-content text-charcoal leading-snug pt-5 max-w-md" dangerouslySetInnerHTML={{ __html: blog.description_2 }} />
        </div>
      </div>
    </Section>
  );
}

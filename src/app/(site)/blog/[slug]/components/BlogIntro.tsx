"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";
import { ANIM, prefersReducedMotion } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

interface Props {
  blog: Blog;
}

export default function BlogIntro({ blog }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = prefersReducedMotion();

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
        <div>
          <p className="text-gray type-overline font-arizona-sans-regular tracking-[0.25em] mb-3">
            {blog.tag_1 ?? "Article"}
          </p>
        </div>

        <div ref={wrapperRef} className="">
          {/* The page's only <h1>. Must stay before the article HTML below,
              which contains <h2>s, so the h1 is the first heading on the page
              ("H1: Non-Sequential" in SEO audits). */}
          <h1
            ref={titleRef}
            className="type-h2 text-primary-dark leading-snug"
          >
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] py-16 sm:py-20 gap-y-6 gap-x-3">
        <Eyebrow className="max-w-md">{blog.tag_2}</Eyebrow>
        <div className="flex flex-col ">
          <div className="blog-content text-charcoal leading-snug " dangerouslySetInnerHTML={{ __html: blog.description_1 }} />
          <div className="border-t mt-8 border-silver" />
          <div className="blog-content text-charcoal leading-snug " dangerouslySetInnerHTML={{ __html: blog.description_2 }} />
        </div>
      </div>
    </Section>
  );
}

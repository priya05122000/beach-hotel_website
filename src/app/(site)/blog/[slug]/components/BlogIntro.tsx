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
  const titleRef = useRef<HTMLParagraphElement>(null);

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
      <div className="border-b border-silver pb-10 sm:flex sm:items-end sm:gap-x-6">
        <div className="sm:pb-1">
          <p className="text-gray type-overline font-arizona-sans-regular tracking-[0.25em] mb-3 sm:mb-0 whitespace-nowrap">
            {blog.tag_1 ?? "Article"}
          </p>
        </div>

        <div ref={wrapperRef} className="">
          {/* Lede/tagline, not a real section heading — the page's actual
              <h1> (blog.title) renders later in BlogStatement, so this must
              not be a heading tag or it would appear before the h1 in DOM
              order ("H1: Non-Sequential" in SEO audits). */}
          <p
            ref={titleRef}
            className="type-h2 text-primary-dark leading-snug"
          >
            {blog.sub_title}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 py-16 sm:py-20 gap-y-6 gap-x-3">
        <Eyebrow className="max-w-md">{blog.tag_2}</Eyebrow>
        <div className="flex flex-col ">
          <div className="blog-content text-charcoal leading-snug max-w-xl" dangerouslySetInnerHTML={{ __html: blog.description_1 }} />
          <div className="border-t mt-8 border-silver" />
          <div className="blog-content text-charcoal leading-snug max-w-xl" dangerouslySetInnerHTML={{ __html: blog.description_2 }} />
        </div>
      </div>
    </Section>
  );
}

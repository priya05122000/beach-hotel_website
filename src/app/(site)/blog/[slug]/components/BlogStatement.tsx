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

export default function BlogStatement({ blog }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const split = applySplitSlideUp({
        target: titleRef.current,
        trigger: sectionRef.current,
        start: "top 85%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
      });

      return () => split?.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-16 md:py-20">
      <div ref={sectionRef} className="flex flex-col justify-between">
        <div className="w-full md:w-[70%] lg:w-[62%] mt-auto">
          <h2
            ref={titleRef}
            className="type-display-xl leading-none tracking-tight"
          >
            {blog.title}
          </h2>
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

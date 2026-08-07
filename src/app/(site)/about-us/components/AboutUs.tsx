"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/src/components/common/button";
import { ANIM, prefersReducedMotion } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

const AboutUs = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (!prefersReduced) {
        const splitTitle = applySplitSlideUp({
          target: titleRef.current,
          trigger: sectionRef.current,
          start: "top 80%",
          duration: ANIM.duration.slow,
          stagger: ANIM.stagger.base,
          ease: ANIM.ease.default,
        });

        const splitSub = applySplitSlideUp({
          target: subtitleRef.current,
          trigger: subtitleRef.current,
          start: "top 70%",
          duration: ANIM.duration.base,
          stagger: ANIM.stagger.tight,
          ease: ANIM.ease.default,
        });

        return () => {
          splitTitle?.revert();
          splitSub?.revert();
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToStory = () => {
    const target = document.getElementById("our-story");
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.8 });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden h-[160vh] sm:h-[200vh]">
      {/* Parallax video */}
      <div
        ref={bgRef}
        className="absolute"
        style={{ inset: "-10% 0", willChange: "transform" }}
      >
        <video
          src="/home/seaview.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* First panel — left content */}
      <div
        id="our-story"
        className="absolute inset-x-0 top-0 z-10 flex flex-col justify-end px-8 lg:px-16 pb-16 lg:pb-20 h-[75vh] sm:h-screen"
      >
        <h1 ref={titleRef} className="text-white type-display-2xl leading-none">
          Where Every<br />Wave Tells<br />Our Story
        </h1>
        {/* <p className="text-white/50 type-body uppercase mt-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-white/40" />
          Scroll to explore
        </p> */}

        <Button href="/blog" className="sm:w-60 mt-8 pointer-events-auto whitespace-nowrap font-normal text-white cursor-pointer">
          Explore the Journal
        </Button>
      </div>

      {/* Second panel — right content */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-end px-8 lg:px-16 h-[75vh] sm:h-screen"
      >
        <div className="max-w-lg flex flex-col gap-6">
          <h2 ref={subtitleRef} className="text-white type-display-sm leading-tight">
            We believe the sea has a story to tell — and every stay brings you closer to it.
          </h2>
          <p className="text-white/55 type-body leading-relaxed">
            Set at the tip of India where three oceans meet, The Beach Hotel was born
            from a simple dream: to let every guest wake up to the sound of waves and fall
            asleep under a sky full of stars.
          </p>
          {/* <Button href="/contact-us" className="text-accent text-[12px] tracking-[0.22em] font-semibold">
            Our Story
          </Button> */}

          <Button action={scrollToStory} className="self-end sm:w-50 pointer-events-auto whitespace-nowrap font-normal text-white cursor-pointer">
            Our Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

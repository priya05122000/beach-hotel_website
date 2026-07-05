"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import { Button } from "@/src/components/common/button";

gsap.registerPlugin(ScrollTrigger);

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

interface Props {
  items: ShowcaseItem[];
}

export default function RoomShowcaseSectionClient({ items }: Props) {
  const N = items.length;

  const sectionRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([]);
  const thumbWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const rightWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || N === 0) return;

    let ctx: gsap.Context | undefined;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        rightWrapRefs.current.forEach((el, i) => {
          if (el) el.style.zIndex = String(N - i);
        });

        thumbWrapRefs.current.forEach((el, i) => {
          if (el) el.style.zIndex = String(N - i);
        });

        bgWrapRefs.current.forEach((el, i) => {
          if (el) el.style.zIndex = String(N - i);
        });

        const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
        const thumbImgs = thumbRefs.current.filter(Boolean) as HTMLImageElement[];
        const rightImgs = rightImgRefs.current.filter(Boolean) as HTMLImageElement[];

        gsap.set(texts[0], { autoAlpha: 1, y: 0 });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });

        gsap.set([...rightImgs, ...thumbImgs], {
          clipPath: "inset(0% 0% 0% 0%)",
          objectPosition: "0px 0%",
        });

        const holdDur = 1.4;
        const td = 0.6;

        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${N * window.innerHeight}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressFillRef.current) {
                gsap.set(progressFillRef.current, {
                  scaleY: self.progress,
                  transformOrigin: "top center",
                });
              }
            },
          },
        });

        for (let i = 0; i < N - 1; i++) {
          tl.to({}, { duration: holdDur });

          const label = `t${i}`;
          tl.addLabel(label, ">");

          tl.to(
            rightImgs[i],
            {
              clipPath: "inset(0% 0% 100% 0%)",
              objectPosition: "0px 60%",
              duration: td,
              ease: "none",
            },
            label
          );

          tl.to(
            rightImgs[i + 1],
            {
              objectPosition: "0px 40%",
              duration: td,
              ease: "none",
            },
            label
          );

          tl.to(
            thumbImgs[i],
            {
              clipPath: "inset(0% 0% 100% 0%)",
              objectPosition: "0px 60%",
              duration: td,
              ease: "none",
            },
            label
          );

          tl.to(
            thumbImgs[i + 1],
            {
              objectPosition: "0px 40%",
              duration: td,
              ease: "none",
            },
            label
          );

          tl.to(
            texts[i],
            {
              autoAlpha: 0,
              y: -30,
              duration: td * 0.5,
              ease: "power2.inOut",
            },
            label
          );

          tl.fromTo(
            texts[i + 1],
            {
              autoAlpha: 0,
              y: 40,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: td * 0.6,
              ease: "power3.out",
            },
            `${label}+=${td * 0.5}`
          );

          const bgWraps = bgWrapRefs.current.filter(Boolean) as HTMLDivElement[];

          tl.to(
            bgWraps[i],
            {
              autoAlpha: 0,
              duration: td,
              ease: "power2.inOut",
            },
            label
          );
        }

        tl.to({}, { duration: holdDur });

        ScrollTrigger.refresh();
      }, section);
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [N]);

  if (N === 0) return null;

  return (
    <Section className="relative">
      <div ref={sectionRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-x-0 top-16 lg:top-20 bottom-16 lg:bottom-20 overflow-hidden">
          {/* Right Image Stack */}
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                rightWrapRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <img
                ref={(el) => {
                  rightImgRefs.current[i] = el;
                }}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Left Blur Panel */}
          <div className="absolute left-6 top-6 bottom-6 right-6 sm:right-auto sm:w-[65%] md:w-[55%] lg:w-[48%] xl:w-1/3 z-20 flex items-center">
            <div className="relative h-full w-full max-w-xl overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 backdrop-blur-xl" />

              <div className="relative z-10 flex h-full flex-col justify-center p-6 md:p-8">
                {/* Text */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-64 xl:h-62.5">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      ref={(el) => {
                        textRefs.current[i] = el;
                      }}
                      className="absolute inset-0"
                      style={{
                        visibility: i === 0 ? "visible" : "hidden",
                        opacity: i === 0 ? 1 : 0,
                      }}
                    >
                      <h2 className="type-h1 tracking-wider leading-tight text-white">
                        {item.title}
                      </h2>

                      <p className="mt-2 mb-8 type-body text-white line-clamp-4 md:line-clamp-none">
                        {item.description}
                      </p>
                      {/*
                      <Link
                        href={item.href ?? "/facilities"}
                        className="inline-flex py-2 font-medium text-white underline-offset-4 hover:underline"
                      >
                        Explore
                      </Link> */}

                      <Button
                        href={item.href ?? "/facilities"}
                        className="cursor-pointer text-white w-40    whitespace-nowrap"
                      >
                        explore
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Thumbnail */}
                <div className="relative mt-6 md:mt-10 w-full sm:w-44 md:w-52 h-28 md:h-36 overflow-hidden">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      ref={(el) => {
                        thumbWrapRefs.current[i] = el;
                      }}
                      className="absolute inset-0"
                    >
                      <img
                        ref={(el) => {
                          thumbRefs.current[i] = el;
                        }}
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
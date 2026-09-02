"use client";

import { useRef } from "react";
import Image from "next/image";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Section from "@/src/components/common/Section";
import { Button } from "@/src/components/common/button";

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

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || N === 0) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {

      rightWrapRefs.current.forEach((el, i) => {
        if (el) el.style.zIndex = String(N - i);
      });

      thumbWrapRefs.current.forEach((el, i) => {
        if (el) el.style.zIndex = String(N - i);
      });


      // Index directly into the ref arrays (not a `.filter(Boolean)`
      // result) so `texts[i]`/`rightImgs[i]`/`thumbImgs[i]` always line up
      // with `items[i]` — filtering first shifts every later index out of
      // alignment the moment any single ref is missing, which is what was
      // producing the flood of "GSAP target null not found" warnings.
      const firstText = textRefs.current[0];
      if (firstText) gsap.set(firstText, { autoAlpha: 1, y: 0 });

      const restTexts = textRefs.current.slice(1).filter(Boolean) as HTMLDivElement[];
      if (restTexts.length) gsap.set(restTexts, { autoAlpha: 0, y: 40 });

      const allImgs = [...rightImgRefs.current, ...thumbRefs.current].filter(Boolean) as HTMLImageElement[];
      if (allImgs.length) {
        gsap.set(allImgs, {
          clipPath: "inset(0% 0% 0% 0%)",
          objectPosition: "0px 0%",
        });
      }

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

        const rightCurrent = rightImgRefs.current[i];
        const rightNext = rightImgRefs.current[i + 1];
        const thumbCurrent = thumbRefs.current[i];
        const thumbNext = thumbRefs.current[i + 1];
        const textCurrent = textRefs.current[i];
        const textNext = textRefs.current[i + 1];

        if (rightCurrent) {
          tl.to(
            rightCurrent,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              objectPosition: "0px 60%",
              duration: td,
              ease: "none",
            },
            label
          );
        }

        if (rightNext) {
          tl.to(
            rightNext,
            {
              objectPosition: "0px 40%",
              duration: td,
              ease: "none",
            },
            label
          );
        }

        if (thumbCurrent) {
          tl.to(
            thumbCurrent,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              objectPosition: "0px 60%",
              duration: td,
              ease: "none",
            },
            label
          );
        }

        if (thumbNext) {
          tl.to(
            thumbNext,
            {
              objectPosition: "0px 40%",
              duration: td,
              ease: "none",
            },
            label
          );
        }

        if (textCurrent) {
          tl.to(
            textCurrent,
            {
              autoAlpha: 0,
              y: -30,
              duration: td * 0.5,
              ease: "power2.inOut",
            },
            label
          );
        }

        if (textNext) {
          tl.fromTo(
            textNext,
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
        }
      }

      tl.to({}, { duration: holdDur });

      // ScrollTrigger.refresh();
      }, section);
    })();


    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [N]);

  if (N === 0) return null;

  return (
    <Section className="relative">
      {/* Visually hidden — this section has no visible heading of its own
          in the design, but the per-item titles below are h3, so this needs
          to be a real heading or the outline jumps from h1 to h3. */}
      <h2 className="sr-only">Featured Facilities</h2>
      <div ref={sectionRef} className="relative  h-screen overflow-hidden">
        {/* Always visible, independent of which slide is active */}
        <div className="absolute bottom-6 right-0 lg:bottom-10  z-30">
          <Button href="/facilities" className="sm:w-50  whitespace-nowrap font-normal text-black cursor-pointer">
            View All
          </Button>
        </div>

        <div className="absolute inset-x-0 top-16  lg:top-20 bottom-16 lg:bottom-20 overflow-hidden">
          {/* Right Image Stack */}
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                rightWrapRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                ref={(el) => {
                  rightImgRefs.current[i] = el;
                }}
                src={item.image}
                alt={item.title}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Left Blur Panel */}
          <div className="absolute  left-6 top-6 bottom-6 right-6 sm:right-auto sm:w-[65%] md:w-[55%] lg:w-[48%] xl:w-1/3 z-20 flex items-center">
            <div className="relative  h-full w-full max-w-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-primary/10 backdrop-blur-xl transform-gpu"
                style={{ WebkitBackdropFilter: "blur(24px)", backdropFilter: "blur(24px)" }}
              />

              <div className="relative  z-10 flex h-full flex-col justify-center p-6 md:p-8 ">
                {/* Text */}
                <div className="relative  h-64 md:h-72 lg:h-64 xl:h-62.5">
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
                      <h3 className="type-h1 tracking-wider leading-tight text-white">
                        {item.title}
                      </h3>

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



                      <Button href={item.href ?? "/facilities"} className="sm:w-50  whitespace-nowrap font-normal text-white cursor-pointer">
                        Explore<span className="sr-only"> {item.title}</span>
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
                      <Image
                        ref={(el) => {
                          thumbRefs.current[i] = el;
                        }}
                        src={item.image}
                        alt={item.title}
                        fill
                        loading={i === 0 ? "eager" : "lazy"}
                        sizes="(min-width: 768px) 208px, (min-width: 640px) 176px, 60vw"
                        className="object-cover"
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
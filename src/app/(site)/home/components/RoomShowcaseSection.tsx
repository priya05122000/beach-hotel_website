"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import { Button } from "@/src/components/common/button";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "restaurant",
    title: "Restaurant",
    description:
      "Savour world-class cuisine crafted by our award-winning chefs. From candlelit dinners overlooking the ocean to vibrant open-air brunches, every meal is a curated experience.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  },
  {
    id: "resort",
    title: "Luxury Resort",
    description:
      "Immerse yourself in an oasis of refined elegance. Our resort seamlessly blends contemporary design with natural surroundings, offering an unrivalled escape for the discerning traveller.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  },
  {
    id: "pool",
    title: "Infinity Pool",
    description:
      "Drift into serenity in our signature infinity pool, where sky and sea merge at the horizon. Enjoy poolside cocktails, private cabanas, and breathtaking panoramic views.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
  },
  {
    id: "spa",
    title: "Spa & Wellness",
    description:
      "Surrender to total well-being at our sanctuary spa. Ancient healing rituals meet modern therapies, guiding you to deep restoration of body, mind, and spirit.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
  },
];

const N = items.length;

export default function RoomShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([]);
  const thumbWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const rightWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Z-index: item 0 on top for all image stacks
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

    // Initial state: first item visible, rest hidden
    gsap.set(texts[0], { autoAlpha: 1, y: 0 });
    gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });
    gsap.set([...rightImgs, ...thumbImgs], {
      clipPath: "inset(0% 0% 0% 0%)",
      objectPosition: "0px 0%",
    });

    const holdDur = 1.4;
    const td = 0.6;

    if (progressFillRef.current) {
      gsap.set(progressFillRef.current, { scaleY: 0, transformOrigin: "top center" });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${N * window.innerHeight}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, { scaleY: self.progress, transformOrigin: "top center" });
          }
        },
      },
    });

    for (let i = 0; i < N - 1; i++) {
      // Hold on current item
      tl.to({}, { duration: holdDur });

      const label = `t${i}`;
      tl.addLabel(label, ">");

      // Right image: clip away upward + pan
      tl.to(rightImgs[i], { clipPath: "inset(0% 0% 100% 0%)", objectPosition: "0px 60%", duration: td, ease: "none" }, label);
      tl.to(rightImgs[i + 1], { objectPosition: "0px 40%", duration: td, ease: "none" }, label);

      // Thumbnail: identical reveal in sync with right image
      tl.to(thumbImgs[i], { clipPath: "inset(0% 0% 100% 0%)", objectPosition: "0px 60%", duration: td, ease: "none" }, label);
      tl.to(thumbImgs[i + 1], { objectPosition: "0px 40%", duration: td, ease: "none" }, label);

      // Text: current fades out upward, next fades in from below
      tl.to(texts[i], { autoAlpha: 0, y: -30, duration: td * 0.5, ease: "power2.inOut" }, label);
      tl.fromTo(
        texts[i + 1],
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: td * 0.6, ease: "power3.out" },
        `${label}+=${td * 0.5}`,
      );

      // Left background: fade out current, next is already visible underneath
      const bgWraps = bgWrapRefs.current.filter(Boolean) as HTMLDivElement[];
      tl.to(bgWraps[i], { autoAlpha: 0, duration: td, ease: "power2.inOut" }, label);


    }

    // Hold on last item
    tl.to({}, { duration: holdDur });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Section className="relative">

      <div ref={sectionRef} className="relative h-screen overflow-hidden">

        {/* Image Frame */}
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
          <div className="absolute left-6 top-6 bottom-6 right-6   sm:w-1/2 xl:w-1/3 z-20 flex items-center">

            <div className="relative h-full w-full max-w-xl overflow-hidden">

              {/* Blur Background */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-center p-6 ">

                {/* Text */}
                <div className="relative h-62.5">

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
                      <h2 className="type-h1 tracking-wider text-white">
                        {item.title}
                      </h2>

                      <p className="my-2 type-body  text-white ">
                        {item.description}
                      </p>

                      <Button
                        href="#"
                        className="inline-flex py-2 font-medium text-white"
                      >
                        Explore
                      </Button>
                    </div>
                  ))}

                </div>

                {/* Thumbnail */}
                <div className="relative mt-12 w-full sm:w-56 h-36 overflow-hidden">

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

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "green",
    title: "Green Cityscape",
    description:
      "Vibrant streets with vertical gardens and solar buildings. This oasis thrives on renewable energy, smart transport, and green spaces for biodiversity.",
    linkColor: "#D5FF37",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
  },
  {
    id: "blue",
    title: "Blue Urban Oasis",
    description:
      "Avenues with azure facades and eco-structures. This hub uses clean energy, smart transit, and parks for urban wildlife.",
    linkColor: "#7DD6FF",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
  },
  {
    id: "pink",
    title: "Fluid Architecture",
    description:
      "Desert refuge with fluid architecture and glowing interiors. This sanctuary harnesses solar power, sustainable design, and natural harmony for resilient living.",
    linkColor: "#FFA0B0",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
  },
  {
    id: "orange",
    title: "Martian Arches",
    description:
      "Ethereal structures arc over tranquil waters, bathed in the glow of a setting Martian sun. This desolate beauty showcases the stark, captivating landscape of the red planet.",
    linkColor: "#FFA17B",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
  },
];

const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];
const N = items.length;

export default function RoomShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionBgRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([]);
  const thumbWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const rightWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

      // Background color shift — scoped to this section only
      tl.to(sectionBgRef.current, { backgroundColor: bgColors[i], duration: td * 1.5, ease: "power2.inOut" }, label);
    }

    // Hold on last item
    tl.to({}, { duration: holdDur });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">

      {/* Section-scoped background — color changes stay contained here */}
      <div ref={sectionBgRef} className="absolute inset-0" style={{ zIndex: 0 }} />

      {/* ── LEFT — text panels + thumbnail ───────────────────── */}
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">

        {/* Background image stack — crossfades on scroll */}
        {/* <div className="absolute inset-0">
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { bgWrapRefs.current[i] = el; }}
              className="absolute inset-0"
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover scale-110 opacity-5 backdrop-blur-2xl"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 backdrop-blur-xl bg-white/35" /> */}

        {/* Text panels — all stacked, GSAP controls visibility */}
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col justify-center px-10 lg:px-14"
            style={{ visibility: i === 0 ? "visible" : "hidden", opacity: i === 0 ? 1 : 0 }}
          >


            <h2 className="font-extrabold text-[clamp(1.8rem,3.2vw,2.6rem)] tracking-[-0.04em] leading-tight">
              {item.title}
            </h2>
            <p className="mt-3 mb-8 text-[rgba(18,18,18,0.7)] text-[clamp(0.85rem,1.1vw,1.05rem)] leading-relaxed max-w-85">
              {item.description}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 no-underline px-5 py-3.5 rounded-full text-[#121212] text-sm font-medium w-fit"
              style={{ backgroundColor: item.linkColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                <path
                  fill="#121212"
                  d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                />
              </svg>
              <span>Learn More</span>
            </a>
          </div>
        ))}

        {/* Vertical progress line */}
        <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center justify-center">
          <div className="relative h-[52%] w-px bg-black/10">
            <div
              ref={progressFillRef}
              className="absolute left-0 top-0 h-full w-full bg-black/40"
              style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
            />
            {items.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/25"
                style={{ top: `${(i / (N - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail stack — same clip-path reveal as right images */}
        <div className="absolute bottom-14 left-10 lg:left-14 w-45 h-30 lg:w-55 lg:h-37 overflow-hidden rounded-xl">
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { thumbWrapRefs.current[i] = el; }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => { thumbRefs.current[i] = el; }}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>

      {/* ── RIGHT — large image stack ─────────────────────────── */}
      <div className="absolute inset-y-0 right-0 w-[50%] overflow-hidden">
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { rightWrapRefs.current[i] = el; }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={(el) => { rightImgRefs.current[i] = el; }}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  );
}

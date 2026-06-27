"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { typography } from "@/src/lib/typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Subtitles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    number: "01",
    label: "Ocean View Suite",
    title: "Horizons Unbound",
    subtitle:
      "See the world from a new perspective. Here, the ocean meets the sky in a seamless embrace, offering a front-row seat to nature's grandeur.",
    description:
      "Perched at the confluence of three oceans, our Ocean View Suites offer an uninterrupted panorama where sea and sky dissolve into one. Floor-to-ceiling glass frames the eternal meeting of waters in an experience of rare stillness.",
    supportingImage: "/facilities/1.jpg",
    featuredImage: "/home/hero-1.webp",
  },
  {
    number: "02",
    label: "Deluxe Sea Room",
    title: "The Gentle Shore",
    subtitle:
      "Where the tide meets tranquility, our Deluxe Sea Rooms offer a serene escape.",
    description:
      "Elegantly appointed with natural textures and soft coastal hues, these rooms invite the rhythm of the tide into your everyday. Step onto your private balcony as morning light dances across the sea.",
    supportingImage: "/facilities/2.jpg",
    featuredImage: "/home/hero-2.png",
  },
  {
    number: "03",
    label: "Royal Penthouse",
    title: "Crown of Kanniyakumari",
    subtitle:
      "A sanctuary above the clouds, the Royal Penthouse commands the full sweep of the legendary three-ocean horizon.",
    description:
      "A sanctuary above the clouds, the Royal Penthouse commands the full sweep of the legendary three-ocean horizon. Private plunge pool, butler service, and a living room that opens to the endless blue.",
    supportingImage: "/facilities/3.jpg",
    featuredImage: "/home/cta.jpg",
  },
  {
    number: "04",
    label: "Signature Suite",
    title: "The Sacred Coast",
    subtitle:
      "Where ancient pilgrimage meets modern luxury, our Signature Suites blend Kanniyakumari's sacred heritage.",
    description:
      "Where ancient pilgrimage meets modern luxury — our Signature Suites blend Kanniyakumari's sacred heritage with the finest contemporary comfort for a truly unique coastal retreat.",
    supportingImage: "/facilities/4.jpg",
    featuredImage: "/home/faq.jpg",
  },
];

export default function RoomShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const supportImgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const n = rooms.length;

    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, i === 0 ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 40 });
    });

    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      });
    });

    supportImgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      });
    });

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
        end: `+=${n * window.innerHeight}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
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

    const holdDur = 1.4;
    const td = 0.6;

    for (let i = 0; i < n - 1; i++) {
      tl.to({}, { duration: holdDur });

      const tLabel = `trans${i}`;
      tl.addLabel(tLabel, ">");

      const exitDur = td * 0.5;

      // Current text: fade out + subtle upward drift
      tl.to(
        contentRefs.current[i],
        { autoAlpha: 0, y: -30, duration: exitDur, ease: "power2.inOut" },
        tLabel,
      );

      // Images wipe in with a gentle ease
      tl.fromTo(
        imgRefs.current[i + 1],
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: td, ease: "power2.inOut" },
        tLabel,
      );
      tl.fromTo(
        supportImgRefs.current[i + 1],
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: td, ease: "power2.inOut" },
        tLabel,
      );

      // New text rises in from below after exit completes
      tl.fromTo(
        contentRefs.current[i + 1],
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: td * 0.8, ease: "power3.out" },
        `${tLabel}+=${exitDur}`,
      );
    }

    tl.to({}, { duration: holdDur });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-primary"
    >
      {/* ── Featured images (right) ──────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden lg:left-[42%]">
        {rooms.map((room, i) => (
          <div
            key={room.number}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ zIndex: i + 1 }}
          >
            <Image
              src={room.featuredImage}
              alt={room.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-primary/72 lg:hidden" />
            <div className="absolute inset-y-0 left-0 hidden w-40 bg-linear-to-r from-primary to-transparent lg:block" />
          </div>
        ))}
      </div>

      {/* ── Vertical progress line (desktop) ────────────────────── */}
      <div className="absolute bottom-0 left-10 top-0 z-30 hidden flex-col items-center justify-center lg:flex">
        <div className="relative h-[52%] w-px bg-white/10">
          <div
            ref={progressFillRef}
            className="absolute left-0 top-0 h-full w-full origin-top bg-accent"
            style={{ transform: "scaleY(0)" }}
          />
          {rooms.map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 h-1.25 w-1.25 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 ring-1 ring-white/10"
              style={{ top: `${(i / (rooms.length - 1)) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* ── Text content panels (left) — fade in/out only ───────── */}
      <div className="absolute inset-0 z-20 lg:right-[58%]">
        {rooms.map((room, i) => (
          <div
            key={room.number}
            ref={(el) => {
              contentRefs.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col justify-between px-7 pt-15 pb-10 xl:pb-20 sm:px-12 lg:px-14 xl:px-16"
          >
            <div>
              <div className="flex items-baseline gap-3">
                <p className="text-xl sm:text-3xl font-medium uppercase text-accent/55">
                  {room.number}
                </p>
                <h2
                  className={`font-normal leading-[1.08] text-white ${typography.textFiXl}`}
                >
                  {room.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm max-w-xs leading-[1.75] text-white/52 lg:max-w-sm">
                {room.subtitle}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm max-w-xs leading-[1.75] text-white/52 lg:max-w-sm">
                {room.description}
              </p>
              <button className="group mt-6 flex w-fit items-center gap-3 text-[10px] font-medium uppercase tracking-[0.26em] text-white/35 transition-all duration-300 hover:text-accent">
                <span>Explore Suite</span>
                <span className="inline-block h-px w-6 bg-current transition-all duration-500 group-hover:w-11" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Supporting images (left, fixed position) ─────────────── */}
      {/* Separate layer so image position is never affected by text height */}
      <div className="absolute top-50 left-7 z-20 sm:top-70 lg:top-65 lg:left-14 xl:left-16">
        {rooms.map((room, i) => (
          <div
            key={room.number}
            className="absolute h-32 w-48 overflow-hidden  sm:h-36 sm:w-56 lg:h-40 xl:h-50 lg:w-64"
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={(el) => {
                supportImgRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={room.supportingImage}
                alt={`${room.title} interior`}
                fill
                sizes="256px"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

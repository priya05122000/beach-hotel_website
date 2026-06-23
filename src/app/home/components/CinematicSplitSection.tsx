import Image from "next/image";
import Link from "next/link";

const CLIP_STYLE = {
    backgroundImage: "url('/home/herobanner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
} as const;

const DISPLAY_SIZE = "clamp(4.5rem, 11vw, 13rem)";

export default function CinematicSplitSection() {
    return (
        <section className="relative h-screen overflow-hidden">

            {/* Background panels */}
            <div className="absolute inset-0 grid grid-cols-2">
                {/* Left — dark */}
                <div className="relative bg-[#0d0d0d]">
                    <div className="absolute inset-0 opacity-15">
                        <Image src="/home/herobanner.jpg" fill className="object-cover" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-black/75" />
                </div>

                {/* Right — full-bleed photo */}
                <div className="relative">
                    <Image src="/home/herobanner.jpg" fill className="object-cover" alt="The Beach Hotel" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
                </div>
            </div>

            {/* Full-width centered text overlay */}
            <div className="relative w-full z-10 flex h-full flex-col items-center justify-center select-none pointer-events-none">

                {/* <p className="mb-3 text-[10px] tracking-[0.4em] uppercase text-white/50">
                    Amazing Tour
                </p> */}

                {/* NOR (clipped) + WAY (white) on one line */}
                <div className="flex items-baseline leading-none">
                    <span
                        className="bg-clip-text text-transparent font-black"
                        style={{ fontSize: DISPLAY_SIZE, ...CLIP_STYLE }}
                    >
                        NOR
                    </span>
                    <span
                        className="font-black text-white"
                        style={{ fontSize: DISPLAY_SIZE }}
                    >
                        WAY
                    </span>
                </div>

                {/* MOUNTAINS — fully clipped */}
                <span
                    className="bg-clip-text  text-transparent font-black tracking-[0.15em] leading-none "
                    style={{ fontSize: "clamp(2rem, 5.5vw, 6.5rem)", ...CLIP_STYLE }}
                >
                    MOUNTAINS
                </span>

                {/* <p className="pointer-events-auto mt-8 max-w-xs text-center text-sm leading-relaxed text-white/60">
                    Travel leaves you speechless and then makes you a better storyteller.
                </p>

                <Link
                    href="/stay"
                    className="pointer-events-auto mt-5 text-[11px] tracking-[0.25em] uppercase text-white underline underline-offset-4 hover:text-accent transition-colors"
                >
                    Learn About The Beach Hotel
                </Link> */}
            </div>

        </section>
    );
}

import Image from "next/image";

const IMAGE_SRC = "/home/herobanner.webp";

const clipStyle = {
    backgroundImage: `url('${IMAGE_SRC}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
} as const;

const displaySize = "clamp(4.5rem, 11vw, 13rem)";
const subSize = "clamp(2rem, 5.5vw, 6.5rem)";

export default function CinematicSplitSection() {
    return (
        <section className="relative h-screen overflow-hidden">

            {/* Background panels */}
            <div className="absolute inset-0 grid grid-cols-2">
                <div className="relative bg-[#0d0d0d]">
                    <div className="absolute inset-0 opacity-15">
                        <Image src={IMAGE_SRC} fill className="object-cover" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-black/75" />
                </div>

                <div className="relative">
                    <Image src={IMAGE_SRC} fill className="object-cover" alt="The Beach Hotel" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
                </div>
            </div>

            {/* Centered text overlay */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center select-none pointer-events-none">

                {/* NORWAY */}
                <div className="flex items-baseline leading-none">
                    <span
                        className="bg-clip-text text-transparent font-black"
                        style={{ fontSize: displaySize, ...clipStyle }}
                    >
                        NOR
                    </span>
                    <span className="font-black text-white" style={{ fontSize: displaySize }}>
                        WAY
                    </span>
                </div>

                {/* MOUNTAINS */}
                <span
                    className="bg-clip-text text-transparent font-black tracking-[0.15em] leading-none"
                    style={{ fontSize: subSize, ...clipStyle }}
                >
                    MOUNTAINS
                </span>

            </div>

        </section>
    );
}

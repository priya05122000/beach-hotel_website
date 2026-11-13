import Image from "next/image";

export default function PageLoader() {
    return (
        <div role="status" aria-label="Loading" className="min-h-screen flex items-center justify-center bg-cream">
            {/* Served as-is so the GIF keeps its animation. */}
            <Image
                src="/the-beach-bay-loader.gif"
                alt=""
                width={426}
                height={426}
                unoptimized
                priority
                className="h-24 w-24 sm:h-32 sm:w-32"
            />
        </div>
    );
}

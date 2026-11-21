import Image from "next/image";

export default function PageLoader({ gifId }: { gifId?: string } = {}) {
    return (
        <div role="status" aria-label="Loading" className="min-h-screen flex items-center justify-center bg-white">
            {/* Served as-is so the GIF keeps its animation. */}
            <Image
                id={gifId}
                src="/the-beach-bay-loader.gif"
                alt="The Beach Bay, Kanyakumari logo animation"
                aria-hidden="true"
                width={426}
                height={426}
                unoptimized
                priority
                className="h-24 w-24 sm:h-32 sm:w-32"
            />
        </div>
    );
}

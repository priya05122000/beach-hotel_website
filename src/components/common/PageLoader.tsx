import Image from "next/image";

export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="flex flex-col items-center gap-4">
                <Image
                    src="/loader/icn_1.gif"
                    alt="Loading"
                    width={80}
                    height={80}
                    unoptimized
                    priority
                    className="w-20 h-20 object-contain"
                />
            </div>
        </div>
    );
}

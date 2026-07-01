import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
            <p className="uppercase tracking-[0.2em] text-primary-dark type-caption mb-4">
                Error 404
            </p>

            <h1 className="type-display-2xl font-normal text-primary leading-none">
                Page Not Found
            </h1>

            <p className="mt-6 max-w-md type-body text-gray">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>

            <Link
                href="/"
                className="mt-10 inline-flex items-center gap-2 bg-primary px-8 py-3 type-label uppercase tracking-widest text-white transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                Back to Home
            </Link>
        </div>
    );
}

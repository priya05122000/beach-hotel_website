"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
            <p className="uppercase tracking-[0.2em] text-primary-dark type-caption mb-4">
                Something went wrong
            </p>

            <h1 className="type-display-sm font-normal text-primary leading-tight">
                {error?.message ?? "An unexpected error occurred."}
            </h1>

            <p className="mt-6 max-w-md type-body text-gray">
                We&apos;re sorry for the inconvenience. Please try again or return to the home page.
            </p>

            <div className="mt-10 flex items-center gap-4">
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center bg-primary px-8 py-3 type-label uppercase tracking-widest text-white transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    Try Again
                </button>

                <a
                    href="/"
                    className="inline-flex items-center border border-primary px-8 py-3 type-label uppercase tracking-widest text-primary transition hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}

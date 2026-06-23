export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            <h1 className="text-8xl font-bold">404</h1>

            <h2 className="mt-4 text-2xl font-semibold">
                Page Not Found
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
                The page you are looking for doesn't exist or has been moved.
            </p>

            <a
                href="/"
                className="mt-8  bg-black px-6 py-3 text-white transition hover:opacity-90"
            >
                Back to Home
            </a>
        </div>
    );
}
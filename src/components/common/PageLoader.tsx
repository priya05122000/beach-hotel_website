export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div
                role="status"
                aria-label="Loading"
                className="h-12 w-12 animate-spin rounded-full border-4 border-primary-dark/20 border-t-primary-dark"
            />
        </div>
    );
}

export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-primary-dark/50 text-xs tracking-[0.2em] uppercase font-light">
                    Loading
                </p>
            </div>
        </div>
    );
}

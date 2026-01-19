import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="text-8xl mb-6">🔍</div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/surgeries"
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                    >
                        Browse Surgeries
                    </Link>
                </div>
            </div>
        </div>
    );
}

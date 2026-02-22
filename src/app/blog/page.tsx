import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { format } from 'date-fns';

export const metadata = {
    title: 'Medical Blog & Recovery Guides | HealthExpress India',
    description: 'Expert medical advice, surgery recovery guides, and healthcare tips from top specialists. Stay informed about your health and recovery journey.',
};

export default async function BlogPage() {
    const posts = await getSortedPostsData();

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 font-sans">Medical Insights & Recovery Guides</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Expert advice, recovery timelines, and healthcare tips to help you navigate your surgical journey with confidence.
                    </p>
                </div>

                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <article key={post.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
                                {/* Image Placeholder - In real world use next/image */}
                                <div className="aspect-video bg-teal-50 flex items-center justify-center overflow-hidden">
                                    <div className="text-4xl group-hover:scale-110 transition-transform duration-500">🏥</div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {format(new Date(post.date), 'MMM dd, yyyy')}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 italic">
                                        {post.excerpt}
                                    </p>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-700">By {post.author}</span>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-teal-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                        >
                                            Read full article
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                        <div className="text-6xl mb-6 opacity-30">📚</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Our clinical library is growing</h2>
                        <p className="text-slate-500">Check back soon for expert recovery guides and medical insights.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

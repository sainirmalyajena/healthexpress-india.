import { Star, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
    testimonial: Testimonial;
    compact?: boolean;
}

export function TestimonialCard({ testimonial, compact = false }: TestimonialCardProps) {
    if (compact) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.patientName.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="font-semibold text-gray-900 text-sm">{testimonial.patientName}</div>
                            {testimonial.verified && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        <p className="text-xs text-gray-600 line-clamp-3">{testimonial.story}</p>

                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>{testimonial.surgeryType}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {testimonial.city}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                        {testimonial.patientName.charAt(0)}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <div className="font-semibold text-gray-900">{testimonial.patientName}</div>
                            {testimonial.verified && (
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                            )}
                        </div>

                        <div className="flex items-center gap-1 mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {testimonial.date}
                </div>
            </div>

            {/* Story */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{testimonial.story}</p>

            {/* Footer */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <span className="font-medium">Procedure:</span>
                    <span>{testimonial.surgeryType}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{testimonial.city}</span>
                </div>
            </div>
        </div>
    );
}

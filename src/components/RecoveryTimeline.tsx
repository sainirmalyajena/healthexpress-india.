import { Clock, CheckCircle } from 'lucide-react';

export interface RecoveryMilestone {
    timeframe: string;
    title: string;
    description: string;
}

interface RecoveryTimelineProps {
    milestones: RecoveryMilestone[];
}

export function RecoveryTimeline({ milestones }: RecoveryTimelineProps) {
    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Recovery Timeline</h3>
            </div>

            <div className="space-y-4">
                {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                        {/* Timeline dot and line */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-400">
                                <CheckCircle className="h-4 w-4 text-purple-600" />
                            </div>
                            {index < milestones.length - 1 && <div className="w-0.5 h-full bg-purple-200 mt-1" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                                {milestone.timeframe}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 mb-1">{milestone.title}</div>
                            <div className="text-sm text-gray-600">{milestone.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-xs text-gray-500">
                    <strong>Note:</strong> Recovery times vary by individual health, age, and complications. Follow your
                    surgeon&apos;s specific instructions for optimal healing.
                </p>
            </div>
        </div>
    );
}

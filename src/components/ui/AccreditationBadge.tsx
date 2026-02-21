import { cn } from '@/lib/utils';
import { CheckCircle2, Shield, Award } from 'lucide-react';

interface AccreditationBadgeProps {
    type: 'verified' | 'nabh' | 'jci' | 'iso' | string;
    className?: string;
    showTooltip?: boolean;
}

const badgeConfig: Record<string, { icon: React.ReactNode; label: string; description: string; color: string }> = {
    verified: {
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        label: 'Verified',
        description: 'Identity and credentials verified by HealthExpress India',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    nabh: {
        icon: <Shield className="h-3.5 w-3.5" />,
        label: 'NABH',
        description: 'National Accreditation Board for Hospitals & Healthcare Providers',
        color: 'bg-green-50 text-green-700 border-green-200',
    },
    jci: {
        icon: <Award className="h-3.5 w-3.5" />,
        label: 'JCI',
        description: 'Joint Commission International - Global healthcare accreditation',
        color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    iso: {
        icon: <Award className="h-3.5 w-3.5" />,
        label: 'ISO',
        description: 'ISO 9001:2015 Quality Management System certified',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
};

export function AccreditationBadge({ type, className, showTooltip = false }: AccreditationBadgeProps) {
    const config = badgeConfig[type.toLowerCase()] || {
        icon: <Award className="h-3.5 w-3.5" />,
        label: type,
        description: type,
        color: 'bg-gray-50 text-gray-700 border-gray-200',
    };

    return (
        <div className="relative inline-flex group">
            <div
                className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded-full',
                    config.color,
                    className
                )}
            >
                {config.icon}
                <span>{config.label}</span>
            </div>
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {config.description}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                </div>
            )}
        </div>
    );
}

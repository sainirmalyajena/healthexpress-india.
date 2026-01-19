'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { leadFormSchema, LeadFormData } from '@/lib/validations';
import { Button, Input, Select, Textarea, Checkbox } from '@/components/ui';

interface LeadFormProps {
    surgeryId: string;
    surgeryName: string;
}

export function LeadForm({ surgeryId, surgeryName }: LeadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; referenceId?: string; message?: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
        mode: 'onChange',
        defaultValues: {
            surgeryId,
            surgeryName,
            insurance: undefined,
            consent: false,
        },
    });

    const onSubmit = async (data: LeadFormData) => {
        setIsSubmitting(true);
        setSubmitResult(null);

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    sourcePage: window.location.href,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitResult({ success: true, referenceId: result.referenceId });
                reset();
            } else {
                setSubmitResult({ success: false, message: result.error || 'Something went wrong' });
            }
        } catch {
            setSubmitResult({ success: false, message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitResult?.success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700 mb-4">Your inquiry has been submitted successfully.</p>
                <div className="bg-white rounded-lg p-4 inline-block">
                    <p className="text-sm text-slate-600">Your Reference ID:</p>
                    <p className="text-lg font-mono font-bold text-teal-600">{submitResult.referenceId}</p>
                </div>
                <p className="text-sm text-green-600 mt-4">
                    Our team will contact you within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {submitResult?.success === false && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {submitResult.message}
                </div>
            )}

            {/* Hidden fields */}
            <input type="hidden" {...register('surgeryId')} />
            <input type="hidden" {...register('surgeryName')} />

            {/* Honeypot field for spam protection */}
            <div className="hidden" aria-hidden="true">
                <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
            </div>

            {/* Surgery Name (readonly display) */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-sm text-teal-700">Inquiry for:</p>
                <p className="font-semibold text-teal-900">{surgeryName}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                    required
                />

                <Input
                    label="Phone Number"
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Email"
                    placeholder="your.email@example.com"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    helperText="Optional, but helps us send updates"
                />

                <Input
                    label="City"
                    placeholder="Your city"
                    {...register('city')}
                    error={errors.city?.message}
                    required
                />
            </div>

            <Textarea
                label="Describe Your Symptoms / Requirements"
                placeholder="Please describe your symptoms, medical history, or any specific requirements..."
                rows={4}
                {...register('description')}
                error={errors.description?.message}
                required
            />

            <div className="grid sm:grid-cols-2 gap-6">
                <Select
                    label="Do you have health insurance?"
                    options={[
                        { value: 'YES', label: 'Yes, I have insurance' },
                        { value: 'NO', label: 'No, I will pay directly' },
                        { value: 'NOT_SURE', label: 'Not sure / Need guidance' },
                    ]}
                    placeholder="Select an option"
                    {...register('insurance')}
                    error={errors.insurance?.message}
                    required
                />

                <Input
                    label="Preferred Callback Time"
                    placeholder="e.g., Morning 10-12 PM"
                    {...register('callbackTime')}
                    error={errors.callbackTime?.message}
                    helperText="Optional"
                />
            </div>

            <Checkbox
                label="I agree to be contacted by HealthExpress regarding my inquiry. I understand that my information will be kept confidential."
                {...register('consent')}
                error={errors.consent?.message}
            />

            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                Submit Inquiry
            </Button>

            <p className="text-xs text-center text-slate-500">
                Your information is secure and will only be used to assist with your healthcare needs.
            </p>
        </form>
    );
}

import { prisma } from '@/lib/prisma';
import { getPatientSession } from '@/lib/patient-auth';
import { redirect } from 'next/navigation';
import DocumentUpload from '@/components/patient/DocumentUpload';
import FeedbackForm from '@/components/patient/FeedbackForm';
import { formatDate } from '@/lib/utils';

export default async function PatientDashboardPage() {
    const session = await getPatientSession();

    if (!session) redirect('/patient/login');

    const lead = await prisma.lead.findUnique({
        where: { id: session.leadId },
        include: {
            surgery: true,
            hospital: true,
            documents: {
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    type: true,
                    createdAt: true
                }
            }
        }
    });

    if (!lead) redirect('/patient/login');

    // Calculate progress based on status
    const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'ASSIGNED', 'SCHEDULED', 'COMPLETED', 'CLOSED'];
    const currentStepIndex = statuses.indexOf(lead.status);

    const steps = [
        { label: 'Inquiry Received', status: 'NEW', description: 'We have received your request.' },
        { label: 'Consultation', status: 'CONTACTED', description: 'Expert consultation scheduled.' },
        { label: 'Hospital Assigned', status: 'ASSIGNED', description: lead.hospital ? `Matched with ${lead.hospital.name}` : 'Finding best hospital...' },
        { label: 'Surgery Scheduled', status: 'SCHEDULED', description: 'Date confirmed. Preparing for admission.' },
        { label: 'Recovery', status: 'COMPLETED', description: 'Surgery successful. Focus on healing.' },
    ];

    // Status-specific next steps
    const getNextSteps = () => {
        switch (lead.status) {
            case 'NEW':
                return {
                    title: 'Welcome to HealthExpress!',
                    message: 'Your care manager will call you within 2 hours to discuss your surgery requirements.',
                    icon: '👋'
                };
            case 'CONTACTED':
                return {
                    title: 'Selecting Hospitals',
                    message: 'We are vetting the best partner hospitals for your procedure based on your budget and preference.',
                    icon: '🔬'
                };
            case 'ASSIGNED':
                return {
                    title: 'Confirm Admission',
                    message: 'Please review the hospital details and confirm your preferred surgery date with your care manager.',
                    icon: '🗓️'
                };
            case 'SCHEDULED':
                return {
                    title: 'Preparation Checklist',
                    message: 'Ensure you carry your government ID and past medical reports (upload them to your vault below). Bring an attendant.',
                    icon: '📝'
                };
            case 'COMPLETED':
                return {
                    title: 'Recovering Well?',
                    message: 'Your surgery was successful. Please follow the post-operative care instructions provided by the hospital.',
                    icon: '💊'
                };
            case 'CLOSED':
                return {
                    title: 'Case Finalized',
                    message: 'Your case has been successfully closed. We hope you have a speedy and full recovery.',
                    icon: '✅'
                };
            default:
                return null;
        }
    };

    const nextStep = getNextSteps();

    return (
        <div className="space-y-8">
            {/* Next Steps Banner */}
            {nextStep && (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 flex items-start gap-4 animate-fade-in shadow-sm">
                    <span className="text-3xl">{nextStep.icon}</span>
                    <div className="flex-1">
                        <h2 className="text-teal-900 font-bold text-lg mb-1">{nextStep.title}</h2>
                        <p className="text-teal-700 text-sm md:text-base leading-relaxed">{nextStep.message}</p>
                    </div>
                </div>
            )}

            {/* Post-Op Feedback Form */}
            {lead.status === 'COMPLETED' && !lead.rating && (
                <div className="max-w-2xl mx-auto w-full">
                    <FeedbackForm />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Your Care Journey</h2>
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>

                            <div className="space-y-8 relative">
                                {steps.map((step, index) => {
                                    const stepIndex = statuses.indexOf(step.status);
                                    const isCompleted = currentStepIndex >= stepIndex;
                                    const isCurrent = lead.status === step.status;

                                    return (
                                        <div key={index} className="flex gap-4">
                                            <div className={`
                                                w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 z-10
                                                ${isCurrent ? 'bg-teal-50 border-teal-600 text-teal-600 ring-4 ring-teal-50' :
                                                    isCompleted ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-300 text-slate-300'}
                                            `}>
                                                {isCompleted && !isCurrent ? (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-xs font-bold">{index + 1}</span>
                                                )}
                                            </div>
                                            <div className="pt-1">
                                                <h3 className={`font-bold transition-colors ${isCurrent ? 'text-teal-700' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                                                    {step.label}
                                                </h3>
                                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Document Vault</h2>
                            <DocumentUpload />
                        </div>

                        {lead.documents && lead.documents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {lead.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 group hover:bg-white hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm">
                                                {doc.type === 'PDF' ? '📄' : '🖼️'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm truncate max-w-[150px]">{doc.name}</p>
                                                <p className="text-[10px] text-slate-500 font-medium">{formatDate(doc.createdAt)}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                                            Verified
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center bg-slate-50/30">
                                <div className="mx-auto w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-slate-500 font-medium">No documents uploaded yet.</p>
                                <p className="text-xs text-slate-400 mt-1">Upload reports, insurance cards, or ID proof.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="space-y-6">
                    <div className="bg-teal-900 rounded-xl p-6 text-white shadow-lg shadow-teal-900/20">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span>🏥</span> Surgery Details
                        </h3>
                        <div className="space-y-4 text-sm opacity-90">
                            <div>
                                <p className="text-teal-200 text-xs uppercase tracking-wider mb-1 font-bold">Procedure</p>
                                <p className="font-bold text-xl leading-tight">{lead.surgery.name}</p>
                            </div>
                            <div className="py-3 border-y border-white/10">
                                <p className="text-teal-200 text-xs uppercase tracking-wider mb-2 font-bold">Current Status</p>
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
                                    {lead.status.replace('_', ' ')}
                                </span>
                            </div>
                            {lead.hospital && (
                                <div>
                                    <p className="text-teal-200 text-xs uppercase tracking-wider mb-1 font-bold">Hospital</p>
                                    <p className="font-bold text-lg">{lead.hospital.name}</p>
                                    <div className="flex items-center gap-2 mt-1 text-teal-300">
                                        <span className="text-xs">📍 {lead.hospital.city}</span>
                                    </div>
                                </div>
                            )}
                            {/* Show cost only if assigned/discussed */}
                            {(lead.status === 'ASSIGNED' || lead.status === 'SCHEDULED' || lead.status === 'COMPLETED') && lead.discountedCost && (
                                <div className="pt-4 border-t border-white/20 mt-4">
                                    <p className="text-teal-200 text-xs uppercase tracking-wider mb-1 font-bold">Estimated Cost</p>
                                    <p className="font-bold text-2xl">₹ {lead.discountedCost.toLocaleString('en-IN')}</p>
                                    {lead.originalCost && lead.originalCost > lead.discountedCost && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xs text-teal-300 line-through">₹ {lead.originalCost.toLocaleString('en-IN')}</p>
                                            <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded font-bold">SAVED {Math.round((lead.originalCost - lead.discountedCost) / lead.originalCost * 100)}%</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                            Your dedicated care manager is tracking your journey and is ready to assist.
                        </p>
                        <a href="tel:9307861041" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">
                            <span>📞</span> Call Care Manager
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

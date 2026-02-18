import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';

interface ServicePathStepperProps {
  currentStep?: 'fitment' | 'shortlist' | 'partner' | 'oversight';
  compact?: boolean;
}

const steps = [
  {
    id: 'fitment',
    number: 1,
    label: 'Fitment',
    description: 'Capture workflows, integrations, constraints. Turn reality into requirements.',
    caption: "You're here — start with fitment.",
    slug: 'crm-erp-fitment'
  },
  {
    id: 'shortlist',
    number: 2,
    label: 'Shortlist + Evaluation Pack',
    description: 'Get 3–5 best-fit options with trade-offs, demo script, and scorecard.',
    caption: "You're here — evaluate options consistently.",
    slug: 'shortlist-evaluation-pack'
  },
  {
    id: 'partner',
    number: 3,
    label: 'Partner Match',
    description: 'Get introductions aligned to platform, scope, industry, and timeline.',
    caption: "You're here — choose delivery capability, not promises.",
    slug: 'implementation-partner-match'
  },
  {
    id: 'oversight',
    number: 4,
    label: 'Independent Oversight (Optional)',
    description: 'Reduce delivery risk with checkpoints, QA gates, and go-live readiness.',
    caption: "You're here — protect scope, quality, adoption.",
    slug: 'independent-oversight'
  }
];

export function ServicePathStepper({ currentStep, compact = false }: ServicePathStepperProps) {
  return (
    <Card className={compact ? '' : 'border-2'}>
      <CardContent className={compact ? 'p-6' : 'p-8'}>
        <div className="mb-8">
          <h2 className={`font-bold text-gray-900 ${compact ? 'text-xl' : 'text-2xl'} mb-2`}>
            Recommended path
          </h2>
          <p className="text-sm text-gray-600">
            Most teams start with fitment, then shortlist, then partner selection. Oversight is optional.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isPassed = currentStep && steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <div key={step.id} className="relative">
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute left-4 top-12 bottom-0 w-0.5 ${
                      isPassed ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    style={{ height: 'calc(100% + 0.5rem)' }}
                  />
                )}
                
                <div className="flex gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold ${
                    isActive 
                      ? 'bg-primary text-white ring-4 ring-primary/20' 
                      : isPassed
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isPassed ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  
                  <div className="flex-1 pb-2">
                    <Link 
                      href={`/services/${step.slug}`}
                      className="font-semibold text-gray-900 hover:text-primary transition-colors"
                    >
                      {step.label}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    {isActive && (
                      <p className="text-sm font-medium text-primary mt-2">{step.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/wizard" className="flex-1">
              <Button className="w-full">
                Start Fit Wizard
              </Button>
            </Link>
            <Link href="/book" className="flex-1">
              <Button variant="outline" className="w-full">
                Book a Fit Call
              </Button>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link href="/resources/crm-erp-selection-checklist" className="text-sm text-primary hover:underline">
              Download Checklist
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

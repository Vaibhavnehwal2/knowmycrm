"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SalesforceWebToLead } from '@/components/forms/SalesforceWebToLead';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

export default function ChecklistLandingPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Download className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                CRM/ERP Selection Checklist
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Audit your selection process with our comprehensive checklist. Covers requirements, fitment, partner evaluation, and implementation readiness.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Requirements Mapping</h3>
                  <p className="text-sm text-gray-600">
                    Capture workflows, integrations, and data rules beyond feature checklists
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Fitment Criteria</h3>
                  <p className="text-sm text-gray-600">
                    Evaluate CRM/ERP options based on your scale, complexity, and ecosystem
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Partner Due Diligence</h3>
                  <p className="text-sm text-gray-600">
                    Questions to ask implementation partners before signing contracts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Implementation Readiness</h3>
                  <p className="text-sm text-gray-600">
                    Check your org readiness for change management and adoption
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">ERP Integration Touchpoints</h3>
                  <p className="text-sm text-gray-600">
                    Map CRM-ERP integration needs to avoid post-go-live surprises
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <SalesforceWebToLead
              variant="checklist"
              title="Download Checklist"
              description="Enter your details to get the checklist sent to your email."
              submitLabel="Download Checklist"
              kmcPayload={{
                source: 'checklist',
                asset: 'crm-erp-selection-checklist',
                intent: 'download_checklist',
              }}
            />

            <div className="mt-6 text-center text-sm text-gray-600">
              Prefer to get a personalized shortlist?{' '}
              <Link href="/wizard" className="text-primary hover:underline">
                Take the Fit Wizard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

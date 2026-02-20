'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SalesforceWebToLead } from '@/components/forms/SalesforceWebToLead';
import { ContactTrustLine } from '@/components/contact-trust-line';
import { Phone, Clock, CheckCircle2 } from 'lucide-react';

export default function BookPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Copy */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Phone className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Book a Call
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Schedule a 30-minute consultation with our CRM/ERP selection experts. 
            We'll discuss your requirements and help you find the right fit.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Requirements Review</h3>
                <p className="text-sm text-gray-600">
                  We'll understand your workflows, integrations, and data needs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Fitment Guidance</h3>
                <p className="text-sm text-gray-600">
                  Get expert recommendations based on your scale and complexity
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Partner Matching</h3>
                <p className="text-sm text-gray-600">
                  We'll connect you with vetted implementation partners
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">30 Minutes</h3>
                <p className="text-sm text-gray-600">
                  Quick, focused consultation with no obligation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Prefer self-service?</strong> Try our{' '}
              <Link href="/wizard" className="underline hover:text-blue-900">
                Fit Wizard
              </Link>{' '}
              for instant recommendations.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <SalesforceWebToLead
            variant="book"
            title="Schedule Your Call"
            description="Select your preferred date and time slot."
            kmcPayload={{
              source: 'book',
              intent: 'consultation',
            }}
          />
          {/* Trust line */}
          <div className="mt-6">
            <ContactTrustLine />
          </div>
        </div>
      </div>
    </div>
  );
}

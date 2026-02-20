'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { SalesforceWebToLead } from '@/components/forms/SalesforceWebToLead';

export type ChecklistLeadMagnetVariant = 'inline-card' | 'section-cta' | 'compact';

interface ChecklistLeadMagnetProps {
  variant?: ChecklistLeadMagnetVariant;
  className?: string;
}

const CHECKLIST_BENEFITS = [
  'Requirements mapping beyond feature checklists',
  'Fitment criteria for your scale & complexity',
  'Partner due diligence questions',
  'Implementation readiness checklist',
];

export function ChecklistLeadMagnet({ 
  variant = 'inline-card',
  className = '' 
}: ChecklistLeadMagnetProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Inline card variant - CTA that links to checklist page
  if (variant === 'inline-card') {
    return (
      <Link href="/resources/crm-erp-selection-checklist" className={`block ${className}`}>
        <Card className="border-2 border-primary hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Download className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <CardTitle className="text-xl">CRM/ERP Selection Checklist</CardTitle>
                  <CardDescription className="mt-1">
                    Download our comprehensive checklist to audit your selection process
                  </CardDescription>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-primary shrink-0" />
            </div>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  // Compact variant - small button that opens modal
  if (variant === 'compact') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className={className}>
            <Download className="mr-2 h-4 w-4" />
            Download Checklist
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              CRM/ERP Selection Checklist
            </DialogTitle>
          </DialogHeader>
          <SalesforceWebToLead
            variant="checklist"
            showCard={false}
            kmcPayload={{
              source: 'checklist',
              asset: 'crm-erp-selection-checklist',
              intent: 'download_checklist_modal',
            }}
            onSuccess={() => {
              setTimeout(() => setIsOpen(false), 3000);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Section CTA variant - larger block with benefits and CTA
  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-white border-primary/20 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Download className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">CRM/ERP Selection Checklist</CardTitle>
        </div>
        <CardDescription>
          Audit your selection process with our comprehensive checklist covering requirements, 
          fitment, partner evaluation, and implementation readiness.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {CHECKLIST_BENEFITS.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              {benefit}
            </li>
          ))}
        </ul>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Free Checklist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Download Checklist
              </DialogTitle>
            </DialogHeader>
            <SalesforceWebToLead
              variant="checklist"
              showCard={false}
              description="Enter your details to get the checklist sent to your email."
              kmcPayload={{
                source: 'checklist',
                asset: 'crm-erp-selection-checklist',
                intent: 'download_checklist_section_cta',
              }}
              onSuccess={() => {
                setTimeout(() => setIsOpen(false), 3000);
              }}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ChecklistLeadMagnet;

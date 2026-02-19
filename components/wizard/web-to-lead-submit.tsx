'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  webToLeadUrl,
  oid,
  retURL,
  standardFieldMap,
  customFieldMap,
  defaultLeadSource,
  isWebToLeadEnabled,
  formatWizardDescription,
  type WebToLeadPayload,
} from '@/lib/webToLeadConfig';

interface Recommendation {
  slug: string;
  name: string;
  score: number;
  complexity: string;
  reasons: string[];
  watchouts?: string[];
}

interface WebToLeadSubmitProps {
  wizardType: 'crm' | 'erp';
  answers: Record<string, any>;
  recommendations: Recommendation[];
  contactInfo: {
    name: string;
    email: string;
    company: string;
    role: string;
    phone?: string;
    website?: string;
  };
  onFallbackSubmit?: () => Promise<void>;
  disabled?: boolean;
}

export function WebToLeadSubmit({
  wizardType,
  answers,
  recommendations,
  contactInfo,
  onFallbackSubmit,
  disabled = false,
}: WebToLeadSubmitProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfigWarning, setShowConfigWarning] = useState(false);

  // Parse name into first and last
  const nameParts = contactInfo.name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as last if no last name

  // Format the description with all wizard data
  const description = formatWizardDescription(
    wizardType,
    answers,
    recommendations.map(r => ({
      name: r.name,
      complexity: r.complexity,
      reasons: r.reasons,
    }))
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!isWebToLeadEnabled()) {
      // Web-to-Lead not configured - use fallback
      setShowConfigWarning(true);
      
      if (onFallbackSubmit) {
        await onFallbackSubmit();
      }
      setIsSubmitting(false);
      return;
    }

    // Submit the hidden form to Salesforce
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  // If not configured, show warning and allow fallback
  if (showConfigWarning && !isWebToLeadEnabled()) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">Salesforce Web-to-Lead not configured</p>
            <p className="text-amber-700 mt-1">
              To enable: Add your Salesforce OID in <code className="bg-amber-100 px-1 rounded">/lib/webToLeadConfig.ts</code>
            </p>
            <p className="text-amber-700 mt-2">
              Your submission was saved locally. We'll follow up via email.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">Submission recorded (dev fallback)</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden form for Web-to-Lead submission */}
      <form
        ref={formRef}
        action={webToLeadUrl}
        method="POST"
        style={{ display: 'none' }}
      >
        {/* Required Salesforce fields */}
        <input type="hidden" name="oid" value={oid} />
        <input type="hidden" name="retURL" value={retURL} />
        
        {/* Standard fields */}
        <input type="hidden" name={standardFieldMap.first_name} value={firstName} />
        <input type="hidden" name={standardFieldMap.last_name} value={lastName} />
        <input type="hidden" name={standardFieldMap.email} value={contactInfo.email} />
        <input type="hidden" name={standardFieldMap.company} value={contactInfo.company} />
        <input type="hidden" name={standardFieldMap.title} value={contactInfo.role} />
        <input type="hidden" name={standardFieldMap.phone} value={contactInfo.phone || ''} />
        <input type="hidden" name={standardFieldMap.website} value={contactInfo.website || ''} />
        <input type="hidden" name={standardFieldMap.description} value={description} />
        <input type="hidden" name={standardFieldMap.lead_source} value={defaultLeadSource} />
        
        {/* Custom fields (add as needed) */}
        {Object.entries(customFieldMap).map(([key, sfFieldId]) => (
          <input
            key={key}
            type="hidden"
            name={sfFieldId}
            value={answers[key] || ''}
          />
        ))}
      </form>

      {/* Submit button */}
      <Button
        size="lg"
        onClick={handleSubmit}
        disabled={disabled || isSubmitting}
        className="min-w-[200px]"
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            Get Shortlist + Demo Script <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </>
  );
}

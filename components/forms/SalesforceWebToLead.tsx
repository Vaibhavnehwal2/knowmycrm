'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Loader2, Calendar, Clock, Globe } from 'lucide-react';

// Salesforce Web-to-Lead Configuration - PRODUCTION
const SF_CONFIG = {
  formAction: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dam00001ZRIBb',
  oid: '00Dam00001ZRIBb',
  kmcPayloadFieldId: '00NWQ00000DZVEL',
};

// Fallback timeout (8 seconds)
const FALLBACK_TIMEOUT_MS = 8000;

// Time slots (30-min intervals 09:00 - 18:00)
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

// Common timezones
const TIMEZONES = [
  'Asia/Kolkata',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export type WebToLeadVariant = 'wizard' | 'checklist' | 'book';

export interface WebToLeadDefaultValues {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  phone?: string;
  country?: string;
  role?: string;
}

export interface KMCPayload {
  source: WebToLeadVariant;
  schemaVersion: string;
  pageUrl: string;
  referrer: string;
  timestampISO: string;
  timezone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  // Wizard-specific
  wizardType?: 'crm' | 'erp';
  answers?: Record<string, any>;
  top2?: Array<{
    slug: string;
    name: string;
    score: number;
    complexity: string;
    reasons: string[];
  }>;
  // Checklist-specific
  asset?: string;
  intent?: string;
  checklistType?: string;
  // Book-specific
  preferredDate?: string;
  preferredTimeSlot?: string;
  preferredTimezone?: string;
  message?: string;
  [key: string]: any;
}

export interface SalesforceWebToLeadProps {
  variant: WebToLeadVariant;
  defaultValues?: WebToLeadDefaultValues;
  kmcPayload: Partial<KMCPayload>;
  onSuccess?: () => void;
  submitLabel?: string;
  title?: string;
  description?: string;
  showCard?: boolean;
  className?: string;
}

// Helper: Split name into first and last
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
    return { firstName: '', lastName: '' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: 'NA' };
  }
  const lastName = parts.pop() || '';
  const firstName = parts.join(' ');
  return { firstName, lastName };
}

// Helper: Get UTM params from URL
function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
    const value = params.get(key);
    if (value) utmParams[key] = value;
  });
  return utmParams;
}

// Helper: Get user's timezone
function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

// Helper: Build full KMC payload
function buildKMCPayload(basePayload: Partial<KMCPayload>, variant: WebToLeadVariant): string {
  const fullPayload: KMCPayload = {
    source: variant,
    schemaVersion: '1.0',
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    timestampISO: new Date().toISOString(),
    timezone: getUserTimezone(),
    ...getUTMParams(),
    ...basePayload,
  };

  let jsonString = JSON.stringify(fullPayload);
  
  // Truncate if too long (30k limit)
  if (jsonString.length > 30000) {
    // Remove non-critical fields
    const trimmedPayload = { ...fullPayload };
    if (trimmedPayload.answers) {
      trimmedPayload.answers = { note: 'truncated due to size' };
    }
    jsonString = JSON.stringify(trimmedPayload);
  }
  
  return jsonString;
}

// Helper: Check if recently submitted
function wasRecentlySubmitted(email: string): boolean {
  if (typeof window === 'undefined') return false;
  const lastEmail = localStorage.getItem('kmc_lastLeadEmail');
  const lastAt = localStorage.getItem('kmc_lastLeadAt');
  if (lastEmail === email && lastAt) {
    const lastTime = parseInt(lastAt, 10);
    const now = Date.now();
    // 5 minute cooldown
    if (now - lastTime < 5 * 60 * 1000) {
      return true;
    }
  }
  return false;
}

// Helper: Mark as submitted
function markAsSubmitted(email: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('kmc_lastLeadEmail', email);
  localStorage.setItem('kmc_lastLeadAt', Date.now().toString());
}

// Format date for display
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Get dynamic retURL based on current origin
function getRetURL(): string {
  if (typeof window === 'undefined') return '/thank-you';
  return `${window.location.origin}/thank-you`;
}

export function SalesforceWebToLead({
  variant,
  defaultValues = {},
  kmcPayload,
  onSuccess,
  submitLabel,
  title,
  description,
  showCard = true,
  className = '',
}: SalesforceWebToLeadProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [formData, setFormData] = useState({
    name: defaultValues.name || '',
    email: defaultValues.email || '',
    company: defaultValues.company || '',
    website: defaultValues.website || '',
    phone: defaultValues.phone || '',
    country: defaultValues.country || '',
    role: defaultValues.role || '',
    // Book-specific
    preferredDate: '',
    preferredTimeSlot: '',
    preferredTimezone: getUserTimezone(),
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recentlySubmitted, setRecentlySubmitted] = useState(false);
  const [retURL, setRetURL] = useState('/thank-you');

  // Set dynamic retURL on client side
  useEffect(() => {
    setRetURL(getRetURL());
  }, []);

  // Check for recent submission on mount
  useEffect(() => {
    if (formData.email && wasRecentlySubmitted(formData.email)) {
      setRecentlySubmitted(true);
    }
  }, [formData.email]);

  // Handle success completion
  const handleSuccess = useCallback(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsSubmitting(false);
    setIsSuccess(true);
    markAsSubmitted(formData.email);
    onSuccess?.();
  }, [formData.email, onSuccess]);

  // Listen for postMessage from /thank-you page
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is our success signal
      if (event.data && event.data.type === 'KMC_W2L_SUCCESS') {
        if (isSubmitting) {
          handleSuccess();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isSubmitting, handleSuccess]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get min date (tomorrow)
  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (recentlySubmitted) {
      setIsSuccess(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // Set fallback timeout - if no postMessage arrives, still show success
    // (Lead creation happens server-side, so it's likely successful)
    timeoutRef.current = setTimeout(() => {
      if (isSubmitting) {
        console.log('Web-to-Lead: Fallback timeout triggered, showing success');
        handleSuccess();
      }
    }, FALLBACK_TIMEOUT_MS);
    
    // Submit the form
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  // Build the KMC payload based on variant
  const finalKMCPayload = useMemo(() => {
    const payload: Partial<KMCPayload> = { ...kmcPayload };
    
    if (variant === 'book') {
      payload.preferredDate = formData.preferredDate;
      payload.preferredTimeSlot = formData.preferredTimeSlot;
      payload.preferredTimezone = formData.preferredTimezone;
    }
    
    return buildKMCPayload(payload, variant);
  }, [variant, kmcPayload, formData.preferredDate, formData.preferredTimeSlot, formData.preferredTimezone]);

  // Split name
  const { firstName, lastName } = splitName(formData.name);

  // Default labels
  const defaultSubmitLabel = {
    wizard: 'Submit & See Results',
    checklist: 'Download Checklist',
    book: 'Book a Call',
  }[variant];

  const defaultTitle = {
    wizard: 'Contact Information',
    checklist: 'Download Checklist',
    book: 'Book a Call',
  }[variant];

  const defaultDescription = {
    wizard: 'Enter your details to receive personalized recommendations.',
    checklist: 'Enter your details to get the checklist sent to your email.',
    book: 'Schedule a call with our team.',
  }[variant];

  // Success state
  if (isSuccess) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="mb-4 flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thanks — we're on it!</h3>
        <p className="text-gray-600">
          We'll email you within 24 hours with the shortlist + evaluation checklist.
        </p>
      </div>
    );
  }

  const formContent = (
    <>
      {/* Hidden iframe for form submission - 1x1 offscreen for reliable load events */}
      <iframe
        name="sf_w2l_iframe"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        title="Salesforce Web-to-Lead"
      />
      
      <form
        ref={formRef}
        action={SF_CONFIG.formAction}
        method="POST"
        target="sf_w2l_iframe"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Hidden Salesforce fields */}
        <input type="hidden" name="oid" value={SF_CONFIG.oid} />
        <input type="hidden" name="retURL" value={retURL} />
        <input type="hidden" name="first_name" value={firstName} />
        <input type="hidden" name="last_name" value={lastName} />
        <input type="hidden" name={SF_CONFIG.kmcPayloadFieldId} value={finalKMCPayload} />
        
        {/* Visible form fields */}
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company Name"
          />
        </div>
        
        {/* Wizard-specific: Role */}
        {variant === 'wizard' && (
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Sales Director"
            />
          </div>
        )}
        
        {/* Optional fields for wizard and book */}
        {(variant === 'wizard' || variant === 'book') && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="url"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                />
              </div>
            </div>
          </>
        )}
        
        {/* Book-specific: Date, Time, Timezone */}
        {variant === 'book' && (
          <>
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Preferred Meeting Time
              </h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    required
                    min={minDate}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                  {formData.preferredDate && (
                    <p className="text-xs text-gray-500">{formatDate(formData.preferredDate)}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Time Slot *
                    </Label>
                    <Select
                      value={formData.preferredTimeSlot}
                      onValueChange={(value) => setFormData({ ...formData, preferredTimeSlot: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Globe className="h-3 w-3" /> Timezone
                    </Label>
                    <Select
                      value={formData.preferredTimezone}
                      onValueChange={(value) => setFormData({ ...formData, preferredTimezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONES.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz.replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || (variant === 'book' && (!formData.preferredDate || !formData.preferredTimeSlot))}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            submitLabel || defaultSubmitLabel
          )}
        </Button>
      </form>
    </>
  );

  if (!showCard) {
    return <div className={className}>{formContent}</div>;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title || defaultTitle}</CardTitle>
        {(description || defaultDescription) && (
          <CardDescription>{description || defaultDescription}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}

export default SalesforceWebToLead;

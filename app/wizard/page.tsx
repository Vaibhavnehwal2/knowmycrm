'use client';

import { useState, useEffect, useMemo, useDeferredValue, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BrandIcon } from '@/components/brand-icon';
import { BrandLogo } from '@/components/brand-logo';
import { 
  ArrowRight, ArrowLeft, Check, Building2, Package, 
  Users, Globe, TrendingUp, Settings, Link2, Shield, 
  DollarSign, Clock, Mail, CheckCircle2, AlertTriangle, Loader2
} from 'lucide-react';
import { 
  WizardState, initialWizardState, saveWizardState, 
  loadWizardState, clearWizardState 
} from '@/lib/wizard-state';
import { recommendCRM, recommendERP, type WizardResult, type Recommendation } from '@/lib/fitment';
import industriesData from '@/data/industries.json';

// Salesforce Web-to-Lead Configuration - PRODUCTION
const SF_CONFIG = {
  formAction: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dam00001ZRIBb',
  oid: '00Dam00001ZRIBb',
  kmcPayloadFieldId: '00NWQ00000DZVEL',
};

// Fallback timeout (8 seconds)
const FALLBACK_TIMEOUT_MS = 8000;

// Industry options
const industries = industriesData.map(i => ({ value: i.slug, label: i.name }));

// Step definitions
const CRM_STEPS = [
  { title: 'Business Basics', icon: Building2 },
  { title: 'Sales Motion', icon: TrendingUp },
  { title: 'Functional Needs', icon: Settings },
  { title: 'Integrations', icon: Link2 },
  { title: 'Governance', icon: Shield },
  { title: 'Constraints', icon: DollarSign },
  { title: 'Contact', icon: Mail },
];

const ERP_STEPS = [
  { title: 'Business Basics', icon: Building2 },
  { title: 'Operating Model', icon: Package },
  { title: 'Core Modules', icon: Settings },
  { title: 'Complexity', icon: Shield },
  { title: 'Integrations', icon: Link2 },
  { title: 'Constraints', icon: DollarSign },
  { title: 'Contact', icon: Mail },
];

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

// Helper: Build KMC payload for wizard
function buildWizardKMCPayload(
  wizardType: 'crm' | 'erp',
  answers: Record<string, any>,
  recommendations: Recommendation[]
): string {
  const payload = {
    source: 'wizard',
    schemaVersion: '1.0',
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    timestampISO: new Date().toISOString(),
    timezone: getUserTimezone(),
    ...getUTMParams(),
    wizardType,
    answers,
    top2: recommendations.map(r => ({
      slug: r.slug,
      name: r.name,
      score: r.score,
      complexity: r.complexity,
      reasons: r.reasons,
    })),
  };

  let jsonString = JSON.stringify(payload);
  
  // Truncate if too long (30k limit)
  if (jsonString.length > 30000) {
    const trimmedPayload = { ...payload, answers: { note: 'truncated due to size' } };
    jsonString = JSON.stringify(trimmedPayload);
  }
  
  return jsonString;
}

export default function WizardPage() {
  const [state, setState] = useState<WizardState>(initialWizardState);
  const [results, setResults] = useState<WizardResult | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [industrySearch, setIndustrySearch] = useState('');
  const deferredSearch = useDeferredValue(industrySearch);
  
  // Refs for Salesforce form submission
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Dynamic retURL
  const [retURL, setRetURL] = useState('/thank-you');

  // Load saved state on mount
  useEffect(() => {
    // Set dynamic retURL on client side
    if (typeof window !== 'undefined') {
      setRetURL(`${window.location.origin}/thank-you`);
    }
    
    const saved = loadWizardState();
    if (saved) {
      setState(saved);
    }
    // Check if we already submitted for this session
    const lastEmail = localStorage.getItem('kmc_wizard_submitted_email');
    const lastType = localStorage.getItem('kmc_wizard_submitted_type');
    if (lastEmail && lastType) {
      setLeadSubmitted(true);
    }
    setIsLoading(false);
  }, []);

  // Save state on change
  useEffect(() => {
    if (!isLoading) {
      saveWizardState(state);
    }
  }, [state, isLoading]);

  // Filtered industries for search
  const filteredIndustries = useMemo(() => {
    if (!deferredSearch) return industries.slice(0, 10);
    return industries.filter(i => 
      i.label.toLowerCase().includes(deferredSearch.toLowerCase())
    ).slice(0, 10);
  }, [deferredSearch]);

  const steps = state.wizardType === 'crm' ? CRM_STEPS : ERP_STEPS;
  const totalSteps = steps.length;
  const progress = state.wizardType ? ((state.currentStep) / totalSteps) * 100 : 0;

  // Navigation
  const goNext = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const goBack = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  };

  const selectWizardType = (type: 'crm' | 'erp') => {
    setState(prev => ({ ...prev, wizardType: type, currentStep: 1 }));
  };

  const updateCRMAnswer = (key: keyof WizardState['crmAnswers'], value: any) => {
    setState(prev => ({
      ...prev,
      crmAnswers: { ...prev.crmAnswers, [key]: value }
    }));
  };

  const updateERPAnswer = (key: keyof WizardState['erpAnswers'], value: any) => {
    setState(prev => ({
      ...prev,
      erpAnswers: { ...prev.erpAnswers, [key]: value }
    }));
  };

  const toggleArrayValue = (arr: string[], value: string): string[] => {
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
  };

  // Handle success completion
  const handleSubmissionSuccess = useCallback(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsSubmitting(false);
    setLeadSubmitted(true);
    
    // Mark as submitted in localStorage
    const email = state.wizardType === 'crm' ? state.crmAnswers.email : state.erpAnswers.email;
    localStorage.setItem('kmc_wizard_submitted_email', email);
    localStorage.setItem('kmc_wizard_submitted_type', state.wizardType || '');
    localStorage.setItem('kmc_lastLeadEmail', email);
    localStorage.setItem('kmc_lastLeadAt', Date.now().toString());
  }, [state.wizardType, state.crmAnswers.email, state.erpAnswers.email]);

  // Listen for postMessage from /thank-you page
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is our success signal
      if (event.data && event.data.type === 'KMC_W2L_SUCCESS') {
        if (isSubmitting) {
          handleSubmissionSuccess();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isSubmitting, handleSubmissionSuccess]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Calculate results and submit lead
  const calculateResultsAndSubmit = () => {
    let result: WizardResult;
    if (state.wizardType === 'crm') {
      result = recommendCRM(state.crmAnswers);
    } else {
      result = recommendERP(state.erpAnswers);
    }
    setResults(result);
    
    // Submit lead via Salesforce Web-to-Lead
    if (!leadSubmitted) {
      setIsSubmitting(true);
      
      // Set fallback timeout - if no postMessage arrives, still show success
      timeoutRef.current = setTimeout(() => {
        console.log('Wizard Web-to-Lead: Fallback timeout triggered, showing success');
        handleSubmissionSuccess();
      }, FALLBACK_TIMEOUT_MS);
      
      // Small delay to ensure form is ready
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.submit();
        }
      }, 100);
    }
    
    // Move to results screen
    setState(prev => ({ ...prev, currentStep: totalSteps + 1 }));
  };

  // Start over
  const startOver = () => {
    clearWizardState();
    localStorage.removeItem('kmc_wizard_submitted_email');
    localStorage.removeItem('kmc_wizard_submitted_type');
    setState(initialWizardState);
    setResults(null);
    setLeadSubmitted(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Get contact info for form
  const contactInfo = state.wizardType === 'crm' ? state.crmAnswers : state.erpAnswers;
  const { firstName, lastName } = splitName(contactInfo.name);

  // Pre-compute recommendations for form (needed before submit)
  const precomputedResults = useMemo(() => {
    if (state.currentStep !== totalSteps) return null;
    if (state.wizardType === 'crm') {
      return recommendCRM(state.crmAnswers);
    } else if (state.wizardType === 'erp') {
      return recommendERP(state.erpAnswers);
    }
    return null;
  }, [state.currentStep, state.wizardType, state.crmAnswers, state.erpAnswers, totalSteps]);

  // KMC Payload for the form
  const kmcPayload = useMemo(() => {
    const recs = results?.top2 || precomputedResults?.top2 || [];
    const answers = state.wizardType === 'crm' ? state.crmAnswers : state.erpAnswers;
    return buildWizardKMCPayload(state.wizardType || 'crm', answers, recs);
  }, [state.wizardType, state.crmAnswers, state.erpAnswers, results, precomputedResults]);

  if (isLoading && !state.wizardType) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <div className="h-48 bg-gray-200 rounded-xl" />
            <div className="h-48 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (results) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Hidden iframe for Salesforce submission - 1x1 offscreen for reliable load events */}
        <iframe
          name="sf_wizard_iframe"
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
        
        <div className="text-center mb-12">
          <Badge className="mb-4">{state.wizardType?.toUpperCase()} Fit Assessment</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Top 2 Picks</h1>
          <p className="text-lg text-gray-600">
            Based on your inputs, here are the best-fit {state.wizardType === 'crm' ? 'CRMs' : 'ERPs'} for your needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {results.top2.map((rec, index) => (
            <Card key={rec.slug} className="relative overflow-hidden">
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  TOP PICK
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BrandIcon iconName={rec.slug.split('-')[0]} name={rec.name} className="h-10 w-10" />
                  <div>
                    <CardTitle className="text-xl">{rec.name}</CardTitle>
                    <Badge variant={rec.complexity === 'Low' ? 'secondary' : rec.complexity === 'Medium' ? 'outline' : 'destructive'} className="mt-1">
                      {rec.complexity} Complexity
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" /> Why it fits
                </h4>
                <ul className="space-y-2 mb-4">
                  {rec.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      {reason}
                    </li>
                  ))}
                </ul>
                {rec.watchouts && rec.watchouts.length > 0 && (
                  <details className="group">
                    <summary className="flex items-center gap-2 text-sm font-medium text-amber-700 cursor-pointer hover:text-amber-800">
                      <AlertTriangle className="h-4 w-4" /> Watchouts
                    </summary>
                    <ul className="mt-2 space-y-1 pl-6">
                      {rec.watchouts.map((wo, i) => (
                        <li key={i} className="text-sm text-amber-700">{wo}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-primary/20 mb-8">
          <CardContent className="py-8">
            <div className="text-center">
              {leadSubmitted ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-semibold">Your details have been submitted!</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    We'll email you within 24 hours with the shortlist + evaluation checklist.
                  </p>
                </>
              ) : isSubmitting ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-primary mb-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="font-semibold">Submitting your details...</span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to move forward?</h3>
                  <p className="text-gray-600 mb-6">
                    Get a detailed shortlist pack with demo scripts and evaluation criteria.
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/book">
                  <Button size="lg">Book a Call <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
                {!leadSubmitted && !isSubmitting && (
                  <Button size="lg" variant="outline" onClick={() => {
                    setIsSubmitting(true);
                    if (formRef.current) formRef.current.submit();
                  }}>
                    Get Shortlist + Demo Script
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          {results.notes?.[0]}
        </p>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={startOver}>Start Over</Button>
        </div>
        
        {/* Hidden Salesforce form for results page resubmit */}
        <form
          ref={formRef}
          action={SF_CONFIG.formAction}
          method="POST"
          target="sf_wizard_iframe"
          className="hidden"
        >
          <input type="hidden" name="oid" value={SF_CONFIG.oid} />
          <input type="hidden" name="retURL" value={retURL} />
          <input type="hidden" name="first_name" value={firstName} />
          <input type="hidden" name="last_name" value={lastName} />
          <input type="hidden" name="email" value={contactInfo.email} />
          <input type="hidden" name="company" value={contactInfo.company} />
          <input type="hidden" name="phone" value={contactInfo.phone || ''} />
          <input type="hidden" name="url" value={contactInfo.website || ''} />
          <input type="hidden" name={SF_CONFIG.kmcPayloadFieldId} value={kmcPayload} />
        </form>
      </div>
    );
  }

  // Step 0: Wizard Type Selection
  if (!state.wizardType || state.currentStep === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Image 
              src="/brand/knowmycrm-logo-white.png" 
              alt="KnowMyCRM - Find the Right CRM & ERP" 
              width={480} 
              height={120}
              className="h-24 w-auto"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CRM/ERP Fit Wizard</h1>
          <p className="text-lg text-gray-600">
            Answer a few questions and get personalized recommendations in minutes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card 
            className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            onClick={() => selectWizardType('crm')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Find my best-fit CRM</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Sales, Service & Customer Workflows
              </CardDescription>
              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Lead & opportunity management</li>
                <li>• Sales pipeline & forecasting</li>
                <li>• Customer service & support</li>
                <li>• Marketing automation</li>
              </ul>
              <Button className="mt-6 w-full">
                Start CRM Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            onClick={() => selectWizardType('erp')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Find my best-fit ERP</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Finance, Inventory & Operations
              </CardDescription>
              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Finance & accounting</li>
                <li>• Inventory & warehousing</li>
                <li>• Procurement & supply chain</li>
                <li>• Manufacturing & production</li>
              </ul>
              <Button className="mt-6 w-full" variant="outline">
                Start ERP Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // CRM Steps
  const renderCRMStep = () => {
    const { crmAnswers } = state;

    switch (state.currentStep) {
      case 1: // Business Basics
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Industry *</Label>
              <Input
                placeholder="Search industry..."
                value={industrySearch}
                onChange={(e) => setIndustrySearch(e.target.value)}
                className="mt-2 mb-2"
              />
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {filteredIndustries.map(ind => (
                  <Button
                    key={ind.value}
                    variant={crmAnswers.industry === ind.value ? 'default' : 'outline'}
                    className="justify-start text-left h-auto py-2 px-3"
                    onClick={() => updateCRMAnswer('industry', ind.value)}
                  >
                    {ind.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Company Size *</Label>
              <RadioGroup value={crmAnswers.companySize} onValueChange={(v) => updateCRMAnswer('companySize', v)} className="mt-2">
                {['1-10', '11-50', '51-200', '201-1000', '1000+'].map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`}>{size} employees</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Primary Regions *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { value: 'india', label: 'India' },
                  { value: 'us', label: 'United States' },
                  { value: 'eu', label: 'Europe' },
                  { value: 'middle-east', label: 'Middle East' },
                  { value: 'apac', label: 'APAC' },
                  { value: 'global', label: 'Global' },
                ].map(region => (
                  <div key={region.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`region-${region.value}`}
                      checked={crmAnswers.regions.includes(region.value)}
                      onCheckedChange={() => updateCRMAnswer('regions', toggleArrayValue(crmAnswers.regions, region.value))}
                    />
                    <Label htmlFor={`region-${region.value}`}>{region.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Sales Motion
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Sales Model *</Label>
              <RadioGroup value={crmAnswers.salesModel} onValueChange={(v) => updateCRMAnswer('salesModel', v)} className="mt-2">
                {[
                  { value: 'b2b', label: 'B2B (Business to Business)' },
                  { value: 'b2c', label: 'B2C (Business to Consumer)' },
                  { value: 'both', label: 'Both B2B and B2C' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`sales-${opt.value}`} />
                    <Label htmlFor={`sales-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Typical Sales Cycle *</Label>
              <RadioGroup value={crmAnswers.salesCycle} onValueChange={(v) => updateCRMAnswer('salesCycle', v)} className="mt-2">
                {[
                  { value: 'short', label: 'Short (days)' },
                  { value: 'medium', label: 'Medium (weeks)' },
                  { value: 'long', label: 'Long (months)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`cycle-${opt.value}`} />
                    <Label htmlFor={`cycle-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Pipeline Complexity *</Label>
              <RadioGroup value={crmAnswers.pipelineComplexity} onValueChange={(v) => updateCRMAnswer('pipelineComplexity', v)} className="mt-2">
                {[
                  { value: 'simple', label: 'Simple (standard stages, few products)' },
                  { value: 'moderate', label: 'Moderate (multiple products, some approvals)' },
                  { value: 'complex', label: 'Complex (multi-product, CPQ, approvals)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`pipeline-${opt.value}`} />
                    <Label htmlFor={`pipeline-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3: // Functional Needs
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">What capabilities do you need? *</Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'lead-opportunity', label: 'Lead & Opportunity Management' },
                  { value: 'quoting-basic', label: 'Quoting (basic)' },
                  { value: 'cpq', label: 'CPQ (Configure-Price-Quote)' },
                  { value: 'renewals', label: 'Renewals / Subscriptions' },
                  { value: 'approvals', label: 'Approvals & Workflows' },
                  { value: 'service-desk', label: 'Service Desk / Ticketing' },
                  { value: 'field-service', label: 'Field Service' },
                  { value: 'marketing', label: 'Marketing Automation' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox 
                      id={`func-${opt.value}`}
                      checked={crmAnswers.functionalNeeds.includes(opt.value)}
                      onCheckedChange={() => updateCRMAnswer('functionalNeeds', toggleArrayValue(crmAnswers.functionalNeeds, opt.value))}
                    />
                    <Label htmlFor={`func-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Integrations
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">What integrations matter?</Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'email-calendar', label: 'Email/Calendar (Google/M365)' },
                  { value: 'whatsapp', label: 'WhatsApp' },
                  { value: 'website-forms', label: 'Website Forms' },
                  { value: 'ecommerce', label: 'E-commerce Platform' },
                  { value: 'erp-sync', label: 'Accounting/ERP Sync' },
                  { value: 'bi', label: 'BI (Power BI/Tableau)' },
                  { value: 'telephony', label: 'Phone/Telephony' },
                  { value: 'social', label: 'Social Media' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox 
                      id={`int-${opt.value}`}
                      checked={crmAnswers.integrations.includes(opt.value)}
                      onCheckedChange={() => updateCRMAnswer('integrations', toggleArrayValue(crmAnswers.integrations, opt.value))}
                    />
                    <Label htmlFor={`int-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Governance
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Role/Permission Complexity *</Label>
              <RadioGroup value={crmAnswers.roleComplexity} onValueChange={(v) => updateCRMAnswer('roleComplexity', v)} className="mt-2">
                {[
                  { value: 'low', label: 'Low (everyone sees everything)' },
                  { value: 'medium', label: 'Medium (team-based visibility)' },
                  { value: 'high', label: 'High (complex hierarchies, territories)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`role-${opt.value}`} />
                    <Label htmlFor={`role-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Reporting Needs *</Label>
              <RadioGroup value={crmAnswers.reportingDepth} onValueChange={(v) => updateCRMAnswer('reportingDepth', v)} className="mt-2">
                {[
                  { value: 'basic', label: 'Basic (standard reports)' },
                  { value: 'advanced', label: 'Advanced (custom reports, dashboards)' },
                  { value: 'executive', label: 'Executive (forecasting, analytics)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`report-${opt.value}`} />
                    <Label htmlFor={`report-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Current Data Maturity *</Label>
              <RadioGroup value={crmAnswers.dataMaturity} onValueChange={(v) => updateCRMAnswer('dataMaturity', v)} className="mt-2">
                {[
                  { value: 'excel-whatsapp', label: 'Excel/WhatsApp chaos' },
                  { value: 'partial', label: 'Partially structured (some tools)' },
                  { value: 'well-structured', label: 'Well structured (existing CRM/systems)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`data-${opt.value}`} />
                    <Label htmlFor={`data-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 6: // Constraints
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Budget Range *</Label>
              <RadioGroup value={crmAnswers.budgetRange} onValueChange={(v) => updateCRMAnswer('budgetRange', v)} className="mt-2">
                {[
                  { value: 'low', label: 'Cost-conscious (optimize for value)' },
                  { value: 'mid', label: 'Balanced (features + cost)' },
                  { value: 'high', label: 'Enterprise (best fit wins)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`budget-${opt.value}`} />
                    <Label htmlFor={`budget-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Timeline *</Label>
              <RadioGroup value={crmAnswers.timeline} onValueChange={(v) => updateCRMAnswer('timeline', v)} className="mt-2">
                {[
                  { value: 'asap', label: 'ASAP (0–4 weeks)' },
                  { value: '1-3-months', label: '1–3 months' },
                  { value: '3-6-months', label: '3–6 months' },
                  { value: '6+-months', label: '6+ months' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`time-${opt.value}`} />
                    <Label htmlFor={`time-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Do you have an internal owner for CRM? *</Label>
              <RadioGroup value={crmAnswers.internalOwner} onValueChange={(v) => updateCRMAnswer('internalOwner', v)} className="mt-2">
                {[
                  { value: 'yes', label: 'Yes, someone will own it' },
                  { value: 'no', label: 'No, we need guidance on this' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`owner-${opt.value}`} />
                    <Label htmlFor={`owner-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 7: // Contact
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={crmAnswers.name}
                  onChange={(e) => updateCRMAnswer('name', e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Work Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={crmAnswers.email}
                  onChange={(e) => updateCRMAnswer('email', e.target.value)}
                  placeholder="john@company.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={crmAnswers.company}
                  onChange={(e) => updateCRMAnswer('company', e.target.value)}
                  placeholder="Acme Inc"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Your Role *</Label>
                <Input
                  id="role"
                  value={crmAnswers.role}
                  onChange={(e) => updateCRMAnswer('role', e.target.value)}
                  placeholder="Sales Director"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  value={crmAnswers.phone}
                  onChange={(e) => updateCRMAnswer('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  value={crmAnswers.website}
                  onChange={(e) => updateCRMAnswer('website', e.target.value)}
                  placeholder="www.company.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ERP Steps
  const renderERPStep = () => {
    const { erpAnswers } = state;

    switch (state.currentStep) {
      case 1: // Business Basics
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Industry *</Label>
              <Input
                placeholder="Search industry..."
                value={industrySearch}
                onChange={(e) => setIndustrySearch(e.target.value)}
                className="mt-2 mb-2"
              />
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {filteredIndustries.map(ind => (
                  <Button
                    key={ind.value}
                    variant={erpAnswers.industry === ind.value ? 'default' : 'outline'}
                    className="justify-start text-left h-auto py-2 px-3"
                    onClick={() => updateERPAnswer('industry', ind.value)}
                  >
                    {ind.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Company Size *</Label>
              <RadioGroup value={erpAnswers.companySize} onValueChange={(v) => updateERPAnswer('companySize', v)} className="mt-2">
                {['1-10', '11-50', '51-200', '201-1000', '1000+'].map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`erp-size-${size}`} />
                    <Label htmlFor={`erp-size-${size}`}>{size} employees</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Primary Regions *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { value: 'india', label: 'India' },
                  { value: 'us', label: 'United States' },
                  { value: 'eu', label: 'Europe' },
                  { value: 'middle-east', label: 'Middle East' },
                  { value: 'apac', label: 'APAC' },
                  { value: 'global', label: 'Global' },
                ].map(region => (
                  <div key={region.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`erp-region-${region.value}`}
                      checked={erpAnswers.regions.includes(region.value)}
                      onCheckedChange={() => updateERPAnswer('regions', toggleArrayValue(erpAnswers.regions, region.value))}
                    />
                    <Label htmlFor={`erp-region-${region.value}`}>{region.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Legal Entities *</Label>
              <RadioGroup value={erpAnswers.legalEntities} onValueChange={(v) => updateERPAnswer('legalEntities', v)} className="mt-2">
                {[
                  { value: 'single', label: 'Single entity' },
                  { value: 'multi', label: 'Multiple entities (subsidiaries, branches)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`entity-${opt.value}`} />
                    <Label htmlFor={`entity-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 2: // Operating Model
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Primary Business Type *</Label>
              <RadioGroup value={erpAnswers.businessType} onValueChange={(v) => updateERPAnswer('businessType', v)} className="mt-2">
                {[
                  { value: 'manufacturing', label: 'Manufacturing' },
                  { value: 'distribution', label: 'Wholesale / Distribution' },
                  { value: 'services', label: 'Services / Projects' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`btype-${opt.value}`} />
                    <Label htmlFor={`btype-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Multi-Warehouse Operations? *</Label>
              <RadioGroup value={erpAnswers.multiWarehouse} onValueChange={(v) => updateERPAnswer('multiWarehouse', v)} className="mt-2">
                {[
                  { value: 'no', label: 'No, single location' },
                  { value: 'yes', label: 'Yes, multiple warehouses/locations' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`warehouse-${opt.value}`} />
                    <Label htmlFor={`warehouse-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Multi-Currency? *</Label>
              <RadioGroup value={erpAnswers.multiCurrency} onValueChange={(v) => updateERPAnswer('multiCurrency', v)} className="mt-2">
                {[
                  { value: 'no', label: 'No, single currency' },
                  { value: 'yes', label: 'Yes, multiple currencies' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`currency-${opt.value}`} />
                    <Label htmlFor={`currency-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3: // Core Modules
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Which modules do you need? *</Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'finance', label: 'Finance (GL/AP/AR)' },
                  { value: 'procurement', label: 'Procurement' },
                  { value: 'inventory', label: 'Inventory Management' },
                  { value: 'sales-orders', label: 'Sales Order Processing' },
                  ...(erpAnswers.businessType === 'manufacturing' ? [
                    { value: 'production', label: 'Production / BOM / MRP' },
                    { value: 'quality', label: 'Quality Management' },
                  ] : []),
                  ...(erpAnswers.businessType === 'services' ? [
                    { value: 'projects', label: 'Projects & Job Costing' },
                  ] : []),
                  { value: 'hr-payroll', label: 'HR/Payroll (optional)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox 
                      id={`mod-${opt.value}`}
                      checked={erpAnswers.coreModules.includes(opt.value)}
                      onCheckedChange={() => updateERPAnswer('coreModules', toggleArrayValue(erpAnswers.coreModules, opt.value))}
                    />
                    <Label htmlFor={`mod-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Complexity
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Complexity Factors</Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'batch-lot', label: 'Batch/Lot Tracking' },
                  { value: 'serial', label: 'Serial Number Tracking' },
                  { value: 'approvals', label: 'Approval Workflows (PO/Invoice)' },
                  { value: 'advanced-pricing', label: 'Advanced Pricing Rules' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox 
                      id={`complex-${opt.value}`}
                      checked={erpAnswers.complexityFlags.includes(opt.value)}
                      onCheckedChange={() => updateERPAnswer('complexityFlags', toggleArrayValue(erpAnswers.complexityFlags, opt.value))}
                    />
                    <Label htmlFor={`complex-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Compliance Requirements *</Label>
              <RadioGroup value={erpAnswers.complianceNeeds} onValueChange={(v) => updateERPAnswer('complianceNeeds', v)} className="mt-2">
                {[
                  { value: 'basic', label: 'Basic (standard tax/reporting)' },
                  { value: 'strict', label: 'Strict (regulated industry, audits)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`compliance-${opt.value}`} />
                    <Label htmlFor={`compliance-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 5: // Integrations
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">CRM Integration Needed? *</Label>
              <RadioGroup value={erpAnswers.crmIntegration} onValueChange={(v) => updateERPAnswer('crmIntegration', v)} className="mt-2">
                {[
                  { value: 'no', label: 'No' },
                  { value: 'yes', label: 'Yes' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`crmint-${opt.value}`} />
                    <Label htmlFor={`crmint-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {erpAnswers.crmIntegration === 'yes' && (
                <Input
                  placeholder="Which CRM? (e.g., Salesforce, HubSpot)"
                  value={erpAnswers.crmName}
                  onChange={(e) => updateERPAnswer('crmName', e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-base font-semibold">Other Integrations Needed</Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'ecommerce', label: 'E-commerce Platform' },
                  { value: 'shipping', label: 'Shipping/Carriers' },
                  { value: 'banking', label: 'Banking/Payments' },
                  { value: 'bi', label: 'BI Reporting' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox 
                      id={`erpint-${opt.value}`}
                      checked={erpAnswers.erpIntegrations.includes(opt.value)}
                      onCheckedChange={() => updateERPAnswer('erpIntegrations', toggleArrayValue(erpAnswers.erpIntegrations, opt.value))}
                    />
                    <Label htmlFor={`erpint-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6: // Constraints
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Deployment Preference *</Label>
              <RadioGroup value={erpAnswers.deploymentPreference} onValueChange={(v) => updateERPAnswer('deploymentPreference', v)} className="mt-2">
                {[
                  { value: 'cloud', label: 'Cloud only' },
                  { value: 'on-prem', label: 'Open to on-premises' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`deploy-${opt.value}`} />
                    <Label htmlFor={`deploy-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Budget Range *</Label>
              <RadioGroup value={erpAnswers.budgetRange} onValueChange={(v) => updateERPAnswer('budgetRange', v)} className="mt-2">
                {[
                  { value: 'low', label: 'Cost-conscious (optimize for value)' },
                  { value: 'mid', label: 'Balanced (features + cost)' },
                  { value: 'high', label: 'Enterprise (best fit wins)' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`erp-budget-${opt.value}`} />
                    <Label htmlFor={`erp-budget-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Timeline *</Label>
              <RadioGroup value={erpAnswers.timeline} onValueChange={(v) => updateERPAnswer('timeline', v)} className="mt-2">
                {[
                  { value: 'asap', label: 'ASAP (0–4 weeks)' },
                  { value: '1-3-months', label: '1–3 months' },
                  { value: '3-6-months', label: '3–6 months' },
                  { value: '6+-months', label: '6+ months' },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`erp-time-${opt.value}`} />
                    <Label htmlFor={`erp-time-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 7: // Contact
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="erp-name">Your Name *</Label>
                <Input
                  id="erp-name"
                  value={erpAnswers.name}
                  onChange={(e) => updateERPAnswer('name', e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="erp-email">Work Email *</Label>
                <Input
                  id="erp-email"
                  type="email"
                  value={erpAnswers.email}
                  onChange={(e) => updateERPAnswer('email', e.target.value)}
                  placeholder="john@company.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="erp-company">Company Name *</Label>
                <Input
                  id="erp-company"
                  value={erpAnswers.company}
                  onChange={(e) => updateERPAnswer('company', e.target.value)}
                  placeholder="Acme Inc"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="erp-role">Your Role *</Label>
                <Input
                  id="erp-role"
                  value={erpAnswers.role}
                  onChange={(e) => updateERPAnswer('role', e.target.value)}
                  placeholder="Operations Director"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="erp-phone">Phone (optional)</Label>
                <Input
                  id="erp-phone"
                  value={erpAnswers.phone}
                  onChange={(e) => updateERPAnswer('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="erp-website">Website (optional)</Label>
                <Input
                  id="erp-website"
                  value={erpAnswers.website}
                  onChange={(e) => updateERPAnswer('website', e.target.value)}
                  placeholder="www.company.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Can proceed check
  const canProceed = () => {
    if (state.wizardType === 'crm') {
      const { crmAnswers } = state;
      switch (state.currentStep) {
        case 1: return crmAnswers.industry && crmAnswers.companySize && crmAnswers.regions.length > 0;
        case 2: return crmAnswers.salesModel && crmAnswers.salesCycle && crmAnswers.pipelineComplexity;
        case 3: return crmAnswers.functionalNeeds.length > 0;
        case 4: return true; // Optional
        case 5: return crmAnswers.roleComplexity && crmAnswers.reportingDepth && crmAnswers.dataMaturity;
        case 6: return crmAnswers.budgetRange && crmAnswers.timeline && crmAnswers.internalOwner;
        case 7: return crmAnswers.name && crmAnswers.email && crmAnswers.company && crmAnswers.role;
        default: return true;
      }
    } else if (state.wizardType === 'erp') {
      const { erpAnswers } = state;
      switch (state.currentStep) {
        case 1: return erpAnswers.industry && erpAnswers.companySize && erpAnswers.regions.length > 0 && erpAnswers.legalEntities;
        case 2: return erpAnswers.businessType && erpAnswers.multiWarehouse && erpAnswers.multiCurrency;
        case 3: return erpAnswers.coreModules.length > 0;
        case 4: return erpAnswers.complianceNeeds;
        case 5: return erpAnswers.crmIntegration;
        case 6: return erpAnswers.deploymentPreference && erpAnswers.budgetRange && erpAnswers.timeline;
        case 7: return erpAnswers.name && erpAnswers.email && erpAnswers.company && erpAnswers.role;
        default: return true;
      }
    }
    return false;
  };

  const isLastStep = state.currentStep === totalSteps;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Hidden iframe for Salesforce submission - 1x1 offscreen for reliable message events */}
      <iframe
        name="sf_wizard_iframe"
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
      
      {/* Hidden Salesforce form */}
      <form
        ref={formRef}
        action={SF_CONFIG.formAction}
        method="POST"
        target="sf_wizard_iframe"
        className="hidden"
      >
        <input type="hidden" name="oid" value={SF_CONFIG.oid} />
        <input type="hidden" name="retURL" value={retURL} />
        <input type="hidden" name="first_name" value={firstName} />
        <input type="hidden" name="last_name" value={lastName} />
        <input type="hidden" name="email" value={contactInfo.email} />
        <input type="hidden" name="company" value={contactInfo.company} />
        <input type="hidden" name="phone" value={contactInfo.phone || ''} />
        <input type="hidden" name="url" value={contactInfo.website || ''} />
        <input type="hidden" name={SF_CONFIG.kmcPayloadFieldId} value={kmcPayload} />
      </form>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-sm">
            {state.wizardType === 'crm' ? 'CRM' : 'ERP'} Assessment
          </Badge>
          <Button variant="ghost" size="sm" onClick={startOver}>
            Start Over
          </Button>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-2 mb-4" />
        
        {/* Step indicators */}
        <div className="flex justify-between text-xs text-gray-500 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index + 1 === state.currentStep;
            const isComplete = index + 1 < state.currentStep;
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center min-w-[60px] ${isActive ? 'text-primary' : isComplete ? 'text-green-600' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-primary text-white' : isComplete ? 'bg-green-100 text-green-600' : 'bg-gray-100'
                }`}>
                  {isComplete ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>
                <span className="hidden sm:block">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[state.currentStep - 1] && (
              <>
                {(() => {
                  const Icon = steps[state.currentStep - 1].icon;
                  return <Icon className="h-5 w-5 text-primary" />;
                })()}
                {steps[state.currentStep - 1].title}
              </>
            )}
          </CardTitle>
          <CardDescription>
            Step {state.currentStep} of {totalSteps}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.wizardType === 'crm' ? renderCRMStep() : renderERPStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={state.currentStep <= 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {isLastStep ? (
          <Button 
            onClick={calculateResultsAndSubmit} 
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>See My Results <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        ) : (
          <Button onClick={goNext} disabled={!canProceed()}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

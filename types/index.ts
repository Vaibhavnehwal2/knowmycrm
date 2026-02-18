// Type definitions for KnowMyCRM

export interface CRMProfile {
  name: string;
  slug: string;
  tagline: string;
  icon?: string; // simple-icons icon name
  bestFor: string[];
  chooseWhen: string[];
  avoidWhen: string[];
  implementationReality: string[];
  erpTouchpoints: string[];
  demoQuestions: string[];
  filters: {
    teamSize: string[]; // e.g., ["1-10", "11-50", "51-200", "200+"]
    complexity: 'light' | 'medium' | 'high';
    bestForTags: string[]; // e.g., ["inbound", "enterprise", "smb"]
    ecosystem: string; // e.g., "Microsoft", "Salesforce", "Independent"
  };
}

export interface ERPProfile {
  name: string;
  slug: string;
  tagline: string;
  icon?: string; // simple-icons icon name
  bestFor: string[];
  chooseWhen: string[];
  avoidWhen: string[];
  implementationReality: string[];
  crmIntegrationPatterns: string[];
  partnerQuestions: string[];
  filters: {
    teamSize: string[];
    complexity: 'light' | 'medium' | 'high';
    bestForTags: string[];
    ecosystem: string;
  };
}

export interface Lead {
  id: string;
  source: 'wizard' | 'checklist' | 'book';
  name: string;
  email: string;
  company?: string;
  country?: string;
  message?: string;
  timeline?: string;
  answers?: WizardAnswers;
  createdAt: string;
}

export interface WizardAnswers {
  companySize: {
    today: string;
    in12Months: string;
  };
  salesComplexity: string;
  serviceSupport: string[];
  integrations: string[];
  workflowSignals: string[];
  reporting: string[];
  timeline: string;
  industry: string;
  currentCRM?: string;
  currentERP?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
}

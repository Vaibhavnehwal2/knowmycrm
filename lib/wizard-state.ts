export interface WizardState {
  wizardType: 'crm' | 'erp' | null;
  currentStep: number;
  // CRM answers
  crmAnswers: {
    industry: string;
    companySize: string;
    regions: string[];
    salesModel: string;
    salesCycle: string;
    pipelineComplexity: string;
    functionalNeeds: string[];
    integrations: string[];
    roleComplexity: string;
    reportingDepth: string;
    dataMaturity: string;
    budgetRange: string;
    timeline: string;
    internalOwner: string;
    name: string;
    email: string;
    company: string;
    role: string;
    phone: string;
    website: string;
  };
  // ERP answers
  erpAnswers: {
    industry: string;
    companySize: string;
    regions: string[];
    legalEntities: string;
    businessType: string;
    multiWarehouse: string;
    multiCurrency: string;
    coreModules: string[];
    complexityFlags: string[];
    complianceNeeds: string;
    crmIntegration: string;
    crmName: string;
    erpIntegrations: string[];
    deploymentPreference: string;
    budgetRange: string;
    timeline: string;
    name: string;
    email: string;
    company: string;
    role: string;
    phone: string;
    website: string;
  };
}

export const initialWizardState: WizardState = {
  wizardType: null,
  currentStep: 0,
  crmAnswers: {
    industry: '',
    companySize: '',
    regions: [],
    salesModel: '',
    salesCycle: '',
    pipelineComplexity: '',
    functionalNeeds: ['lead-opportunity'],
    integrations: [],
    roleComplexity: '',
    reportingDepth: '',
    dataMaturity: '',
    budgetRange: '',
    timeline: '',
    internalOwner: '',
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    website: '',
  },
  erpAnswers: {
    industry: '',
    companySize: '',
    regions: [],
    legalEntities: '',
    businessType: '',
    multiWarehouse: '',
    multiCurrency: '',
    coreModules: ['finance'],
    complexityFlags: [],
    complianceNeeds: '',
    crmIntegration: '',
    crmName: '',
    erpIntegrations: [],
    deploymentPreference: '',
    budgetRange: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    website: '',
  },
};

const STORAGE_KEY = 'knowmycrm_wizard_state';

export function saveWizardState(state: WizardState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function loadWizardState(): WizardState | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearWizardState(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Salesforce Web-to-Lead Configuration
 * 
 * HOW TO CONFIGURE:
 * 1. Get your Organization ID (oid) from Salesforce Setup → Company Settings → Company Information
 * 2. Update the 'oid' value below
 * 3. Optionally add custom field mappings if you have custom Lead fields
 * 
 * The form will submit to Salesforce's Web-to-Lead servlet.
 * All wizard answers and recommendations are stored in the 'description' field.
 */

// Base URL for Web-to-Lead form submission
export const webToLeadUrl = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

// Your Salesforce Organization ID - REPLACE WITH YOUR ACTUAL OID
// Set to empty string to disable Web-to-Lead and use dev fallback
export const oid = ''; // e.g., '00D1234567890AB'

// URL to redirect after successful submission
export const retURL = typeof window !== 'undefined' 
  ? `${window.location.origin}/wizard/success`
  : '/wizard/success';

// Check if Web-to-Lead is properly configured
export const isWebToLeadEnabled = (): boolean => {
  return oid.length > 0;
};

// Standard Salesforce Web-to-Lead field names
export const standardFieldMap = {
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  company: 'company',
  title: 'title',
  phone: 'phone',
  website: 'URL',
  description: 'description',
  lead_source: 'lead_source',
} as const;

// Custom field mappings (add your Salesforce custom field IDs here)
// Example: { 'wizardType': '00N1234567890AB' }
export const customFieldMap: Record<string, string> = {
  // Add custom field mappings here when you have them
  // 'wizard_type__c': '00NXXXXXXXXXXXXXXX',
};

// Default lead source for wizard submissions
export const defaultLeadSource = 'Website - Fit Wizard';

export interface WebToLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  phone?: string;
  website?: string;
  description: string;
  leadSource?: string;
}

/**
 * Format wizard data into a readable description for Salesforce
 */
export function formatWizardDescription(
  wizardType: 'crm' | 'erp',
  answers: Record<string, any>,
  recommendations: Array<{
    name: string;
    complexity: string;
    reasons: string[];
  }>
): string {
  const lines: string[] = [];
  
  lines.push(`=== ${wizardType.toUpperCase()} FIT WIZARD SUBMISSION ===");
  lines.push('');
  lines.push(`Wizard Type: ${wizardType.toUpperCase()}`);
  lines.push(`Submitted: ${new Date().toISOString()}`);
  lines.push('');
  
  lines.push('--- ANSWERS ---');
  
  // Format answers based on wizard type
  if (wizardType === 'crm') {
    lines.push(`Industry: ${answers.industry || 'N/A'}`);
    lines.push(`Company Size: ${answers.companySize || 'N/A'}`);
    lines.push(`Regions: ${(answers.regions || []).join(', ') || 'N/A'}`);
    lines.push(`Sales Model: ${answers.salesModel || 'N/A'}`);
    lines.push(`Sales Cycle: ${answers.salesCycle || 'N/A'}`);
    lines.push(`Pipeline Complexity: ${answers.pipelineComplexity || 'N/A'}`);
    lines.push(`Functional Needs: ${(answers.functionalNeeds || []).join(', ') || 'N/A'}`);
    lines.push(`Integrations: ${(answers.integrations || []).join(', ') || 'N/A'}`);
    lines.push(`Role Complexity: ${answers.roleComplexity || 'N/A'}`);
    lines.push(`Reporting Depth: ${answers.reportingDepth || 'N/A'}`);
    lines.push(`Data Maturity: ${answers.dataMaturity || 'N/A'}`);
    lines.push(`Budget Range: ${answers.budgetRange || 'N/A'}`);
    lines.push(`Timeline: ${answers.timeline || 'N/A'}`);
    lines.push(`Internal Owner: ${answers.internalOwner || 'N/A'}`);
  } else {
    lines.push(`Industry: ${answers.industry || 'N/A'}`);
    lines.push(`Company Size: ${answers.companySize || 'N/A'}`);
    lines.push(`Regions: ${(answers.regions || []).join(', ') || 'N/A'}`);
    lines.push(`Legal Entities: ${answers.legalEntities || 'N/A'}`);
    lines.push(`Business Type: ${answers.businessType || 'N/A'}`);
    lines.push(`Multi-Warehouse: ${answers.multiWarehouse || 'N/A'}`);
    lines.push(`Multi-Currency: ${answers.multiCurrency || 'N/A'}`);
    lines.push(`Core Modules: ${(answers.coreModules || []).join(', ') || 'N/A'}`);
    lines.push(`Complexity Flags: ${(answers.complexityFlags || []).join(', ') || 'N/A'}`);
    lines.push(`Compliance Needs: ${answers.complianceNeeds || 'N/A'}`);
    lines.push(`CRM Integration: ${answers.crmIntegration || 'N/A'}`);
    if (answers.crmName) lines.push(`CRM Name: ${answers.crmName}`);
    lines.push(`ERP Integrations: ${(answers.erpIntegrations || []).join(', ') || 'N/A'}`);
    lines.push(`Deployment Preference: ${answers.deploymentPreference || 'N/A'}`);
    lines.push(`Budget Range: ${answers.budgetRange || 'N/A'}`);
    lines.push(`Timeline: ${answers.timeline || 'N/A'}`);
  }
  
  lines.push('');
  lines.push('--- TOP 2 RECOMMENDATIONS ---');
  
  recommendations.forEach((rec, index) => {
    lines.push('');
    lines.push(`${index + 1}) ${rec.name}`);
    lines.push(`   Complexity: ${rec.complexity}`);
    lines.push(`   Reasons:`);
    rec.reasons.forEach(reason => {
      lines.push(`     - ${reason}`);
    });
  });
  
  lines.push('');
  lines.push('=== END OF SUBMISSION ===');
  
  return lines.join('\n');
}

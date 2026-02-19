import type { CRMProfile, ERPProfile } from '@/types';
import crmData from '@/data/crm.json';
import erpData from '@/data/erp.json';

export type WizardType = 'crm' | 'erp';
export type Complexity = 'Low' | 'Medium' | 'High';

export interface Recommendation {
  slug: string;
  name: string;
  score: number;
  complexity: Complexity;
  reasons: string[];
  watchouts?: string[];
}

export interface WizardResult {
  wizardType: WizardType;
  top2: Recommendation[];
  notes?: string[];
}

export interface CRMAnswers {
  // Step 1: Business Basics
  industry: string;
  companySize: string;
  regions: string[];
  // Step 2: Sales Motion
  salesModel: string;
  salesCycle: string;
  pipelineComplexity: string;
  // Step 3: Functional Needs
  functionalNeeds: string[];
  // Step 4: Integrations
  integrations: string[];
  // Step 5: Governance + Data
  roleComplexity: string;
  reportingDepth: string;
  dataMaturity: string;
  // Step 6: Constraints
  budgetRange: string;
  timeline: string;
  internalOwner: string;
  // Step 7: Contact
  name: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
  website?: string;
}

export interface ERPAnswers {
  // Step 1: Business Basics
  industry: string;
  companySize: string;
  regions: string[];
  legalEntities: string;
  // Step 2: Operating Model
  businessType: string;
  multiWarehouse: string;
  multiCurrency: string;
  // Step 3: Core Modules
  coreModules: string[];
  // Step 4: Complexity Flags
  complexityFlags: string[];
  complianceNeeds: string;
  // Step 5: Integrations
  crmIntegration: string;
  crmName?: string;
  erpIntegrations: string[];
  // Step 6: Constraints
  deploymentPreference: string;
  budgetRange: string;
  timeline: string;
  // Step 7: Contact
  name: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
  website?: string;
}

// ============================================================
// CRM RECOMMENDATION LOGIC
// ============================================================

export function recommendCRM(data: CRMAnswers): WizardResult {
  const crms = crmData as CRMProfile[];
  const scores: Map<string, { score: number; reasons: string[]; watchouts: string[] }> = new Map();

  // Initialize scores for candidate CRMs
  const candidates = ['salesforce', 'hubspot', 'dynamics-365-sales', 'zoho-crm', 'pipedrive', 'freshsales'];
  candidates.forEach(slug => {
    scores.set(slug, { score: 0, reasons: [], watchouts: [] });
  });

  // --- Salesforce Scoring (always included, but score affects position) ---
  const sf = scores.get('salesforce')!;
  sf.score += 50; // Base score

  // High governance/roles
  if (data.roleComplexity === 'high') {
    sf.score += 20;
    sf.reasons.push('Strong role/permission model + scalable governance');
  } else if (data.roleComplexity === 'medium') {
    sf.score += 10;
    sf.reasons.push('Flexible role-based access control');
  }

  // Approvals/workflows
  if (data.functionalNeeds.includes('approvals')) {
    sf.score += 15;
    sf.reasons.push('Best-in-class workflow + automation + approvals');
  }

  // CPQ
  if (data.functionalNeeds.includes('cpq')) {
    sf.score += 15;
    sf.reasons.push('Native CPQ for complex quoting/pricing');
  }

  // Heavy integrations
  if (data.integrations.length >= 4) {
    sf.score += 15;
    sf.reasons.push('Robust integration ecosystem + API-first architecture');
  }

  // Advanced reporting
  if (data.reportingDepth === 'advanced' || data.reportingDepth === 'executive') {
    sf.score += 15;
    sf.reasons.push('Enterprise reporting + data model flexibility');
  }

  // Multi-region
  if (data.regions.length > 1 || data.regions.includes('global')) {
    sf.score += 10;
    sf.reasons.push('Global deployment capabilities + multi-currency');
  }

  // Field service
  if (data.functionalNeeds.includes('field-service')) {
    sf.score += 10;
    sf.reasons.push('Field Service Lightning for mobile workforce');
  }

  // Service desk
  if (data.functionalNeeds.includes('service-desk')) {
    sf.score += 10;
    sf.reasons.push('Service Cloud for unified customer service');
  }

  // Default reason if none added
  if (sf.reasons.length === 0) {
    sf.reasons.push('Industry-leading platform with comprehensive CRM capabilities');
    sf.reasons.push('Extensive AppExchange ecosystem for extensions');
  }

  // Watchouts for Salesforce
  if (data.budgetRange === 'low') {
    sf.watchouts.push('Higher licensing costs — consider ROI justification');
  }
  if (data.timeline === 'asap') {
    sf.watchouts.push('Implementation typically 2–4 months for full value');
  }

  // --- HubSpot Scoring ---
  const hs = scores.get('hubspot')!;
  hs.score += 30;

  if (['1-10', '11-50', '51-200'].includes(data.companySize)) {
    hs.score += 20;
    hs.reasons.push('Optimized for SMB with fast time-to-value');
  }
  if (data.timeline === 'asap' || data.timeline === '1-3-months') {
    hs.score += 15;
    hs.reasons.push('Quick deployment with intuitive setup');
  }
  if (data.roleComplexity === 'low') {
    hs.score += 15;
    hs.reasons.push('Simple admin without heavy configuration overhead');
  }
  if (data.pipelineComplexity === 'simple') {
    hs.score += 10;
    hs.reasons.push('Clean pipeline visualization for straightforward sales');
  }
  if (data.integrations.includes('email-calendar')) {
    hs.score += 10;
    hs.reasons.push('Excellent email/calendar sync + marketing alignment');
  }
  if (data.salesModel === 'b2c' || data.functionalNeeds.includes('marketing')) {
    hs.score += 10;
    hs.reasons.push('Strong marketing-to-sales handoff capabilities');
  }
  if (hs.reasons.length === 0) {
    hs.reasons.push('User-friendly interface with minimal training needed');
  }
  if (data.functionalNeeds.includes('cpq')) {
    hs.watchouts.push('CPQ capabilities less mature than enterprise options');
  }

  // --- Dynamics 365 Scoring ---
  const d365 = scores.get('dynamics-365-sales')!;
  d365.score += 30;

  if (data.integrations.includes('email-calendar') && data.integrations.includes('bi')) {
    d365.score += 25;
    d365.reasons.push('Native Microsoft 365 + Power BI integration');
  } else if (data.integrations.includes('email-calendar')) {
    d365.score += 15;
    d365.reasons.push('Seamless Outlook and Teams integration');
  }
  if (['51-200', '201-1000'].includes(data.companySize)) {
    d365.score += 15;
    d365.reasons.push('Well-suited for mid-market to enterprise scale');
  }
  if (data.roleComplexity === 'medium' || data.roleComplexity === 'high') {
    d365.score += 10;
    d365.reasons.push('Granular security model with business unit support');
  }
  if (data.integrations.includes('erp-sync')) {
    d365.score += 15;
    d365.reasons.push('Native integration with Dynamics 365 ERP products');
  }
  if (d365.reasons.length === 0) {
    d365.reasons.push('Comprehensive CRM with Microsoft ecosystem benefits');
  }
  if (!data.integrations.includes('email-calendar')) {
    d365.watchouts.push('Best ROI when paired with Microsoft 365 stack');
  }

  // --- Zoho Scoring ---
  const zoho = scores.get('zoho-crm')!;
  zoho.score += 25;

  if (data.budgetRange === 'low' || data.budgetRange === 'mid') {
    zoho.score += 20;
    zoho.reasons.push('Cost-effective licensing with broad feature set');
  }
  if (['1-10', '11-50', '51-200'].includes(data.companySize)) {
    zoho.score += 15;
    zoho.reasons.push('SMB-friendly with scalable editions');
  }
  if (data.functionalNeeds.length >= 4) {
    zoho.score += 10;
    zoho.reasons.push('Zoho One ecosystem for unified business apps');
  }
  if (data.regions.includes('india') || data.regions.includes('middle-east')) {
    zoho.score += 10;
    zoho.reasons.push('Strong presence and support in India/ME regions');
  }
  if (zoho.reasons.length === 0) {
    zoho.reasons.push('All-in-one platform with CRM, marketing, and support');
  }
  if (data.roleComplexity === 'high') {
    zoho.watchouts.push('Complex governance may require careful configuration');
  }

  // --- Pipedrive Scoring ---
  const pd = scores.get('pipedrive')!;
  pd.score += 20;

  if (data.pipelineComplexity === 'simple') {
    pd.score += 25;
    pd.reasons.push('Purpose-built for visual pipeline management');
  }
  if (['1-10', '11-50'].includes(data.companySize)) {
    pd.score += 20;
    pd.reasons.push('Ideal for small sales teams needing simplicity');
  }
  if (data.roleComplexity === 'low' && data.functionalNeeds.length <= 3) {
    pd.score += 15;
    pd.reasons.push('Minimal setup for pure sales focus');
  }
  if (data.timeline === 'asap') {
    pd.score += 10;
    pd.reasons.push('Can be operational within days');
  }
  if (pd.reasons.length === 0) {
    pd.reasons.push('Sales-centric CRM with intuitive deal tracking');
  }
  if (data.functionalNeeds.includes('service-desk') || data.functionalNeeds.includes('field-service')) {
    pd.watchouts.push('Limited service/support module capabilities');
  }

  // --- Freshsales Scoring ---
  const fs = scores.get('freshsales')!;
  fs.score += 20;

  if (['1-10', '11-50', '51-200'].includes(data.companySize)) {
    fs.score += 20;
    fs.reasons.push('SMB-optimized with quick onboarding');
  }
  if (data.functionalNeeds.includes('service-desk')) {
    fs.score += 15;
    fs.reasons.push('Seamless Freshdesk integration for unified CX');
  }
  if (data.timeline === 'asap' || data.timeline === '1-3-months') {
    fs.score += 15;
    fs.reasons.push('Fast deployment with pre-built automations');
  }
  if (data.budgetRange === 'low') {
    fs.score += 10;
    fs.reasons.push('Competitive pricing with AI features included');
  }
  if (fs.reasons.length === 0) {
    fs.reasons.push('Modern CRM with built-in AI scoring and automation');
  }
  if (data.functionalNeeds.includes('cpq')) {
    fs.watchouts.push('CPQ requires third-party integration');
  }

  // --- Determine Complexity for each ---
  function calculateComplexity(slug: string): Complexity {
    let complexityScore = 0;
    if (data.functionalNeeds.includes('cpq')) complexityScore += 2;
    if (data.functionalNeeds.includes('field-service')) complexityScore += 2;
    if (data.roleComplexity === 'high') complexityScore += 2;
    if (data.regions.length > 2) complexityScore += 1;
    if (data.integrations.length >= 5) complexityScore += 1;
    if (data.pipelineComplexity === 'complex') complexityScore += 1;
    if (data.reportingDepth === 'executive') complexityScore += 1;

    // Salesforce handles complexity better, others struggle more
    if (slug !== 'salesforce') complexityScore += 1;

    if (complexityScore <= 2) return 'Low';
    if (complexityScore <= 5) return 'Medium';
    return 'High';
  }

  // --- Build recommendations ---
  const recommendations: Recommendation[] = [];

  // Sort by score (excluding Salesforce first)
  const nonSfCandidates = candidates.filter(s => s !== 'salesforce');
  nonSfCandidates.sort((a, b) => (scores.get(b)?.score || 0) - (scores.get(a)?.score || 0));

  // Get top non-Salesforce pick
  const secondPick = nonSfCandidates[0];
  const secondData = scores.get(secondPick)!;
  const secondCRM = crms.find(c => c.slug === secondPick);

  // Build Salesforce recommendation
  const sfCRM = crms.find(c => c.slug === 'salesforce');
  const sfRec: Recommendation = {
    slug: 'salesforce',
    name: sfCRM?.name || 'Salesforce',
    score: sf.score,
    complexity: calculateComplexity('salesforce'),
    reasons: sf.reasons.slice(0, 4),
    watchouts: sf.watchouts.length > 0 ? sf.watchouts.slice(0, 2) : undefined,
  };

  // Build second recommendation
  const secondRec: Recommendation = {
    slug: secondPick,
    name: secondCRM?.name || secondPick,
    score: secondData.score,
    complexity: calculateComplexity(secondPick),
    reasons: secondData.reasons.slice(0, 4),
    watchouts: secondData.watchouts.length > 0 ? secondData.watchouts.slice(0, 2) : undefined,
  };

  // Order by score (highest first)
  if (sf.score >= secondData.score) {
    recommendations.push(sfRec, secondRec);
  } else {
    recommendations.push(secondRec, sfRec);
  }

  return {
    wizardType: 'crm',
    top2: recommendations,
    notes: ['These are fit-based suggestions, not vendor-sponsored.'],
  };
}

// ============================================================
// ERP RECOMMENDATION LOGIC
// ============================================================

export function recommendERP(data: ERPAnswers): WizardResult {
  const erps = erpData as ERPProfile[];
  const scores: Map<string, { score: number; reasons: string[]; watchouts: string[] }> = new Map();

  // Initialize scores for candidate ERPs
  const candidates = ['dynamics-365-business-central', 'dynamics-365-finance-operations', 'netsuite', 'sap-business-one', 'sap-s4hana', 'odoo', 'quickbooks-tally'];
  candidates.forEach(slug => {
    scores.set(slug, { score: 0, reasons: [], watchouts: [] });
  });

  // --- Odoo Scoring ---
  const odoo = scores.get('odoo')!;
  odoo.score += 25;

  if (data.budgetRange === 'low' || data.budgetRange === 'mid') {
    odoo.score += 25;
    odoo.reasons.push('Cost-effective with modular licensing');
  }
  if (['1-10', '11-50', '51-200'].includes(data.companySize)) {
    odoo.score += 20;
    odoo.reasons.push('SMB-friendly with rapid deployment');
  }
  if (data.timeline === 'asap' || data.timeline === '1-3-months') {
    odoo.score += 15;
    odoo.reasons.push('Faster implementation than traditional ERPs');
  }
  if (data.deploymentPreference === 'cloud') {
    odoo.score += 10;
    odoo.reasons.push('Cloud-native with on-prem option if needed');
  }
  if (data.coreModules.length <= 4) {
    odoo.score += 10;
    odoo.reasons.push('Start with core modules, expand as needed');
  }
  if (odoo.reasons.length === 0) {
    odoo.reasons.push('Open-source flexibility with enterprise features');
  }
  if (data.complianceNeeds === 'strict') {
    odoo.watchouts.push('May need customization for strict compliance');
  }

  // --- Dynamics 365 Business Central ---
  const d365bc = scores.get('dynamics-365-business-central')!;
  d365bc.score += 25;

  if (['51-200', '201-1000'].includes(data.companySize)) {
    d365bc.score += 20;
    d365bc.reasons.push('Built for SMB-to-midmarket scale');
  }
  if (data.crmIntegration === 'yes' && (data.crmName?.toLowerCase().includes('dynamics') || data.crmName?.toLowerCase().includes('salesforce'))) {
    d365bc.score += 15;
    d365bc.reasons.push('Strong CRM integration capabilities');
  }
  if (data.erpIntegrations.includes('bi')) {
    d365bc.score += 15;
    d365bc.reasons.push('Native Power BI for operational insights');
  }
  if (data.coreModules.includes('finance') && data.coreModules.includes('inventory')) {
    d365bc.score += 10;
    d365bc.reasons.push('Solid finance + inventory foundation');
  }
  if (data.deploymentPreference === 'cloud') {
    d365bc.score += 10;
    d365bc.reasons.push('Cloud-first with Microsoft ecosystem benefits');
  }
  if (d365bc.reasons.length === 0) {
    d365bc.reasons.push('Microsoft ERP with familiar Office experience');
  }
  if (data.businessType === 'manufacturing' && data.complexityFlags.includes('batch-lot')) {
    d365bc.watchouts.push('Complex manufacturing may need F&O');
  }

  // --- Dynamics 365 Finance & Operations ---
  const d365fo = scores.get('dynamics-365-finance-operations')!;
  d365fo.score += 20;

  if (['201-1000', '1000+'].includes(data.companySize)) {
    d365fo.score += 25;
    d365fo.reasons.push('Enterprise-grade for large organizations');
  }
  if (data.legalEntities === 'multi') {
    d365fo.score += 20;
    d365fo.reasons.push('Multi-entity and global consolidation support');
  }
  if (data.businessType === 'manufacturing') {
    d365fo.score += 15;
    d365fo.reasons.push('Advanced manufacturing with MRP/planning');
  }
  if (data.complianceNeeds === 'strict') {
    d365fo.score += 15;
    d365fo.reasons.push('Enterprise compliance and audit capabilities');
  }
  if (data.multiCurrency === 'yes') {
    d365fo.score += 10;
    d365fo.reasons.push('Full multi-currency and intercompany support');
  }
  if (d365fo.reasons.length === 0) {
    d365fo.reasons.push('Comprehensive enterprise ERP platform');
  }
  if (data.timeline === 'asap') {
    d365fo.watchouts.push('Enterprise implementations typically 6+ months');
  }

  // --- NetSuite ---
  const ns = scores.get('netsuite')!;
  ns.score += 25;

  if (data.deploymentPreference === 'cloud') {
    ns.score += 20;
    ns.reasons.push('Born-in-cloud with no on-prem maintenance');
  }
  if (data.legalEntities === 'multi') {
    ns.score += 20;
    ns.reasons.push('OneWorld for multi-subsidiary management');
  }
  if (['51-200', '201-1000'].includes(data.companySize)) {
    ns.score += 15;
    ns.reasons.push('Scales with high-growth companies');
  }
  if (data.coreModules.includes('finance') && data.coreModules.includes('procurement')) {
    ns.score += 10;
    ns.reasons.push('Strong finance + procurement workflows');
  }
  if (data.businessType === 'distribution' || data.businessType === 'services') {
    ns.score += 15;
    ns.reasons.push('Optimized for distribution and services');
  }
  if (ns.reasons.length === 0) {
    ns.reasons.push('Unified cloud ERP with real-time visibility');
  }
  if (data.deploymentPreference === 'on-prem') {
    ns.watchouts.push('Cloud-only — no on-premises deployment option');
  }

  // --- SAP Business One ---
  const sapb1 = scores.get('sap-business-one')!;
  sapb1.score += 20;

  if (['11-50', '51-200', '201-1000'].includes(data.companySize)) {
    sapb1.score += 20;
    sapb1.reasons.push('SAP quality for SMB scale');
  }
  if (data.businessType === 'manufacturing' || data.businessType === 'distribution') {
    sapb1.score += 20;
    sapb1.reasons.push('Strong manufacturing and distribution modules');
  }
  if (data.complexityFlags.includes('batch-lot') || data.complexityFlags.includes('serial')) {
    sapb1.score += 15;
    sapb1.reasons.push('Batch, lot, and serial tracking built-in');
  }
  if (data.regions.includes('eu') || data.regions.includes('india')) {
    sapb1.score += 10;
    sapb1.reasons.push('Localization for major markets');
  }
  if (sapb1.reasons.length === 0) {
    sapb1.reasons.push('Proven SAP platform for growing businesses');
  }
  if (data.timeline === 'asap') {
    sapb1.watchouts.push('Typical implementation 3–6 months');
  }

  // --- SAP S/4HANA ---
  const sap4 = scores.get('sap-s4hana')!;
  sap4.score += 15;

  if (['1000+'].includes(data.companySize)) {
    sap4.score += 30;
    sap4.reasons.push('Enterprise-scale for large global operations');
  }
  if (data.businessType === 'manufacturing' && data.complianceNeeds === 'strict') {
    sap4.score += 25;
    sap4.reasons.push('Industry-leading manufacturing + compliance');
  }
  if (data.legalEntities === 'multi' && data.multiCurrency === 'yes') {
    sap4.score += 20;
    sap4.reasons.push('Global multi-entity and currency management');
  }
  if (data.coreModules.length >= 6) {
    sap4.score += 15;
    sap4.reasons.push('Comprehensive module coverage');
  }
  if (sap4.reasons.length === 0) {
    sap4.reasons.push('Enterprise-grade ERP with deep functionality');
  }
  if (data.budgetRange === 'low' || data.budgetRange === 'mid') {
    sap4.watchouts.push('Higher TCO — best for large enterprise budgets');
  }
  if (data.timeline !== '6+-months') {
    sap4.watchouts.push('Enterprise implementations typically 9+ months');
  }

  // --- QuickBooks/Tally ---
  const qbt = scores.get('quickbooks-tally')!;
  qbt.score += 15;

  if (['1-10', '11-50'].includes(data.companySize)) {
    qbt.score += 25;
    qbt.reasons.push('Simple accounting for small businesses');
  }
  if (data.coreModules.length <= 2 && data.coreModules.includes('finance')) {
    qbt.score += 20;
    qbt.reasons.push('Focused on core finance/accounting');
  }
  if (data.budgetRange === 'low') {
    qbt.score += 15;
    qbt.reasons.push('Most affordable option for basic needs');
  }
  if (data.businessType === 'services' && data.complexityFlags.length === 0) {
    qbt.score += 10;
    qbt.reasons.push('Light ERP for service businesses');
  }
  if (qbt.reasons.length === 0) {
    qbt.reasons.push('Entry-level ERP with easy setup');
  }
  if (data.businessType === 'manufacturing') {
    qbt.watchouts.push('Limited manufacturing/BOM capabilities');
  }
  if (data.multiWarehouse === 'yes') {
    qbt.watchouts.push('Multi-warehouse support is basic');
  }

  // --- Calculate Complexity ---
  function calculateComplexity(slug: string): Complexity {
    let complexityScore = 0;
    if (data.legalEntities === 'multi') complexityScore += 2;
    if (data.multiWarehouse === 'yes') complexityScore += 1;
    if (data.multiCurrency === 'yes') complexityScore += 1;
    if (data.coreModules.includes('production')) complexityScore += 2;
    if (data.complexityFlags.includes('batch-lot')) complexityScore += 1;
    if (data.complexityFlags.includes('serial')) complexityScore += 1;
    if (data.complexityFlags.includes('advanced-pricing')) complexityScore += 1;
    if (data.complianceNeeds === 'strict') complexityScore += 2;
    if (data.erpIntegrations.length >= 3) complexityScore += 1;

    // Some ERPs handle complexity better
    if (['sap-s4hana', 'dynamics-365-finance-operations', 'netsuite'].includes(slug)) {
      complexityScore -= 1;
    }

    if (complexityScore <= 3) return 'Low';
    if (complexityScore <= 6) return 'Medium';
    return 'High';
  }

  // --- Build top 2 recommendations ---
  const sortedCandidates = [...candidates].sort((a, b) => (scores.get(b)?.score || 0) - (scores.get(a)?.score || 0));

  const top2: Recommendation[] = [];
  for (let i = 0; i < 2 && i < sortedCandidates.length; i++) {
    const slug = sortedCandidates[i];
    const data = scores.get(slug)!;
    const erpInfo = erps.find(e => e.slug === slug);

    top2.push({
      slug,
      name: erpInfo?.name || slug,
      score: data.score,
      complexity: calculateComplexity(slug),
      reasons: data.reasons.slice(0, 4),
      watchouts: data.watchouts.length > 0 ? data.watchouts.slice(0, 2) : undefined,
    });
  }

  return {
    wizardType: 'erp',
    top2,
    notes: ['These are fit-based suggestions, not vendor-sponsored.'],
  };
}

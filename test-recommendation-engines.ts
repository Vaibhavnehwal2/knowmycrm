#!/usr/bin/env ts-node

import { recommendCRM, recommendERP, CRMAnswers, ERPAnswers, Recommendation } from './lib/fitment';

// Test function to validate recommendations
function validateCRMRecommendation(
  result: any, 
  testName: string, 
  expectedSalesforce: boolean = true
): boolean {
  console.log(`\n📊 CRM Test Results for ${testName}:`);
  
  let allPassed = true;
  
  // Check exactly 2 recommendations
  if (result.top2.length === 2) {
    console.log('  ✅ Exactly 2 recommendations returned');
  } else {
    console.log(`  ❌ Expected 2 recommendations, got ${result.top2.length}`);
    allPassed = false;
  }
  
  // Check Salesforce is always included
  const salesforceIncluded = result.top2.some((rec: Recommendation) => rec.slug === 'salesforce');
  if (expectedSalesforce) {
    if (salesforceIncluded) {
      console.log('  ✅ Salesforce included in recommendations');
    } else {
      console.log('  ❌ Salesforce NOT included in recommendations');
      allPassed = false;
    }
  }
  
  // Check exactly 3 reasons per recommendation
  result.top2.forEach((rec: Recommendation, idx: number) => {
    if (rec.reasons.length === 3) {
      console.log(`  ✅ Recommendation ${idx + 1} (${rec.name}) has exactly 3 reasons`);
    } else {
      console.log(`  ❌ Recommendation ${idx + 1} (${rec.name}) has ${rec.reasons.length} reasons, expected 3`);
      allPassed = false;
    }
  });
  
  // Print recommendations
  console.log('\n🏆 Top 2 Recommendations:');
  result.top2.forEach((rec: Recommendation, idx: number) => {
    console.log(`  ${idx + 1}. ${rec.name} (Score: ${rec.score}, Complexity: ${rec.complexity})`);
    console.log('     Reasons:');
    rec.reasons.forEach((reason: string) => console.log(`       - ${reason}`));
    if (rec.watchouts && rec.watchouts.length > 0) {
      console.log('     Watchouts:');
      rec.watchouts.forEach((w: string) => console.log(`       ⚠️ ${w}`));
    }
  });
  
  console.log(`\n🎯 Test Status: ${allPassed ? 'PASSED' : 'FAILED'}`);
  return allPassed;
}

function validateERPRecommendation(
  result: any, 
  testName: string, 
  expectedTypes: string[] = []
): boolean {
  console.log(`\n📊 ERP Test Results for ${testName}:`);
  
  let allPassed = true;
  
  // Check exactly 2 recommendations
  if (result.top2.length === 2) {
    console.log('  ✅ Exactly 2 recommendations returned');
  } else {
    console.log(`  ❌ Expected 2 recommendations, got ${result.top2.length}`);
    allPassed = false;
  }
  
  // Check exactly 3 reasons per recommendation
  result.top2.forEach((rec: Recommendation, idx: number) => {
    if (rec.reasons.length === 3) {
      console.log(`  ✅ Recommendation ${idx + 1} (${rec.name}) has exactly 3 reasons`);
    } else {
      console.log(`  ❌ Recommendation ${idx + 1} (${rec.name}) has ${rec.reasons.length} reasons, expected 3`);
      allPassed = false;
    }
  });
  
  // Check specific ERP types if provided
  if (expectedTypes.length > 0) {
    const hasExpectedERP = result.top2.some((rec: Recommendation) => expectedTypes.includes(rec.slug));
    if (hasExpectedERP) {
      console.log('  ✅ Expected ERP type included');
    } else {
      console.log('  ❌ No expected ERP type in recommendations');
      allPassed = false;
    }
  }
  
  // Print recommendations
  console.log('\n🏆 Top 2 Recommendations:');
  result.top2.forEach((rec: Recommendation, idx: number) => {
    console.log(`  ${idx + 1}. ${rec.name} (Score: ${rec.score}, Complexity: ${rec.complexity})`);
    console.log('     Reasons:');
    rec.reasons.forEach((reason: string) => console.log(`       - ${reason}`));
    if (rec.watchouts && rec.watchouts.length > 0) {
      console.log('     Watchouts:');
      rec.watchouts.forEach((w: string) => console.log(`       ⚠️ ${w}`));
    }
  });
  
  console.log(`\n🎯 Test Status: ${allPassed ? 'PASSED' : 'FAILED'}`);
  return allPassed;
}

async function main() {
  console.log("🚀 TESTING RECOMMENDATION ENGINES DIRECTLY");
  console.log("=".repeat(60));
  
  let testResults: { [key: string]: boolean } = {};
  
  // ============================================================
  // CRM RECOMMENDATION TESTS
  // ============================================================
  
  console.log("\n🔍 TESTING CRM RECOMMENDATION ENGINE");
  console.log("=" * 50);
  
  // Test Case 1: Minimal inputs - should always include Salesforce
  console.log("\n📝 Test Case 1: Minimal CRM inputs");
  const testDataMinimal: CRMAnswers = {
    industry: "technology",
    companySize: "11-50", 
    regions: ["us"],
    salesModel: "b2b",
    salesCycle: "medium",
    pipelineComplexity: "simple",
    functionalNeeds: ["lead-mgmt"],
    integrations: ["email-calendar"],
    roleComplexity: "low",
    reportingDepth: "basic",
    dataMaturity: "basic",
    budgetRange: "mid",
    timeline: "1-3-months",
    internalOwner: "sales",
    name: "John Doe",
    email: "john@example.com",
    company: "Test Company",
    role: "Sales Manager"
  };
  
  try {
    const resultMinimal = recommendCRM(testDataMinimal);
    testResults['crm_minimal'] = validateCRMRecommendation(resultMinimal, "minimal");
  } catch (error) {
    console.log(`❌ CRM minimal test error: ${error}`);
    testResults['crm_minimal'] = false;
  }
  
  // Test Case 2: Complex inputs - CPQ + high roleComplexity + many integrations
  console.log("\n📝 Test Case 2: Complex CRM inputs (CPQ + High Complexity)");
  const testDataComplex: CRMAnswers = {
    industry: "manufacturing",
    companySize: "201-1000",
    regions: ["us", "eu", "apac"],
    salesModel: "b2b",
    salesCycle: "long",
    pipelineComplexity: "complex",
    functionalNeeds: ["cpq", "approvals", "field-service", "service-desk"],
    integrations: ["email-calendar", "erp-sync", "bi", "e-signature", "document-mgmt"],
    roleComplexity: "high",
    reportingDepth: "executive",
    dataMaturity: "advanced",
    budgetRange: "high",
    timeline: "6+-months",
    internalOwner: "it",
    name: "Jane Smith",
    email: "jane@enterprise.com", 
    company: "Enterprise Corp",
    role: "CTO"
  };
  
  try {
    const resultComplex = recommendCRM(testDataComplex);
    testResults['crm_complex'] = validateCRMRecommendation(resultComplex, "complex");
    
    // Additional validation for complex scenario - check Salesforce reasons adapt
    const salesforceRec = resultComplex.top2.find((rec: Recommendation) => rec.slug === 'salesforce');
    if (salesforceRec) {
      const hasCPQReason = salesforceRec.reasons.some((r: string) => r.toLowerCase().includes('cpq'));
      const hasGovernanceReason = salesforceRec.reasons.some((r: string) => r.toLowerCase().includes('role') || r.toLowerCase().includes('governance'));
      const hasIntegrationReason = salesforceRec.reasons.some((r: string) => r.toLowerCase().includes('integration') || r.toLowerCase().includes('api'));
      
      console.log(`\n🔍 Complex Scenario - Salesforce Reason Adaptation:`);
      if (hasCPQReason) console.log('  ✅ CPQ-specific reason included');
      if (hasGovernanceReason) console.log('  ✅ Governance/role-specific reason included');  
      if (hasIntegrationReason) console.log('  ✅ Integration-specific reason included');
    }
  } catch (error) {
    console.log(`❌ CRM complex test error: ${error}`);
    testResults['crm_complex'] = false;
  }
  
  // Test Case 3: HubSpot-favoring scenario
  console.log("\n📝 Test Case 3: HubSpot-favoring scenario");
  const testDataHubspot: CRMAnswers = {
    industry: "software",
    companySize: "1-10",
    regions: ["us"],
    salesModel: "b2c",
    salesCycle: "short", 
    pipelineComplexity: "simple",
    functionalNeeds: ["lead-mgmt", "marketing"],
    integrations: ["email-calendar"],
    roleComplexity: "low", 
    reportingDepth: "basic",
    dataMaturity: "basic",
    budgetRange: "low",
    timeline: "asap",
    internalOwner: "marketing",
    name: "Bob Wilson",
    email: "bob@startup.com",
    company: "Startup Inc",
    role: "Founder"
  };
  
  try {
    const resultHubspot = recommendCRM(testDataHubspot);
    testResults['crm_hubspot'] = validateCRMRecommendation(resultHubspot, "hubspot_favorable");
  } catch (error) {
    console.log(`❌ CRM HubSpot test error: ${error}`);
    testResults['crm_hubspot'] = false;
  }
  
  // ============================================================
  // ERP RECOMMENDATION TESTS
  // ============================================================
  
  console.log("\n🔍 TESTING ERP RECOMMENDATION ENGINE");
  console.log("=" * 50);
  
  // Test Case 1: Manufacturing scenario
  console.log("\n📝 Test Case 1: Manufacturing ERP scenario");
  const testDataManufacturing: ERPAnswers = {
    industry: "manufacturing",
    companySize: "201-1000",
    regions: ["us", "mexico"],
    legalEntities: "multi",
    businessType: "manufacturing", 
    multiWarehouse: "yes",
    multiCurrency: "yes",
    coreModules: ["finance", "inventory", "production", "procurement"],
    complexityFlags: ["batch-lot", "serial", "advanced-pricing"],
    complianceNeeds: "strict",
    crmIntegration: "yes",
    crmName: "Salesforce",
    erpIntegrations: ["bi", "crm-sync", "e-commerce"],
    deploymentPreference: "cloud",
    budgetRange: "high",
    timeline: "6+-months",
    name: "Mike Johnson",
    email: "mike@manufacturing.com",
    company: "Manufacturing Corp",
    role: "Operations Director"
  };
  
  try {
    const resultManufacturing = recommendERP(testDataManufacturing);
    const manufacturingERPs = ['dynamics-365-finance-operations', 'sap-s4hana', 'netsuite', 'sap-business-one'];
    testResults['erp_manufacturing'] = validateERPRecommendation(resultManufacturing, "manufacturing", manufacturingERPs);
  } catch (error) {
    console.log(`❌ ERP manufacturing test error: ${error}`);
    testResults['erp_manufacturing'] = false;
  }
  
  // Test Case 2: Services + Projects scenario
  console.log("\n📝 Test Case 2: Services + Projects ERP scenario");
  const testDataServices: ERPAnswers = {
    industry: "professional-services", 
    companySize: "51-200",
    regions: ["us"],
    legalEntities: "single",
    businessType: "services",
    multiWarehouse: "no",
    multiCurrency: "no", 
    coreModules: ["finance", "project-mgmt", "time-tracking"],
    complexityFlags: ["project-costing"],
    complianceNeeds: "moderate",
    crmIntegration: "yes",
    crmName: "HubSpot",
    erpIntegrations: ["bi", "payroll"],
    deploymentPreference: "cloud",
    budgetRange: "mid",
    timeline: "3-6-months",
    name: "Sarah Davis",
    email: "sarah@services.com",
    company: "Professional Services LLC",
    role: "CFO"
  };
  
  try {
    const resultServices = recommendERP(testDataServices);
    const servicesERPs = ['netsuite', 'dynamics-365-business-central', 'odoo'];
    testResults['erp_services'] = validateERPRecommendation(resultServices, "services", servicesERPs);
  } catch (error) {
    console.log(`❌ ERP services test error: ${error}`);
    testResults['erp_services'] = false;
  }
  
  // Test Case 3: Small business scenario
  console.log("\n📝 Test Case 3: Small business ERP scenario");
  const testDataSmall: ERPAnswers = {
    industry: "retail",
    companySize: "11-50",
    regions: ["us"],
    legalEntities: "single",
    businessType: "distribution",
    multiWarehouse: "no",
    multiCurrency: "no",
    coreModules: ["finance", "inventory"],
    complexityFlags: [],
    complianceNeeds: "basic",
    crmIntegration: "no",
    erpIntegrations: ["email-calendar"],
    deploymentPreference: "cloud",
    budgetRange: "low",
    timeline: "1-3-months",
    name: "Tom Brown",
    email: "tom@smallbiz.com", 
    company: "Small Business Inc",
    role: "Owner"
  };
  
  try {
    const resultSmall = recommendERP(testDataSmall);
    const smallERPs = ['odoo', 'quickbooks-tally', 'dynamics-365-business-central'];
    testResults['erp_small'] = validateERPRecommendation(resultSmall, "small_business", smallERPs);
  } catch (error) {
    console.log(`❌ ERP small business test error: ${error}`);
    testResults['erp_small'] = false;
  }
  
  // ============================================================
  // FINAL RESULTS
  // ============================================================
  
  console.log("\n" + "=" * 60);
  console.log("🏁 RECOMMENDATION ENGINE TEST SUMMARY");
  console.log("=" * 60);
  
  const totalTests = Object.keys(testResults).length;
  const passedTests = Object.values(testResults).filter(result => result).length;
  
  for (const [testName, result] of Object.entries(testResults)) {
    const status = result ? "✅ PASSED" : "❌ FAILED";
    console.log(`${testName.replace('_', ' ').toUpperCase()}: ${status}`);
  }
  
  console.log(`\nOverall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log("🎉 ALL RECOMMENDATION ENGINE TESTS PASSED!");
    return true;
  } else {
    console.log("⚠️ Some recommendation engine tests failed");
    return false;
  }
}

// Execute the tests
main().catch(console.error);
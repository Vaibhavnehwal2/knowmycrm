// Test script to test recommendation engines
const { recommendCRM, recommendERP } = require('../lib/fitment.ts');

async function testCRMEngine() {
  console.log('\n🔍 TESTING CRM RECOMMENDATION ENGINE');
  console.log('='.repeat(50));

  // Test Case 1: Minimal inputs - should always include Salesforce
  console.log('\n📝 Test Case 1: Minimal CRM inputs');
  const testDataMinimal = {
    industry: 'technology',
    companySize: '11-50', 
    regions: ['us'],
    salesModel: 'b2b',
    salesCycle: 'medium',
    pipelineComplexity: 'simple',
    functionalNeeds: ['lead-mgmt'],
    integrations: ['email-calendar'],
    roleComplexity: 'low',
    reportingDepth: 'basic',
    dataMaturity: 'basic',
    budgetRange: 'mid',
    timeline: '1-3-months',
    internalOwner: 'sales',
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Test Company',
    role: 'Sales Manager'
  };
  
  try {
    const result = recommendCRM(testDataMinimal);
    
    // Validations
    const validations = [];
    
    // Check exactly 2 recommendations
    if (result.top2.length === 2) {
      validations.push('✅ Exactly 2 recommendations returned');
    } else {
      validations.push(`❌ Expected 2 recommendations, got ${result.top2.length}`);
    }
    
    // Check Salesforce is always included
    const salesforceIncluded = result.top2.some(rec => rec.slug === 'salesforce');
    if (salesforceIncluded) {
      validations.push('✅ Salesforce included in recommendations');
    } else {
      validations.push('❌ Salesforce NOT included in recommendations');
    }
    
    // Check exactly 3 reasons per recommendation
    let reasonsValid = true;
    result.top2.forEach((rec, idx) => {
      if (rec.reasons.length === 3) {
        validations.push(`✅ Recommendation ${idx + 1} (${rec.name}) has exactly 3 reasons`);
      } else {
        validations.push(`❌ Recommendation ${idx + 1} (${rec.name}) has ${rec.reasons.length} reasons, expected 3`);
        reasonsValid = false;
      }
    });
    
    // Print results
    console.log('\n📊 CRM Test Results for minimal:');
    validations.forEach(v => console.log('  ', v));
    
    console.log('\n🏆 Top 2 Recommendations:');
    result.top2.forEach((rec, idx) => {
      console.log(`  ${idx + 1}. ${rec.name} (Score: ${rec.score}, Complexity: ${rec.complexity})`);
      console.log('     Reasons:');
      rec.reasons.forEach(reason => console.log(`       - ${reason}`));
      if (rec.watchouts && rec.watchouts.length > 0) {
        console.log('     Watchouts:');
        rec.watchouts.forEach(w => console.log(`       ⚠️ ${w}`));
      }
    });
    
    // Return success status
    const success = result.top2.length === 2 && salesforceIncluded && reasonsValid;
    console.log(`\n🎯 Test Status: ${success ? 'PASSED' : 'FAILED'}`);
    return success;
    
  } catch (error) {
    console.error('❌ CRM Test Error:', error.message);
    console.log('🎯 Test Status: FAILED');
    return false;
  }
}

async function testERPEngine() {
  console.log('\n🔍 TESTING ERP RECOMMENDATION ENGINE');  
  console.log('='.repeat(50));

  // Test Case: Manufacturing scenario
  console.log('\n📝 Test Case: Manufacturing ERP scenario');
  const testDataManufacturing = {
    industry: 'manufacturing',
    companySize: '201-1000',
    regions: ['us', 'mexico'],
    legalEntities: 'multi',
    businessType: 'manufacturing', 
    multiWarehouse: 'yes',
    multiCurrency: 'yes',
    coreModules: ['finance', 'inventory', 'production', 'procurement'],
    complexityFlags: ['batch-lot', 'serial', 'advanced-pricing'],
    complianceNeeds: 'strict',
    crmIntegration: 'yes',
    crmName: 'Salesforce',
    erpIntegrations: ['bi', 'crm-sync', 'e-commerce'],
    deploymentPreference: 'cloud',
    budgetRange: 'high',
    timeline: '6+-months',
    name: 'Mike Johnson',
    email: 'mike@manufacturing.com',
    company: 'Manufacturing Corp',
    role: 'Operations Director'
  };
  
  try {
    const result = recommendERP(testDataManufacturing);
    
    // Validations
    const validations = [];
    
    // Check exactly 2 recommendations
    if (result.top2.length === 2) {
      validations.push('✅ Exactly 2 recommendations returned');
    } else {
      validations.push(`❌ Expected 2 recommendations, got ${result.top2.length}`);
    }
    
    // Check exactly 3 reasons per recommendation
    let reasonsValid = true;
    result.top2.forEach((rec, idx) => {
      if (rec.reasons.length === 3) {
        validations.push(`✅ Recommendation ${idx + 1} (${rec.name}) has exactly 3 reasons`);
      } else {
        validations.push(`❌ Recommendation ${idx + 1} (${rec.name}) has ${rec.reasons.length} reasons, expected 3`);
        reasonsValid = false;
      }
    });
    
    // Check manufacturing-suitable ERPs
    const manufacturingERPs = ['dynamics-365-finance-operations', 'sap-s4hana', 'netsuite', 'sap-business-one'];
    const hasManufacturingERP = result.top2.some(rec => manufacturingERPs.includes(rec.slug));
    if (hasManufacturingERP) {
      validations.push('✅ Manufacturing-suitable ERP included');
    } else {
      validations.push('❌ No manufacturing-suitable ERP in recommendations');
    }
    
    // Print results
    console.log('\n📊 ERP Test Results for manufacturing:');
    validations.forEach(v => console.log('  ', v));
    
    console.log('\n🏆 Top 2 Recommendations:');
    result.top2.forEach((rec, idx) => {
      console.log(`  ${idx + 1}. ${rec.name} (Score: ${rec.score}, Complexity: ${rec.complexity})`);
      console.log('     Reasons:');
      rec.reasons.forEach(reason => console.log(`       - ${reason}`));
      if (rec.watchouts && rec.watchouts.length > 0) {
        console.log('     Watchouts:');
        rec.watchouts.forEach(w => console.log(`       ⚠️ ${w}`));
      }
    });
    
    // Return success status
    const success = result.top2.length === 2 && reasonsValid && hasManufacturingERP;
    console.log(`\n🎯 Test Status: ${success ? 'PASSED' : 'FAILED'}`);
    return success;
    
  } catch (error) {
    console.error('❌ ERP Test Error:', error.message);
    console.log('🎯 Test Status: FAILED');
    return false;
  }
}

async function main() {
  console.log('🚀 TESTING RECOMMENDATION ENGINES');
  console.log('='.repeat(50));
  
  const crmResult = await testCRMEngine();
  const erpResult = await testERPEngine();
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 FINAL RESULTS');
  console.log('='.repeat(50));
  
  console.log(`CRM Engine: ${crmResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`ERP Engine: ${erpResult ? '✅ PASSED' : '❌ FAILED'}`);
  
  const allPassed = crmResult && erpResult;
  console.log(`\nOverall: ${allPassed ? '🎉 ALL TESTS PASSED' : '⚠️ Some tests failed'}`);
  
  return allPassed;
}

module.exports = { main };

// Run if called directly
if (require.main === module) {
  main().then(success => {
    process.exit(success ? 0 : 1);
  });
}
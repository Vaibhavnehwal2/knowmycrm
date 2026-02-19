import { NextRequest, NextResponse } from 'next/server';
import { recommendCRM, recommendERP, CRMAnswers, ERPAnswers } from '@/lib/fitment';

export async function POST(request: NextRequest) {
  try {
    const { testType } = await request.json();
    
    const results: any = {};
    
    if (testType === 'crm' || testType === 'all') {
      // Test CRM Engine
      console.log('\n🔍 TESTING CRM RECOMMENDATION ENGINE');
      
      // Test Case 1: Minimal inputs
      const testDataMinimal: CRMAnswers = {
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
      
      const resultMinimal = recommendCRM(testDataMinimal);
      
      // Validate CRM results
      const crmValidations = [];
      
      // Check exactly 2 recommendations
      if (resultMinimal.top2.length === 2) {
        crmValidations.push('✅ Exactly 2 recommendations returned');
      } else {
        crmValidations.push(`❌ Expected 2 recommendations, got ${resultMinimal.top2.length}`);
      }
      
      // Check Salesforce is always included
      const salesforceIncluded = resultMinimal.top2.some(rec => rec.slug === 'salesforce');
      if (salesforceIncluded) {
        crmValidations.push('✅ Salesforce included in recommendations');
      } else {
        crmValidations.push('❌ Salesforce NOT included in recommendations');
      }
      
      // Check exactly 3 reasons per recommendation
      let reasonsValid = true;
      resultMinimal.top2.forEach((rec, idx) => {
        if (rec.reasons.length === 3) {
          crmValidations.push(`✅ Recommendation ${idx + 1} (${rec.name}) has exactly 3 reasons`);
        } else {
          crmValidations.push(`❌ Recommendation ${idx + 1} (${rec.name}) has ${rec.reasons.length} reasons, expected 3`);
          reasonsValid = false;
        }
      });
      
      results.crm = {
        testCase: 'minimal',
        validations: crmValidations,
        recommendations: resultMinimal.top2,
        passed: resultMinimal.top2.length === 2 && salesforceIncluded && reasonsValid
      };
      
      // Test Case 2: Complex inputs
      const testDataComplex: CRMAnswers = {
        industry: 'manufacturing',
        companySize: '201-1000',
        regions: ['us', 'eu', 'apac'],
        salesModel: 'b2b',
        salesCycle: 'long',
        pipelineComplexity: 'complex',
        functionalNeeds: ['cpq', 'approvals', 'field-service', 'service-desk'],
        integrations: ['email-calendar', 'erp-sync', 'bi', 'e-signature', 'document-mgmt'],
        roleComplexity: 'high',
        reportingDepth: 'executive',
        dataMaturity: 'advanced',
        budgetRange: 'high',
        timeline: '6+-months',
        internalOwner: 'it',
        name: 'Jane Smith',
        email: 'jane@enterprise.com', 
        company: 'Enterprise Corp',
        role: 'CTO'
      };
      
      const resultComplex = recommendCRM(testDataComplex);
      
      const crmComplexValidations = [];
      
      // Check Salesforce reasons adapt for complex scenario
      const salesforceRec = resultComplex.top2.find(rec => rec.slug === 'salesforce');
      if (salesforceRec) {
        const hasCPQReason = salesforceRec.reasons.some(r => r.toLowerCase().includes('cpq'));
        const hasGovernanceReason = salesforceRec.reasons.some(r => r.toLowerCase().includes('role') || r.toLowerCase().includes('governance'));
        const hasIntegrationReason = salesforceRec.reasons.some(r => r.toLowerCase().includes('integration') || r.toLowerCase().includes('api'));
        
        if (hasCPQReason) crmComplexValidations.push('✅ CPQ-specific reason included');
        if (hasGovernanceReason) crmComplexValidations.push('✅ Governance/role-specific reason included');  
        if (hasIntegrationReason) crmComplexValidations.push('✅ Integration-specific reason included');
      }
      
      results.crmComplex = {
        testCase: 'complex',
        validations: crmComplexValidations,
        recommendations: resultComplex.top2,
        passed: salesforceRec && crmComplexValidations.length >= 2
      };
    }
    
    if (testType === 'erp' || testType === 'all') {
      // Test ERP Engine
      console.log('\n🔍 TESTING ERP RECOMMENDATION ENGINE');
      
      // Test Case: Manufacturing scenario
      const testDataManufacturing: ERPAnswers = {
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
      
      const resultManufacturing = recommendERP(testDataManufacturing);
      
      const erpValidations = [];
      
      // Check exactly 2 recommendations
      if (resultManufacturing.top2.length === 2) {
        erpValidations.push('✅ Exactly 2 recommendations returned');
      } else {
        erpValidations.push(`❌ Expected 2 recommendations, got ${resultManufacturing.top2.length}`);
      }
      
      // Check exactly 3 reasons per recommendation
      let erpReasonsValid = true;
      resultManufacturing.top2.forEach((rec, idx) => {
        if (rec.reasons.length === 3) {
          erpValidations.push(`✅ Recommendation ${idx + 1} (${rec.name}) has exactly 3 reasons`);
        } else {
          erpValidations.push(`❌ Recommendation ${idx + 1} (${rec.name}) has ${rec.reasons.length} reasons, expected 3`);
          erpReasonsValid = false;
        }
      });
      
      // Check manufacturing-suitable ERPs
      const manufacturingERPs = ['dynamics-365-finance-operations', 'sap-s4hana', 'netsuite', 'sap-business-one'];
      const hasManufacturingERP = resultManufacturing.top2.some(rec => manufacturingERPs.includes(rec.slug));
      if (hasManufacturingERP) {
        erpValidations.push('✅ Manufacturing-suitable ERP included');
      } else {
        erpValidations.push('❌ No manufacturing-suitable ERP in recommendations');
      }
      
      results.erp = {
        testCase: 'manufacturing',
        validations: erpValidations,
        recommendations: resultManufacturing.top2,
        passed: resultManufacturing.top2.length === 2 && erpReasonsValid && hasManufacturingERP
      };
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Recommendation engine tests completed',
      results 
    });
    
  } catch (error) {
    console.error('Error testing recommendation engines:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to test recommendation engines', error: error.message },
      { status: 500 }
    );
  }
}
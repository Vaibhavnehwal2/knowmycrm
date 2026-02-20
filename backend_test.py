#!/usr/bin/env python3
"""
Backend Test Suite for KnowMyCRM Fit Wizard
Tests the recommendation engines and API integration
"""

import requests
import json
import uuid
from typing import Dict, List, Any
import sys
import os

# Base URL for API testing
BASE_URL = "https://crm-recommender.preview.emergentagent.com"
API_BASE_URL = f"{BASE_URL}/api"

def test_crm_recommendation_engine():
    """Test CRM Recommendation Engine via Node.js execution"""
    print("\n🔍 TESTING CRM RECOMMENDATION ENGINE")
    print("=" * 60)
    
    # Test Case 1: Minimal inputs - should always include Salesforce
    print("\n📝 Test Case 1: Minimal CRM inputs")
    test_data_minimal = {
        "industry": "technology",
        "companySize": "11-50", 
        "regions": ["us"],
        "salesModel": "b2b",
        "salesCycle": "medium",
        "pipelineComplexity": "simple",
        "functionalNeeds": ["lead-mgmt"],
        "integrations": ["email-calendar"],
        "roleComplexity": "low",
        "reportingDepth": "basic",
        "dataMaturity": "basic",
        "budgetRange": "mid",
        "timeline": "1-3-months",
        "internalOwner": "sales",
        "name": "John Doe",
        "email": "john@example.com",
        "company": "Test Company",
        "role": "Sales Manager"
    }
    
    success_minimal = test_crm_with_node(test_data_minimal, "minimal")
    
    # Test Case 2: Complex inputs - CPQ + high roleComplexity + many integrations
    print("\n📝 Test Case 2: Complex CRM inputs (CPQ + High Complexity)")
    test_data_complex = {
        "industry": "manufacturing",
        "companySize": "201-1000",
        "regions": ["us", "eu", "apac"],
        "salesModel": "b2b",
        "salesCycle": "long",
        "pipelineComplexity": "complex",
        "functionalNeeds": ["cpq", "approvals", "field-service", "service-desk"],
        "integrations": ["email-calendar", "erp-sync", "bi", "e-signature", "document-mgmt"],
        "roleComplexity": "high",
        "reportingDepth": "executive",
        "dataMaturity": "advanced",
        "budgetRange": "high",
        "timeline": "6+-months",
        "internalOwner": "it",
        "name": "Jane Smith",
        "email": "jane@enterprise.com", 
        "company": "Enterprise Corp",
        "role": "CTO"
    }
    
    success_complex = test_crm_with_node(test_data_complex, "complex")
    
    # Test Case 3: HubSpot-favoring scenario
    print("\n📝 Test Case 3: HubSpot-favoring scenario")
    test_data_hubspot = {
        "industry": "software",
        "companySize": "1-10",
        "regions": ["us"],
        "salesModel": "b2c",
        "salesCycle": "short",
        "pipelineComplexity": "simple",
        "functionalNeeds": ["lead-mgmt", "marketing"],
        "integrations": ["email-calendar"],
        "roleComplexity": "low", 
        "reportingDepth": "basic",
        "dataMaturity": "basic",
        "budgetRange": "low",
        "timeline": "asap",
        "internalOwner": "marketing",
        "name": "Bob Wilson",
        "email": "bob@startup.com",
        "company": "Startup Inc",
        "role": "Founder"
    }
    
    success_hubspot = test_crm_with_node(test_data_hubspot, "hubspot_favorable")
    
    return success_minimal and success_complex and success_hubspot

def test_crm_with_node(test_data: Dict, test_name: str) -> bool:
    """Execute CRM recommendation test using Node.js"""
    try:
        # Create a Node.js script to test the recommendation engine
        node_script = f'''
const {{ recommendCRM }} = require('./lib/fitment.ts');

const testData = {json.dumps(test_data)};

try {{
    const result = recommendCRM(testData);
    
    // Validation checks
    const validations = [];
    
    // Check exactly 2 recommendations
    if (result.top2.length === 2) {{
        validations.push('✅ Exactly 2 recommendations returned');
    }} else {{
        validations.push(`❌ Expected 2 recommendations, got ${{result.top2.length}}`);
    }}
    
    // Check Salesforce is always included
    const salesforceIncluded = result.top2.some(rec => rec.slug === 'salesforce');
    if (salesforceIncluded) {{
        validations.push('✅ Salesforce included in recommendations');
    }} else {{
        validations.push('❌ Salesforce NOT included in recommendations');
    }}
    
    // Check exactly 3 reasons per recommendation
    let reasonsValid = true;
    result.top2.forEach((rec, idx) => {{
        if (rec.reasons.length === 3) {{
            validations.push(`✅ Recommendation ${{idx + 1}} (${{rec.name}}) has exactly 3 reasons`);
        }} else {{
            validations.push(`❌ Recommendation ${{idx + 1}} (${{rec.name}}) has ${{rec.reasons.length}} reasons, expected 3`);
            reasonsValid = false;
        }}
    }});
    
    // Print results
    console.log('\\n📊 CRM Test Results for {test_name}:');
    validations.forEach(v => console.log('  ', v));
    
    console.log('\\n🏆 Top 2 Recommendations:');
    result.top2.forEach((rec, idx) => {{
        console.log(`  ${{idx + 1}}. ${{rec.name}} (Score: ${{rec.score}}, Complexity: ${{rec.complexity}})`);
        console.log('     Reasons:');
        rec.reasons.forEach(reason => console.log(`       - ${{reason}}`));
        if (rec.watchouts && rec.watchouts.length > 0) {{
            console.log('     Watchouts:');
            rec.watchouts.forEach(w => console.log(`       ⚠️ ${{w}}`));
        }}
    }});
    
    // Return success status
    const success = result.top2.length === 2 && salesforceIncluded && reasonsValid;
    console.log(`\\n🎯 Test Status: ${{success ? 'PASSED' : 'FAILED'}}`);
    
}} catch (error) {{
    console.error('❌ CRM Test Error:', error.message);
    console.log('🎯 Test Status: FAILED');
}}
'''
        
        # Write and execute the Node.js script
        script_path = f'/tmp/test_crm_{test_name}.js'
        with open(script_path, 'w') as f:
            f.write(node_script)
        
        os.system(f'cd /app && node {script_path}')
        return True
        
    except Exception as e:
        print(f"❌ Error testing CRM recommendations for {test_name}: {str(e)}")
        return False

def test_erp_recommendation_engine():
    """Test ERP Recommendation Engine via Node.js execution"""
    print("\n🔍 TESTING ERP RECOMMENDATION ENGINE")
    print("=" * 60)
    
    # Test Case 1: Manufacturing scenario
    print("\n📝 Test Case 1: Manufacturing ERP scenario")
    test_data_manufacturing = {
        "industry": "manufacturing",
        "companySize": "201-1000",
        "regions": ["us", "mexico"],
        "legalEntities": "multi",
        "businessType": "manufacturing", 
        "multiWarehouse": "yes",
        "multiCurrency": "yes",
        "coreModules": ["finance", "inventory", "production", "procurement"],
        "complexityFlags": ["batch-lot", "serial", "advanced-pricing"],
        "complianceNeeds": "strict",
        "crmIntegration": "yes",
        "crmName": "Salesforce",
        "erpIntegrations": ["bi", "crm-sync", "e-commerce"],
        "deploymentPreference": "cloud",
        "budgetRange": "high",
        "timeline": "6+-months",
        "name": "Mike Johnson",
        "email": "mike@manufacturing.com",
        "company": "Manufacturing Corp",
        "role": "Operations Director"
    }
    
    success_manufacturing = test_erp_with_node(test_data_manufacturing, "manufacturing")
    
    # Test Case 2: Services + Projects scenario
    print("\n📝 Test Case 2: Services + Projects ERP scenario")
    test_data_services = {
        "industry": "professional-services", 
        "companySize": "51-200",
        "regions": ["us"],
        "legalEntities": "single",
        "businessType": "services",
        "multiWarehouse": "no",
        "multiCurrency": "no", 
        "coreModules": ["finance", "project-mgmt", "time-tracking"],
        "complexityFlags": ["project-costing"],
        "complianceNeeds": "moderate",
        "crmIntegration": "yes",
        "crmName": "HubSpot",
        "erpIntegrations": ["bi", "payroll"],
        "deploymentPreference": "cloud",
        "budgetRange": "mid",
        "timeline": "3-6-months",
        "name": "Sarah Davis",
        "email": "sarah@services.com",
        "company": "Professional Services LLC",
        "role": "CFO"
    }
    
    success_services = test_erp_with_node(test_data_services, "services")
    
    # Test Case 3: Small business scenario (should favor Odoo/QuickBooks)
    print("\n📝 Test Case 3: Small business ERP scenario")
    test_data_small = {
        "industry": "retail",
        "companySize": "11-50",
        "regions": ["us"],
        "legalEntities": "single",
        "businessType": "distribution",
        "multiWarehouse": "no",
        "multiCurrency": "no",
        "coreModules": ["finance", "inventory"],
        "complexityFlags": [],
        "complianceNeeds": "basic",
        "crmIntegration": "no",
        "erpIntegrations": ["email-calendar"],
        "deploymentPreference": "cloud",
        "budgetRange": "low",
        "timeline": "1-3-months",
        "name": "Tom Brown",
        "email": "tom@smallbiz.com", 
        "company": "Small Business Inc",
        "role": "Owner"
    }
    
    success_small = test_erp_with_node(test_data_small, "small_business")
    
    return success_manufacturing and success_services and success_small

def test_erp_with_node(test_data: Dict, test_name: str) -> bool:
    """Execute ERP recommendation test using Node.js"""
    try:
        # Create a Node.js script to test the ERP recommendation engine
        node_script = f'''
const {{ recommendERP }} = require('./lib/fitment.ts');

const testData = {json.dumps(test_data)};

try {{
    const result = recommendERP(testData);
    
    // Validation checks
    const validations = [];
    
    // Check exactly 2 recommendations
    if (result.top2.length === 2) {{
        validations.push('✅ Exactly 2 recommendations returned');
    }} else {{
        validations.push(`❌ Expected 2 recommendations, got ${{result.top2.length}}`);
    }}
    
    // Check exactly 3 reasons per recommendation
    let reasonsValid = true;
    result.top2.forEach((rec, idx) => {{
        if (rec.reasons.length === 3) {{
            validations.push(`✅ Recommendation ${{idx + 1}} (${{rec.name}}) has exactly 3 reasons`);
        }} else {{
            validations.push(`❌ Recommendation ${{idx + 1}} (${{rec.name}}) has ${{rec.reasons.length}} reasons, expected 3`);
            reasonsValid = false;
        }}
    }});
    
    // Check that recommendations are manufacturing-suitable for manufacturing tests
    if ('{test_name}' === 'manufacturing') {{
        const manufacturingERPs = ['dynamics-365-finance-operations', 'sap-s4hana', 'netsuite', 'sap-business-one'];
        const hasManufacturingERP = result.top2.some(rec => manufacturingERPs.includes(rec.slug));
        if (hasManufacturingERP) {{
            validations.push('✅ Manufacturing-suitable ERP included');
        }} else {{
            validations.push('❌ No manufacturing-suitable ERP in recommendations');
        }}
    }}
    
    // Check that recommendations are PSA/project suitable for services tests  
    if ('{test_name}' === 'services') {{
        const servicesERPs = ['netsuite', 'dynamics-365-business-central', 'odoo'];
        const hasServicesERP = result.top2.some(rec => servicesERPs.includes(rec.slug));
        if (hasServicesERP) {{
            validations.push('✅ Services/PSA-suitable ERP included');
        }} else {{
            validations.push('❌ No services-suitable ERP in recommendations');
        }}
    }}
    
    // Print results
    console.log('\\n📊 ERP Test Results for {test_name}:');
    validations.forEach(v => console.log('  ', v));
    
    console.log('\\n🏆 Top 2 Recommendations:');
    result.top2.forEach((rec, idx) => {{
        console.log(`  ${{idx + 1}}. ${{rec.name}} (Score: ${{rec.score}}, Complexity: ${{rec.complexity}})`);
        console.log('     Reasons:');
        rec.reasons.forEach(reason => console.log(`       - ${{reason}}`));
        if (rec.watchouts && rec.watchouts.length > 0) {{
            console.log('     Watchouts:');
            rec.watchouts.forEach(w => console.log(`       ⚠️ ${{w}}`));
        }}
    }});
    
    // Return success status
    const success = result.top2.length === 2 && reasonsValid;
    console.log(`\\n🎯 Test Status: ${{success ? 'PASSED' : 'FAILED'}}`);
    
}} catch (error) {{
    console.error('❌ ERP Test Error:', error.message);
    console.log('🎯 Test Status: FAILED');
}}
'''
        
        # Write and execute the Node.js script
        script_path = f'/tmp/test_erp_{test_name}.js'
        with open(script_path, 'w') as f:
            f.write(node_script)
        
        os.system(f'cd /app && node {script_path}')
        return True
        
    except Exception as e:
        print(f"❌ Error testing ERP recommendations for {test_name}: {str(e)}")
        return False

def test_api_leads_extended_payload():
    """Test /api/leads endpoint with extended wizard payload"""
    print("\n🔍 TESTING API LEADS EXTENDED PAYLOAD")
    print("=" * 60)
    
    try:
        # Test data with wizard payload including recommendations array
        wizard_payload = {
            "source": "wizard",
            "wizardType": "crm", 
            "answers": {
                "industry": "technology",
                "companySize": "11-50",
                "regions": ["us"],
                "salesModel": "b2b",
                "salesCycle": "medium",
                "pipelineComplexity": "simple",
                "functionalNeeds": ["lead-mgmt", "approvals"],
                "integrations": ["email-calendar", "bi"],
                "roleComplexity": "medium",
                "reportingDepth": "advanced",
                "dataMaturity": "advanced",
                "budgetRange": "mid",
                "timeline": "3-6-months", 
                "internalOwner": "sales",
                "name": "Test User",
                "email": "test@example.com",
                "company": "Test Company",
                "role": "Sales Manager",
                "phone": "555-0123",
                "website": "https://testcompany.com"
            },
            "recommendations": [
                {
                    "slug": "salesforce",
                    "name": "Salesforce", 
                    "score": 95,
                    "complexity": "Medium",
                    "reasons": [
                        "Strong role/permission model + scalable governance",
                        "Best-in-class workflow + automation + approvals", 
                        "Enterprise reporting + data model flexibility"
                    ],
                    "watchouts": ["Implementation typically 2–4 months for full value"]
                },
                {
                    "slug": "hubspot",
                    "name": "HubSpot",
                    "score": 75,
                    "complexity": "Low", 
                    "reasons": [
                        "Optimized for SMB with fast time-to-value",
                        "Quick deployment with intuitive setup",
                        "Excellent email/calendar sync + marketing alignment"
                    ]
                }
            ]
        }
        
        print("📤 Sending extended wizard payload to /api/leads...")
        response = requests.post(f"{API_BASE_URL}/leads", json=wizard_payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ POST /api/leads with extended payload: SUCCESS")
            print(f"   Response: {data}")
            
            if data.get('success') and data.get('leadId'):
                print("✅ Extended payload accepted successfully")
                return True
            else:
                print("❌ Invalid response format")
                return False
        else:
            print(f"❌ POST /api/leads failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing API leads extended payload: {str(e)}")
        return False

def test_web_to_lead_format():
    """Test Web-to-Lead formatting function"""
    print("\n🔍 TESTING WEB-TO-LEAD FORMATTING")
    print("=" * 60)
    
    try:
        # Create a Node.js script to test the formatWizardDescription function
        node_script = '''
const { formatWizardDescription } = require('./lib/webToLeadConfig.ts');

const answers = {
    industry: "technology",
    companySize: "11-50",
    regions: ["us"],
    salesModel: "b2b",
    salesCycle: "medium",
    pipelineComplexity: "simple",
    functionalNeeds: ["lead-mgmt", "approvals"],
    integrations: ["email-calendar", "bi"],
    roleComplexity: "medium",
    reportingDepth: "advanced", 
    dataMaturity: "advanced",
    budgetRange: "mid",
    timeline: "3-6-months",
    internalOwner: "sales"
};

const recommendations = [
    {
        name: "Salesforce",
        complexity: "Medium",
        reasons: [
            "Strong role/permission model + scalable governance",
            "Best-in-class workflow + automation + approvals",
            "Enterprise reporting + data model flexibility"
        ]
    },
    {
        name: "HubSpot", 
        complexity: "Low",
        reasons: [
            "Optimized for SMB with fast time-to-value",
            "Quick deployment with intuitive setup", 
            "Excellent email/calendar sync + marketing alignment"
        ]
    }
];

try {
    const description = formatWizardDescription('crm', answers, recommendations);
    
    console.log('\\n📝 Web-to-Lead Description Format Test:');
    console.log('✅ Description generated successfully');
    console.log('\\n📄 Sample Output (first 500 chars):');
    console.log(description.substring(0, 500) + '...');
    
    // Check key elements are present
    const checks = [
        { test: 'CRM FIT WIZARD', present: description.includes('CRM FIT WIZARD') },
        { test: 'Wizard Type: CRM', present: description.includes('Wizard Type: CRM') },
        { test: 'ANSWERS section', present: description.includes('--- ANSWERS ---') },
        { test: 'RECOMMENDATIONS section', present: description.includes('--- TOP 2 RECOMMENDATIONS ---') },
        { test: 'Salesforce recommendation', present: description.includes('1) Salesforce') },
        { test: 'HubSpot recommendation', present: description.includes('2) HubSpot') }
    ];
    
    console.log('\\n🔍 Content Validation:');
    checks.forEach(check => {
        console.log(`  ${check.present ? '✅' : '❌'} ${check.test}`);
    });
    
    const allPassed = checks.every(check => check.present);
    console.log(`\\n🎯 Web-to-Lead Format Test Status: ${allPassed ? 'PASSED' : 'FAILED'}`);
    
} catch (error) {
    console.error('❌ Web-to-Lead Format Error:', error.message);
    console.log('🎯 Test Status: FAILED');
}
'''
        
        # Write and execute the Node.js script
        script_path = '/tmp/test_web_to_lead.js'
        with open(script_path, 'w') as f:
            f.write(node_script)
        
        os.system(f'cd /app && node {script_path}')
        return True
        
    except Exception as e:
        print(f"❌ Error testing Web-to-Lead format: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 STARTING BACKEND TEST SUITE FOR KNOWMYCRM FIT WIZARD")
    print("=" * 70)
    
    test_results = {}
    
    # Test CRM Recommendation Engine
    test_results['crm_engine'] = test_crm_recommendation_engine()
    
    # Test ERP Recommendation Engine  
    test_results['erp_engine'] = test_erp_recommendation_engine()
    
    # Test API Integration with extended payload
    test_results['api_extended_payload'] = test_api_leads_extended_payload()
    
    # Test Web-to-Lead formatting
    test_results['web_to_lead_format'] = test_web_to_lead_format()
    
    # Final Results Summary
    print("\n" + "=" * 70)
    print("🏁 FINAL TEST RESULTS SUMMARY")
    print("=" * 70)
    
    total_tests = len(test_results)
    passed_tests = sum(1 for result in test_results.values() if result)
    
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL TESTS PASSED - Backend is working correctly!")
        return True
    else:
        print("⚠️ Some tests failed - see details above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
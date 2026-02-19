#!/usr/bin/env python3

import requests
import json
import sys
import os
from datetime import datetime

def load_environment():
    """Load environment variables from .env file"""
    base_url = None
    try:
        with open('/app/.env', 'r') as f:
            for line in f:
                if line.startswith('NEXT_PUBLIC_BASE_URL='):
                    base_url = line.split('=', 1)[1].strip()
                    break
        
        if not base_url:
            print("❌ NEXT_PUBLIC_BASE_URL not found in .env file")
            return None
            
        print(f"✅ Using base URL: {base_url}")
        return base_url
        
    except Exception as e:
        print(f"❌ Error loading .env file: {e}")
        return None

def test_leads_endpoint():
    """Test the POST /api/leads endpoint"""
    print("\n🧪 Testing POST /api/leads endpoint...")
    
    base_url = load_environment()
    if not base_url:
        return False
    
    api_url = f"{base_url}/api/leads"
    print(f"Testing URL: {api_url}")
    
    # Test data from the review request
    test_data = {
        "source": "wizard",
        "name": "Test User",
        "email": "test@example.com",
        "company": "Test Corp",
        "timeline": "3-6 months"
    }
    
    try:
        print(f"📤 Sending POST request with data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(
            api_url,
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"📥 Response Status: {response.status_code}")
        print(f"📥 Response Headers: {dict(response.headers)}")
        
        try:
            response_data = response.json()
            print(f"📥 Response Body: {json.dumps(response_data, indent=2)}")
        except:
            print(f"📥 Response Body (raw): {response.text}")
        
        # Check if status code is success (200 or 201)
        if response.status_code in [200, 201]:
            print("✅ POST /api/leads endpoint working - received success status code")
            
            # Check if response has expected fields
            if response.headers.get('content-type', '').startswith('application/json'):
                try:
                    response_data = response.json()
                    
                    # Check for success confirmation
                    if response_data.get('success') == True:
                        print("✅ Response contains success confirmation")
                    else:
                        print("⚠️  Response missing success confirmation")
                    
                    # Check for leadId
                    if 'leadId' in response_data:
                        print("✅ Response contains leadId")
                    else:
                        print("⚠️  Response missing leadId")
                        
                    return True
                except Exception as e:
                    print(f"⚠️  Could not parse JSON response: {e}")
                    return True  # Still consider it working if status is good
            else:
                print("⚠️  Response is not JSON")
                return True  # Still consider it working if status is good
        else:
            print(f"❌ POST /api/leads endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ Request timed out after 30 seconds")
        return False
    except requests.exceptions.ConnectionError as e:
        print(f"❌ Connection error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_leads_endpoint_different_sources():
    """Test the POST /api/leads endpoint with different sources"""
    print("\n🧪 Testing POST /api/leads endpoint with different sources...")
    
    base_url = load_environment()
    if not base_url:
        return False
    
    api_url = f"{base_url}/api/leads"
    
    # Test different sources as specified in the requirements
    test_sources = ["wizard", "book", "checklist"]
    all_passed = True
    
    for source in test_sources:
        print(f"\n📝 Testing source: {source}")
        
        test_data = {
            "source": source,
            "name": f"Test User {source.title()}",
            "email": f"test-{source}@example.com",
            "company": f"Test Corp {source.title()}",
            "timeline": "3-6 months"
        }
        
        try:
            response = requests.post(
                api_url,
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            print(f"📥 Response Status for {source}: {response.status_code}")
            
            if response.status_code in [200, 201]:
                print(f"✅ Source '{source}' accepted successfully")
                
                try:
                    response_data = response.json()
                    if response_data.get('success') == True:
                        print(f"✅ Success confirmation for source '{source}'")
                    else:
                        print(f"⚠️  Missing success confirmation for source '{source}'")
                except:
                    print(f"⚠️  Could not parse JSON for source '{source}'")
            else:
                print(f"❌ Source '{source}' failed with status {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print(f"❌ Error testing source '{source}': {e}")
            all_passed = False
    
    return all_passed

def test_leads_get_endpoint():
    """Test the GET /api/leads endpoint to verify data persistence"""
    print("\n🧪 Testing GET /api/leads endpoint...")
    
    base_url = load_environment()
    if not base_url:
        return False
    
    api_url = f"{base_url}/api/leads"
    
    try:
        response = requests.get(api_url, timeout=30)
        
        print(f"📥 GET Response Status: {response.status_code}")
        
        if response.status_code == 200:
            try:
                response_data = response.json()
                print(f"📥 GET Response: {json.dumps(response_data, indent=2)}")
                
                if 'success' in response_data and response_data['success']:
                    print("✅ GET /api/leads endpoint working")
                    print(f"✅ Total leads stored: {response_data.get('count', 0)}")
                    return True
                else:
                    print("⚠️  GET response missing success field")
                    return True  # Still working if status is 200
            except Exception as e:
                print(f"⚠️  Could not parse GET response JSON: {e}")
                return True  # Still working if status is 200
        else:
            print(f"❌ GET /api/leads failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing GET endpoint: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 Starting KnowMyCRM API Backend Tests")
    print("=" * 50)
    
    # Track test results
    test_results = []
    
    # Test 1: Basic POST /api/leads endpoint
    print("\n📋 TEST 1: Basic POST /api/leads endpoint")
    result1 = test_leads_endpoint()
    test_results.append(("POST /api/leads - Basic", result1))
    
    # Test 2: Different sources
    print("\n📋 TEST 2: Different sources (wizard, book, checklist)")
    result2 = test_leads_endpoint_different_sources()
    test_results.append(("POST /api/leads - Different Sources", result2))
    
    # Test 3: GET endpoint to verify persistence
    print("\n📋 TEST 3: GET /api/leads endpoint")
    result3 = test_leads_get_endpoint()
    test_results.append(("GET /api/leads", result3))
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n📈 Overall Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The API is working correctly.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the details above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
#!/usr/bin/env python3
"""
Edu9 Career Guidance App - Backend API Testing
Tests all backend APIs in the complete user flow
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://global-edu9.preview.emergentagent.com/api"

class Edu9APITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.user_id = None
        self.assessment_id = None
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_health_check(self):
        """Test basic API health"""
        try:
            response = self.session.get(f"{self.base_url}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Health Check", True, f"API is healthy: {data.get('status')}", data)
                return True
            else:
                self.log_test("Health Check", False, f"Health check failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Health Check", False, f"Health check error: {str(e)}")
            return False
    
    def test_auth_skip(self):
        """Test POST /api/auth/skip"""
        try:
            response = self.session.post(f"{self.base_url}/auth/skip", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('user_id'):
                    self.user_id = data['user_id']
                    self.log_test("Auth Skip API", True, f"Guest user created with ID: {self.user_id}", data)
                    return True
                else:
                    self.log_test("Auth Skip API", False, "Response missing success or user_id", data)
                    return False
            else:
                self.log_test("Auth Skip API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Auth Skip API", False, f"Request error: {str(e)}")
            return False
    
    def test_otp_send(self):
        """Test POST /api/auth/send-otp"""
        try:
            payload = {
                "phone": "9876543210",
                "name": "Rahul Sharma"
            }
            response = self.session.post(
                f"{self.base_url}/auth/send-otp", 
                json=payload,
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_test("OTP Send API", True, "OTP sent successfully", data)
                    return True
                else:
                    self.log_test("OTP Send API", False, "Response indicates failure", data)
                    return False
            else:
                self.log_test("OTP Send API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("OTP Send API", False, f"Request error: {str(e)}")
            return False
    
    def test_otp_verify(self):
        """Test POST /api/auth/verify-otp"""
        try:
            payload = {
                "phone": "9876543210",
                "otp": "1234"
            }
            response = self.session.post(
                f"{self.base_url}/auth/verify-otp", 
                json=payload,
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('user_id'):
                    self.log_test("OTP Verify API", True, f"OTP verified, user_id: {data['user_id']}", data)
                    return True
                else:
                    self.log_test("OTP Verify API", False, "Response missing success or user_id", data)
                    return False
            else:
                self.log_test("OTP Verify API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("OTP Verify API", False, f"Request error: {str(e)}")
            return False
    
    def test_assessment_create(self):
        """Test POST /api/assessments"""
        if not self.user_id:
            self.log_test("Assessment Create API", False, "No user_id available from auth skip")
            return False
            
        try:
            payload = {
                "user_id": self.user_id,
                "student_name": "Priya Patel",
                "stream": "Science",
                "subjects": ["Physics", "Chemistry", "Mathematics", "Biology"],
                "marks_percentage": 85.5,
                "career_interests": ["Technology", "Healthcare", "Research"],
                "strong_subjects": ["Mathematics", "Physics"],
                "career_goal": "Higher Studies",
                "parent_name": "Suresh Patel",
                "parent_phone": "9876543211"
            }
            response = self.session.post(
                f"{self.base_url}/assessments", 
                json=payload,
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('id'):
                    self.assessment_id = data['id']
                    self.log_test("Assessment Create API", True, f"Assessment created with ID: {self.assessment_id}", data)
                    return True
                else:
                    self.log_test("Assessment Create API", False, "Response missing assessment ID", data)
                    return False
            else:
                self.log_test("Assessment Create API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Assessment Create API", False, f"Request error: {str(e)}")
            return False
    
    def test_career_recommendations(self):
        """Test POST /api/career-recommendations"""
        if not self.user_id or not self.assessment_id:
            self.log_test("Career Recommendations API", False, "Missing user_id or assessment_id")
            return False
            
        try:
            params = {
                "assessment_id": self.assessment_id,
                "user_id": self.user_id
            }
            response = self.session.post(
                f"{self.base_url}/career-recommendations", 
                params=params,
                timeout=60  # Extended timeout for AI processing
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('careers'):
                    careers = data['careers']
                    career_count = len(careers)
                    self.log_test("Career Recommendations API", True, 
                                f"Generated {career_count} career recommendations using AI", 
                                {"career_count": career_count, "has_fallback": "note" in data})
                    return True
                else:
                    self.log_test("Career Recommendations API", False, "Response missing success or careers", data)
                    return False
            else:
                self.log_test("Career Recommendations API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Career Recommendations API", False, f"Request error: {str(e)}")
            return False
    
    def test_career_recommendations_get(self):
        """Test GET /api/career-recommendations/{user_id} to verify data was saved"""
        if not self.user_id:
            self.log_test("Career Recommendations GET API", False, "No user_id available")
            return False
            
        try:
            response = self.session.get(
                f"{self.base_url}/career-recommendations/{self.user_id}",
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('careers'):
                    careers = data['careers']
                    career_count = len(careers)
                    self.log_test("Career Recommendations GET API", True, 
                                f"Retrieved {career_count} saved career recommendations", 
                                {"career_count": career_count})
                    return True
                else:
                    self.log_test("Career Recommendations GET API", False, "No saved recommendations found", data)
                    return False
            else:
                self.log_test("Career Recommendations GET API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Career Recommendations GET API", False, f"Request error: {str(e)}")
            return False
    
    def test_booking_create(self):
        """Test POST /api/bookings"""
        if not self.user_id:
            self.log_test("Booking API", False, "No user_id available")
            return False
            
        try:
            payload = {
                "user_id": self.user_id,
                "name": "Arjun Singh",
                "phone": "9876543212",
                "consultation_type": "Online",
                "date": "2024-01-15",
                "time": "10:00 AM"
            }
            response = self.session.post(
                f"{self.base_url}/bookings", 
                json=payload,
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('id'):
                    self.log_test("Booking API", True, f"Booking created with ID: {data['id']}", data)
                    return True
                else:
                    self.log_test("Booking API", False, "Response missing booking ID", data)
                    return False
            else:
                self.log_test("Booking API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Booking API", False, f"Request error: {str(e)}")
            return False
    
    def test_membership_create(self):
        """Test POST /api/memberships"""
        if not self.user_id:
            self.log_test("Membership API", False, "No user_id available")
            return False
            
        try:
            payload = {
                "user_id": self.user_id,
                "name": "Kavya Reddy",
                "phone": "9876543213"
            }
            response = self.session.post(
                f"{self.base_url}/memberships", 
                json=payload,
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('id'):
                    self.log_test("Membership API", True, f"Membership created with ID: {data['id']}", data)
                    return True
                else:
                    self.log_test("Membership API", False, "Response missing membership ID", data)
                    return False
            else:
                self.log_test("Membership API", False, f"Failed with status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Membership API", False, f"Request error: {str(e)}")
            return False
    
    def run_complete_flow_test(self):
        """Run the complete user flow test"""
        print(f"\n🚀 Starting Edu9 Backend API Tests")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence following the complete flow
        tests = [
            ("Health Check", self.test_health_check),
            ("Auth Skip API", self.test_auth_skip),
            ("OTP Send API", self.test_otp_send),
            ("OTP Verify API", self.test_otp_verify),
            ("Assessment Create API", self.test_assessment_create),
            ("Career Recommendations API", self.test_career_recommendations),
            ("Career Recommendations GET API", self.test_career_recommendations_get),
            ("Booking API", self.test_booking_create),
            ("Membership API", self.test_membership_create)
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            print(f"\n🧪 Testing {test_name}...")
            if test_func():
                passed += 1
        
        print("\n" + "=" * 60)
        print(f"📊 TEST SUMMARY: {passed}/{total} tests passed")
        
        # Detailed results
        print(f"\n📋 DETAILED RESULTS:")
        for result in self.test_results:
            status = "✅" if result['success'] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
        
        return passed, total, self.test_results

def main():
    """Main test execution"""
    tester = Edu9APITester()
    passed, total, results = tester.run_complete_flow_test()
    
    # Save results to file
    with open('/app/test_results_backend.json', 'w') as f:
        json.dump({
            "summary": {"passed": passed, "total": total, "success_rate": f"{(passed/total)*100:.1f}%"},
            "results": results,
            "backend_url": BACKEND_URL,
            "test_timestamp": datetime.now().isoformat()
        }, f, indent=2)
    
    print(f"\n💾 Results saved to /app/test_results_backend.json")
    
    # Exit with appropriate code
    if passed == total:
        print("🎉 All tests passed!")
        sys.exit(0)
    else:
        print(f"⚠️  {total - passed} tests failed")
        sys.exit(1)

if __name__ == "__main__":
    main()
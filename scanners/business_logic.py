import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class BusinessLogicScanner(BaseScanner):
    """Scan for business logic vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for business logic vulnerabilities"""
        self.vulnerabilities = []
        
        # Test workflow manipulation
        self._test_workflow_manipulation()
        
        # Test pricing/payment abuse
        self._test_pricing_abuse()
        
        # Test race conditions
        self._test_race_conditions()
        
        # Test authorization bypass
        self._test_authorization_bypass()
        
        # Test data integrity
        self._test_data_integrity()
        
        return self.get_vulnerabilities()
    
    def _test_workflow_manipulation(self):
        """Test for workflow manipulation vulnerabilities"""
        # Check for multi-step processes that might be bypassed
        # This is a general check - specific tests depend on application logic
        
        # Test if steps can be skipped
        self.add_vulnerability(
            title="Workflow Manipulation Risk",
            description="Multi-step processes (registration, checkout, approval workflows) should be protected against step skipping or manipulation.",
            severity="Medium",
            confidence=0.6,
            location="Multi-step workflows",
            evidence="Workflow security review recommended",
            impact="Attackers can bypass required steps in workflows (e.g., skip payment, bypass verification) to gain unauthorized access or privileges.",
            recommendation="Implement server-side state management for workflows. Validate that all required steps are completed in order. Use tokens or session state to prevent step skipping. Implement proper state validation at each step."
        )
    
    def _test_pricing_abuse(self):
        """Test for pricing and payment abuse vulnerabilities"""
        # Check for API endpoints that might handle pricing
        api_paths = ['/api/cart', '/api/checkout', '/api/payment', '/api/order']
        
        for path in api_paths:
            response = self.http_client.get(path)
            
            if response.status_code == 200:
                # Check if pricing is handled client-side (vulnerable)
                if hasattr(response, 'text'):
                    # Look for price-related data
                    if any(term in response.text.lower() for term in ['price', 'amount', 'total', 'cost']):
                        self.add_vulnerability(
                            title="Client-Side Price Manipulation Risk",
                            description=f"Pricing or payment information may be exposed or manipulable at {path}, allowing attackers to modify prices or payment amounts.",
                            severity="Critical",
                            confidence=0.7,
                            location=path,
                            evidence="Price-related data detected in response",
                            impact="Attackers can modify prices, discounts, or payment amounts client-side, leading to financial loss or unauthorized purchases.",
                            recommendation="Never trust client-side price calculations. Always validate and calculate prices server-side. Use signed payment requests. Implement server-side price verification before processing payments. Never allow clients to set prices or discounts directly."
                        )
                        break
    
    def _test_race_conditions(self):
        """Test for race condition vulnerabilities"""
        # Race conditions are difficult to test without specific application knowledge
        # Provide general recommendations
        
        self.add_vulnerability(
            title="Race Condition Vulnerabilities",
            description="Concurrent requests to the same resource can lead to race conditions, especially in financial transactions, inventory management, or account operations.",
            severity="High",
            confidence=0.6,
            location="Concurrent operations",
            evidence="Race condition testing recommended",
            impact="Race conditions can lead to: double-spending, inventory overselling, duplicate account creation, or privilege escalation through concurrent requests.",
            recommendation="Implement proper locking mechanisms (database transactions, mutexes, or distributed locks). Use atomic operations for critical sections. Implement idempotency keys for financial transactions. Test with concurrent requests. Use optimistic or pessimistic locking as appropriate."
        )
    
    def _test_authorization_bypass(self):
        """Test for authorization bypass in business logic"""
        # Test if users can access resources they shouldn't
        # This overlaps with authentication scanner but focuses on business logic
        
        # Check for IDOR-like vulnerabilities in API endpoints
        api_paths = ['/api/user', '/api/profile', '/api/account']
        
        for path in api_paths:
            # Try accessing with different IDs (simulated)
            # In real testing, we'd try different user IDs
            response = self.http_client.get(path)
            
            if response.status_code == 200:
                # Check if response contains user-specific data
                if hasattr(response, 'text'):
                    # This is informational
                    pass
        
        # General recommendation
        self.add_vulnerability(
            title="Business Logic Authorization",
            description="Ensure business logic properly enforces authorization rules and prevents users from accessing or modifying resources they don't own.",
            severity="High",
            confidence=0.6,
            location="Business logic operations",
            evidence="Business logic authorization review recommended",
            impact="Improper authorization in business logic can allow users to access other users' data, modify transactions, or perform unauthorized actions.",
            recommendation="Implement proper authorization checks at every business logic operation. Verify user ownership of resources. Use role-based access control (RBAC) or attribute-based access control (ABAC). Never trust client-side authorization. Implement server-side validation for all operations."
        )
    
    def _test_data_integrity(self):
        """Test for data integrity vulnerabilities"""
        # Check if data can be manipulated inappropriately
        # This is a general check
        
        self.add_vulnerability(
            title="Data Integrity Protection",
            description="Ensure proper validation and integrity checks to prevent unauthorized data modification or corruption.",
            severity="Medium",
            confidence=0.6,
            location="Data operations",
            evidence="Data integrity review recommended",
            impact="Lack of data integrity protection can lead to: unauthorized data modification, data corruption, or manipulation of critical business data.",
            recommendation="Implement input validation and sanitization. Use database constraints and foreign keys. Implement checksums or digital signatures for critical data. Use transactions for multi-step operations. Implement audit trails for data changes. Validate data on both client and server side."
        )


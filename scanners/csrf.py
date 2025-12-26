from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class CSRFScanner(BaseScanner):
    """Scan for CSRF and clickjacking vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for CSRF vulnerabilities"""
        self.vulnerabilities = []
        
        # Test for CSRF protection
        self._test_csrf_protection()
        
        # Clickjacking is tested in headers scanner, but add a note here
        self._test_clickjacking()
        
        return self.get_vulnerabilities()
    
    def _test_csrf_protection(self):
        """Test for CSRF protection"""
        # Look for forms
        response = self.http_client.get('/')
        
        if hasattr(response, 'text') and response.text:
            # Check if forms exist
            if '<form' in response.text.lower() or 'form' in response.text.lower():
                # Check for CSRF token
                csrf_indicators = [
                    'csrf',
                    'csrftoken',
                    '_token',
                    'authenticity_token',
                    'csrf_token',
                ]
                
                has_csrf_token = any(indicator in response.text.lower() 
                                    for indicator in csrf_indicators)
                
                if not has_csrf_token:
                    # Check if it's a state-changing form (POST method)
                    if 'method="post"' in response.text.lower() or \
                       "method='post'" in response.text.lower():
                        self.add_vulnerability(
                            title="Missing CSRF Protection",
                            description="Forms appear to lack CSRF token protection",
                            severity="Medium",
                            confidence=0.7,
                            location="/",
                            evidence="POST form found without CSRF token",
                            impact="Vulnerable to Cross-Site Request Forgery attacks",
                            recommendation="Implement CSRF tokens for all state-changing operations"
                        )
                else:
                    # CSRF token exists, check if it's properly implemented
                    # This is a simplified check - real validation needs form submission
                    pass
    
    def _test_clickjacking(self):
        """Test for clickjacking protection (complement to headers scanner)"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'headers'):
            headers = response.headers
            
            # X-Frame-Options is checked in headers scanner
            # Check for CSP frame-ancestors
            if 'Content-Security-Policy' in headers:
                csp = headers['Content-Security-Policy']
                if 'frame-ancestors' not in csp.lower():
                    # X-Frame-Options should be present as fallback
                    if 'X-Frame-Options' not in headers:
                        self.add_vulnerability(
                            title="Potential Clickjacking Vulnerability",
                            description="No frame protection detected (neither X-Frame-Options nor CSP frame-ancestors)",
                            severity="Medium",
                            confidence=0.8,
                            location="HTTP Response Headers",
                            evidence="Missing both X-Frame-Options and CSP frame-ancestors",
                            impact="Page can be embedded in iframes, vulnerable to clickjacking",
                            recommendation="Implement X-Frame-Options or CSP frame-ancestors directive"
                        )




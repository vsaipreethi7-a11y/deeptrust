from typing import List, Dict, Any
from core.http_client import HTTPClient
from core.config import Config
from scanners.base import BaseScanner


class XSSScanner(BaseScanner):
    """Scan for XSS vulnerabilities (Reflected, Stored, DOM-based)"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for XSS vulnerabilities"""
        self.vulnerabilities = []
        
        # Test for reflected XSS
        self._test_reflected_xss()
        
        # Test for stored XSS (limited - requires form submission)
        self._test_stored_xss_indicators()
        
        # Test for DOM-based XSS indicators
        self._test_dom_xss_indicators()
        
        return self.get_vulnerabilities()
    
    def _test_reflected_xss(self):
        """Test for reflected XSS vulnerabilities"""
        test_params = ['q', 'search', 'name', 'input', 'query', 'id', 'message']
        
        for param in test_params:
            for payload in Config.XSS_PAYLOADS:
                # Test if payload is reflected in response
                params = {param: payload}
                response = self.http_client.get('/', params=params)
                
                if hasattr(response, 'text') and response.text:
                    # Check if payload appears in response (indicating reflection)
                    if payload in response.text:
                        # Check if it's in HTML context (not escaped)
                        if f'>{payload}<' in response.text or \
                           f'"{payload}"' in response.text or \
                           f"'{payload}'" in response.text:
                            self.add_vulnerability(
                                title="Reflected XSS Vulnerability",
                                description=f"Cross-site scripting vulnerability in parameter '{param}'",
                                severity="High",
                                confidence=0.8,
                                location=f"GET parameter: {param}",
                                evidence=f"XSS payload reflected in response without proper encoding",
                                impact="Attackers can execute JavaScript in users' browsers, steal cookies/sessions",
                                recommendation="Encode all user input in output, use Content-Security-Policy header"
                            )
                            return  # Found one, move on
    
    def _test_stored_xss_indicators(self):
        """Test for potential stored XSS (check if forms exist)"""
        # Look for comment forms, message forms, etc.
        response = self.http_client.get('/')
        
        if hasattr(response, 'text') and response.text:
            # Check for forms that might store user input
            form_indicators = ['comment', 'message', 'post', 'review', 'feedback']
            
            for indicator in form_indicators:
                if indicator in response.text.lower():
                    # Test if form submits without XSS protection
                    test_data = {indicator: Config.XSS_PAYLOADS[0]}
                    post_response = self.http_client.post('/', data=test_data)
                    
                    if hasattr(post_response, 'text') and post_response.text:
                        if Config.XSS_PAYLOADS[0] in post_response.text:
                            self.add_vulnerability(
                                title="Potential Stored XSS Vulnerability",
                                description=f"Potential stored XSS in {indicator} form",
                                severity="High",
                                confidence=0.6,
                                location=f"POST / ({indicator} parameter)",
                                evidence="User input stored and displayed without proper encoding",
                                impact="Malicious scripts stored and executed for all visitors",
                                recommendation="Sanitize and encode all stored user input before display"
                            )
                            return
    
    def _test_dom_xss_indicators(self):
        """Test for DOM-based XSS indicators"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'text') and response.text:
            # Check for dangerous JavaScript patterns
            dangerous_patterns = [
                'document.write',
                'innerHTML',
                'eval(',
                'setTimeout(',
                'setInterval(',
            ]
            
            # Check if URL parameters are used in JavaScript
            if 'location.href' in response.text or 'location.search' in response.text:
                # Check if URL params are used unsafely
                unsafe_patterns = [
                    'location.search',
                    'location.hash',
                    'window.location',
                ]
                
                for pattern in unsafe_patterns:
                    if pattern in response.text:
                        # Check if it's used with dangerous functions
                        for danger in dangerous_patterns:
                            if danger in response.text:
                                self.add_vulnerability(
                                    title="Potential DOM-based XSS",
                                    description="DOM manipulation with user-controlled input detected",
                                    severity="Medium",
                                    confidence=0.6,
                                    location="Client-side JavaScript",
                                    evidence=f"URL parameters used with {danger}",
                                    impact="Attackers can inject JavaScript via URL parameters",
                                    recommendation="Avoid using location data directly in DOM manipulation, sanitize all inputs"
                                )
                                return




from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class SessionScanner(BaseScanner):
    """Scan for session and token security issues"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan session and token security"""
        self.vulnerabilities = []
        
        # Test cookie security
        self._test_cookie_security()
        
        # Test session fixation
        self._test_session_fixation()
        
        return self.get_vulnerabilities()
    
    def _test_cookie_security(self):
        """Test cookie security flags"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'headers') and 'Set-Cookie' in response.headers:
            cookies = response.headers.get_all('Set-Cookie') or [response.headers['Set-Cookie']]
            
            for cookie in cookies:
                cookie_lower = cookie.lower()
                
                # Check for HttpOnly flag
                if 'httponly' not in cookie_lower:
                    self.add_vulnerability(
                        title="Missing HttpOnly Cookie Flag",
                        description="Cookie missing HttpOnly flag",
                        severity="Medium",
                        confidence=0.9,
                        location="Set-Cookie header",
                        evidence=f"Cookie: {cookie[:100]}",
                        impact="Cookies accessible via JavaScript, vulnerable to XSS attacks",
                        recommendation="Set HttpOnly flag on all cookies containing sensitive data"
                    )
                
                # Check for Secure flag (only on HTTPS)
                if self.target_url.startswith('https://'):
                    if 'secure' not in cookie_lower:
                        self.add_vulnerability(
                            title="Missing Secure Cookie Flag",
                            description="Cookie missing Secure flag on HTTPS site",
                            severity="Medium",
                            confidence=0.9,
                            location="Set-Cookie header",
                            evidence=f"Cookie: {cookie[:100]}",
                            impact="Cookies can be transmitted over unencrypted connections",
                            recommendation="Set Secure flag on all cookies when using HTTPS"
                        )
                
                # Check for SameSite attribute
                if 'samesite' not in cookie_lower:
                    self.add_vulnerability(
                        title="Missing SameSite Cookie Attribute",
                        description="Cookie missing SameSite attribute",
                        severity="Low",
                        confidence=0.8,
                        location="Set-Cookie header",
                        evidence=f"Cookie: {cookie[:100]}",
                        impact="Cookies vulnerable to CSRF attacks",
                        recommendation="Set SameSite=Strict or SameSite=Lax on cookies"
                    )
                    break  # Report once
    
    def _test_session_fixation(self):
        """Test for session fixation vulnerability"""
        # Get initial session
        initial_response = self.http_client.get('/login')
        
        # Check if session ID changes after login simulation
        # This is a simplified check
        if hasattr(initial_response, 'headers'):
            initial_cookies = initial_response.headers.get('Set-Cookie', '')
            
            # Simulate login attempt
            login_response = self.http_client.post('/login', data={
                'username': 'test',
                'password': 'test'
            })
            
            if hasattr(login_response, 'headers'):
                new_cookies = login_response.headers.get('Set-Cookie', '')
                
                # Extract session IDs (simplified)
                import re
                initial_sessions = re.findall(r'session[^=]*=([^;]+)', initial_cookies, re.IGNORECASE)
                new_sessions = re.findall(r'session[^=]*=([^;]+)', new_cookies, re.IGNORECASE)
                
                if initial_sessions and new_sessions:
                    if initial_sessions[0] == new_sessions[0]:
                        self.add_vulnerability(
                            title="Session Fixation Vulnerability",
                            description="Session ID does not change after authentication",
                            severity="Medium",
                            confidence=0.6,
                            location="/login",
                            evidence="Same session ID used before and after login",
                            impact="Attackers can fixate session IDs and hijack user sessions",
                            recommendation="Regenerate session ID after successful authentication"
                        )




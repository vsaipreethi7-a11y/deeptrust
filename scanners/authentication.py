import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class AuthenticationScanner(BaseScanner):
    """Scan for authentication and authorization vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for authentication issues"""
        self.vulnerabilities = []
        
        # Check for weak authentication
        self._test_weak_authentication()
        
        # Check for authentication bypass
        self._test_auth_bypass()
        
        # Check for brute force protection
        self._test_brute_force_protection()
        
        # Check for IDOR vulnerabilities
        self._test_idor()
        
        # Check exposed admin panels
        self._test_exposed_admin_panels()
        
        return self.get_vulnerabilities()
    
    def _test_weak_authentication(self):
        """Test for weak authentication mechanisms"""
        login_endpoints = ['/login', '/signin', '/auth', '/authenticate']
        
        for endpoint in login_endpoints:
            response = self.http_client.get(endpoint)
            
            if hasattr(response, 'status_code') and response.status_code == 200:
                if hasattr(response, 'text') and response.text:
                    # Check if password is sent over HTTP
                    if 'password' in response.text.lower() and 'https' not in self.target_url:
                        self.add_vulnerability(
                            title="Weak Authentication - HTTP Login",
                            description=f"Login form detected on non-HTTPS endpoint",
                            severity="High",
                            confidence=0.9,
                            location=endpoint,
                            evidence="Login form accessible over HTTP",
                            impact="Credentials transmitted in cleartext, vulnerable to interception",
                            recommendation="Force HTTPS for all authentication endpoints"
                        )
                    
                    # Check for weak password requirements
                    if not re.search(r'min.*length|strong.*password|complex', response.text, re.IGNORECASE):
                        self.add_vulnerability(
                            title="Weak Password Policy",
                            description=f"Potential weak password requirements on login form",
                            severity="Medium",
                            confidence=0.5,
                            location=endpoint,
                            evidence="No visible password strength requirements",
                            impact="Users may choose weak passwords, increasing brute-force risk",
                            recommendation="Implement strong password policy with complexity requirements"
                        )
    
    def _test_auth_bypass(self):
        """Test for authentication bypass vulnerabilities"""
        # Test common bypass techniques
        bypass_headers = {
            'X-Original-URL': '/admin',
            'X-Rewrite-URL': '/admin',
            'X-Forwarded-User': 'admin',
        }
        
        protected_paths = ['/admin', '/dashboard', '/api/admin']
        
        for path in protected_paths:
            # Test normal access
            normal_response = self.http_client.get(path)
            
            # Test with bypass headers
            bypass_response = self.http_client.get(path, headers=bypass_headers)
            
            if hasattr(bypass_response, 'status_code') and \
               hasattr(normal_response, 'status_code'):
                if bypass_response.status_code == 200 and normal_response.status_code != 200:
                    self.add_vulnerability(
                        title="Authentication Bypass Vulnerability",
                        description=f"Authentication bypass possible via header manipulation",
                        severity="Critical",
                        confidence=0.7,
                        location=path,
                        evidence="Protected resource accessible with bypass headers",
                        impact="Unauthorized access to protected resources",
                        recommendation="Validate authentication on server-side, don't trust headers"
                    )
                    return
    
    def _test_brute_force_protection(self):
        """Test for brute force protection"""
        login_endpoints = ['/login', '/signin', '/api/login']
        
        for endpoint in login_endpoints:
            # Simulate multiple failed login attempts
            failed_attempts = 0
            for i in range(5):
                response = self.http_client.post(
                    endpoint,
                    data={'username': 'test', 'password': 'wrongpassword123'}
                )
                if hasattr(response, 'status_code'):
                    if response.status_code == 401 or response.status_code == 403:
                        failed_attempts += 1
            
            # Check if account gets locked or rate limited
            final_response = self.http_client.post(
                endpoint,
                data={'username': 'test', 'password': 'wrongpassword123'}
            )
            
            if hasattr(final_response, 'status_code'):
                # No protection if still accessible after multiple failures
                if final_response.status_code not in [429, 423]:  # 429 = rate limit, 423 = locked
                    self.add_vulnerability(
                        title="Missing Brute Force Protection",
                        description=f"No rate limiting or account lockout detected on login endpoint",
                        severity="Medium",
                        confidence=0.8,
                        location=endpoint,
                        evidence="Multiple failed login attempts allowed without restriction",
                        impact="Attackers can perform brute force attacks to guess credentials",
                        recommendation="Implement rate limiting and account lockout after failed attempts"
                    )
                    return
    
    def _test_idor(self):
        """Test for Insecure Direct Object Reference"""
        # Test common IDOR patterns
        test_paths = [
            '/api/user/1',
            '/api/user/2',
            '/profile/1',
            '/orders/1',
        ]
        
        for path in test_paths:
            response = self.http_client.get(path)
            
            if hasattr(response, 'status_code') and response.status_code == 200:
                # Check if we can access other users' data
                # This is a simplified check - real IDOR testing needs authenticated sessions
                self.add_vulnerability(
                    title="Potential IDOR Vulnerability",
                    description=f"Direct object reference without authorization check",
                    severity="High",
                    confidence=0.5,
                    location=path,
                    evidence="Resource accessible without authorization verification",
                    impact="Users may access other users' data by changing IDs",
                    recommendation="Implement proper authorization checks for all object references"
                )
                return
    
    def _test_exposed_admin_panels(self):
        """Test for exposed admin panels"""
        admin_paths = [
            '/admin',
            '/administrator',
            '/wp-admin',
            '/phpmyadmin',
            '/admin.php',
            '/backend',
        ]
        
        for path in admin_paths:
            response = self.http_client.get(path)
            
            if hasattr(response, 'status_code') and response.status_code == 200:
                if hasattr(response, 'text') and response.text:
                    # Check if it looks like an admin panel
                    admin_indicators = ['login', 'admin', 'dashboard', 'panel', 'control']
                    if any(indicator in response.text.lower() for indicator in admin_indicators):
                        self.add_vulnerability(
                            title="Exposed Admin Panel",
                            description=f"Admin panel accessible at '{path}'",
                            severity="Medium",
                            confidence=0.8,
                            location=path,
                            evidence="Admin interface detected",
                            impact="Exposed admin interface increases attack surface",
                            recommendation="Restrict admin panel access, use IP whitelisting or VPN"
                        )




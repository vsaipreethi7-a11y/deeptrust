from typing import List, Dict, Any
from core.http_client import HTTPClient
from core.config import Config
from scanners.base import BaseScanner


class HeadersScanner(BaseScanner):
    """Scan for missing or misconfigured security headers"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan security headers"""
        self.vulnerabilities = []
        
        response = self.http_client.get('/')
        
        if hasattr(response, 'headers'):
            headers = response.headers
            
            # Check Content-Security-Policy
            self._check_csp(headers)
            
            # Check X-Frame-Options
            self._check_x_frame_options(headers)
            
            # Check X-Content-Type-Options
            self._check_x_content_type_options(headers)
            
            # Check Strict-Transport-Security
            self._check_hsts(headers)
            
            # Check X-XSS-Protection
            self._check_x_xss_protection(headers)
            
            # Check Referrer-Policy
            self._check_referrer_policy(headers)
            
            # Check CORS
            self._check_cors(headers)
            
            # Check Permissions-Policy
            self._check_permissions_policy(headers)
        
        return self.get_vulnerabilities()
    
    def _check_csp(self, headers):
        """Check Content-Security-Policy header"""
        if 'Content-Security-Policy' not in headers:
            self.add_vulnerability(
                title="Missing Content-Security-Policy Header",
                description="Content-Security-Policy header is missing",
                severity="Medium",
                confidence=1.0,
                location="HTTP Response Headers",
                evidence="No CSP header found",
                impact="Vulnerable to XSS attacks, no protection against code injection",
                recommendation="Implement Content-Security-Policy header with appropriate directives"
            )
        else:
            csp = headers['Content-Security-Policy']
            # Check for unsafe CSP directives
            if "'unsafe-inline'" in csp or "'unsafe-eval'" in csp:
                self.add_vulnerability(
                    title="Weak Content-Security-Policy",
                    description="CSP contains unsafe directives",
                    severity="Low",
                    confidence=0.9,
                    location="HTTP Response Headers",
                    evidence=f"CSP: {csp}",
                    impact="Reduced protection against XSS attacks",
                    recommendation="Remove unsafe-inline and unsafe-eval, use nonces or hashes instead"
                )
    
    def _check_x_frame_options(self, headers):
        """Check X-Frame-Options header"""
        if 'X-Frame-Options' not in headers:
            self.add_vulnerability(
                title="Missing X-Frame-Options Header",
                description="X-Frame-Options header is missing",
                severity="Medium",
                confidence=1.0,
                location="HTTP Response Headers",
                evidence="No X-Frame-Options header found",
                impact="Vulnerable to clickjacking attacks",
                recommendation="Set X-Frame-Options to 'DENY' or 'SAMEORIGIN'"
            )
        else:
            xfo = headers['X-Frame-Options'].upper()
            if xfo not in ['DENY', 'SAMEORIGIN']:
                self.add_vulnerability(
                    title="Weak X-Frame-Options Configuration",
                    description=f"X-Frame-Options set to '{headers['X-Frame-Options']}'",
                    severity="Low",
                    confidence=0.8,
                    location="HTTP Response Headers",
                    evidence=f"X-Frame-Options: {headers['X-Frame-Options']}",
                    impact="Insufficient protection against clickjacking",
                    recommendation="Set X-Frame-Options to 'DENY' or 'SAMEORIGIN'"
                )
    
    def _check_x_content_type_options(self, headers):
        """Check X-Content-Type-Options header"""
        if 'X-Content-Type-Options' not in headers:
            self.add_vulnerability(
                title="Missing X-Content-Type-Options Header",
                description="X-Content-Type-Options header is missing",
                severity="Low",
                confidence=1.0,
                location="HTTP Response Headers",
                evidence="No X-Content-Type-Options header found",
                impact="Vulnerable to MIME type sniffing attacks",
                recommendation="Set X-Content-Type-Options to 'nosniff'"
            )
    
    def _check_hsts(self, headers):
        """Check Strict-Transport-Security header"""
        if self.target_url.startswith('https://'):
            if 'Strict-Transport-Security' not in headers:
                self.add_vulnerability(
                    title="Missing HSTS Header",
                    description="Strict-Transport-Security header is missing on HTTPS site",
                    severity="Medium",
                    confidence=1.0,
                    location="HTTP Response Headers",
                    evidence="No HSTS header found",
                    impact="Vulnerable to protocol downgrade attacks",
                    recommendation="Implement HSTS header with max-age and includeSubDomains"
                )
            else:
                hsts = headers['Strict-Transport-Security']
                if 'max-age' not in hsts or 'max-age=0' in hsts:
                    self.add_vulnerability(
                        title="Weak HSTS Configuration",
                        description="HSTS header has insufficient max-age",
                        severity="Low",
                        confidence=0.8,
                        location="HTTP Response Headers",
                        evidence=f"HSTS: {hsts}",
                        impact="Insufficient protection duration",
                        recommendation="Set HSTS max-age to at least 31536000 (1 year)"
                    )
    
    def _check_x_xss_protection(self, headers):
        """Check X-XSS-Protection header"""
        # Note: X-XSS-Protection is deprecated but still checked
        if 'X-XSS-Protection' not in headers:
            self.add_vulnerability(
                title="Missing X-XSS-Protection Header",
                description="X-XSS-Protection header is missing (deprecated but still useful)",
                severity="Low",
                confidence=0.7,
                location="HTTP Response Headers",
                evidence="No X-XSS-Protection header found",
                impact="Reduced XSS protection for older browsers",
                recommendation="Set X-XSS-Protection to '1; mode=block' (or rely on CSP for modern browsers)"
            )
    
    def _check_referrer_policy(self, headers):
        """Check Referrer-Policy header"""
        if 'Referrer-Policy' not in headers:
            self.add_vulnerability(
                title="Missing Referrer-Policy Header",
                description="Referrer-Policy header is missing",
                severity="Low",
                confidence=1.0,
                location="HTTP Response Headers",
                evidence="No Referrer-Policy header found",
                impact="Referrer information leaked to external sites",
                recommendation="Set Referrer-Policy to 'strict-origin-when-cross-origin' or 'no-referrer'"
            )
    
    def _check_cors(self, headers):
        """Check CORS configuration"""
        if 'Access-Control-Allow-Origin' in headers:
            acao = headers['Access-Control-Allow-Origin']
            if acao == '*':
                self.add_vulnerability(
                    title="Insecure CORS Configuration",
                    description="CORS allows all origins (*)",
                    severity="High",
                    confidence=1.0,
                    location="HTTP Response Headers",
                    evidence=f"Access-Control-Allow-Origin: {acao}",
                    impact="Any website can make authenticated requests to this API",
                    recommendation="Restrict Access-Control-Allow-Origin to specific trusted origins"
                )
            elif 'Access-Control-Allow-Credentials' in headers:
                if headers['Access-Control-Allow-Credentials'].lower() == 'true' and acao == '*':
                    self.add_vulnerability(
                        title="Critical CORS Misconfiguration",
                        description="CORS allows credentials with wildcard origin",
                        severity="Critical",
                        confidence=1.0,
                        location="HTTP Response Headers",
                        evidence="Credentials allowed with wildcard origin",
                        impact="Complete CORS bypass, credentials exposed to any origin",
                        recommendation="Never use Access-Control-Allow-Credentials with wildcard origin"
                    )
    
    def _check_permissions_policy(self, headers):
        """Check Permissions-Policy header (formerly Feature-Policy)"""
        # Check for both old and new header names
        if 'Permissions-Policy' not in headers and 'Feature-Policy' not in headers:
            self.add_vulnerability(
                title="Missing Permissions-Policy Header",
                description="Permissions-Policy header is missing",
                severity="Low",
                confidence=0.8,
                location="HTTP Response Headers",
                evidence="No Permissions-Policy or Feature-Policy header found",
                impact="Browser features may be enabled by default, increasing attack surface",
                recommendation="Implement Permissions-Policy to restrict browser features (camera, microphone, etc.)"
            )




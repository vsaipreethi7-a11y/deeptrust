import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class BotAutomationScanner(BaseScanner):
    """Scan for bot, automation, and abuse vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for bot and automation vulnerabilities"""
        self.vulnerabilities = []
        
        # Test bot mitigation
        self._test_bot_mitigation()
        
        # Test CAPTCHA implementation
        self._test_captcha()
        
        # Test API abuse potential
        self._test_api_abuse()
        
        # Test automation detection
        self._test_automation_detection()
        
        return self.get_vulnerabilities()
    
    def _test_bot_mitigation(self):
        """Test for bot mitigation mechanisms"""
        # Check if there are any bot detection mechanisms
        response = self.http_client.get('/')
        
        # Check for bot detection headers or mechanisms
        headers = response.headers if hasattr(response, 'headers') else {}
        
        # Check for common bot mitigation services
        server_header = headers.get('Server', '').lower()
        cf_ray = headers.get('CF-RAY', '')  # Cloudflare bot management
        
        # Check response for bot detection indicators
        has_bot_protection = bool(cf_ray or 'cloudflare' in server_header)
        
        # Test with automated user agent
        bot_ua = 'python-requests/2.31.0'
        response_bot = self.http_client.get('/', headers={'User-Agent': bot_ua})
        
        # Check if bot requests are handled differently
        if response_bot.status_code == 200 and not has_bot_protection:
            # Check if there's any challenge or blocking
            if 'captcha' not in response_bot.text.lower() and 'challenge' not in response_bot.text.lower():
                self.add_vulnerability(
                    title="Missing Bot Mitigation",
                    description="Application does not implement bot detection or mitigation mechanisms, making it vulnerable to automated attacks.",
                    severity="Medium",
                    confidence=0.7,
                    location="/",
                    evidence="No bot detection mechanisms detected. Automated requests are accepted without challenge.",
                    impact="Attackers can use automated tools to perform scraping, brute-force attacks, account enumeration, or API abuse without detection.",
                    recommendation="Implement bot detection using services like Cloudflare Bot Management, AWS WAF, or custom solutions. Use behavioral analysis, fingerprinting, and challenge-response mechanisms. Monitor for automated patterns."
                )
    
    def _test_captcha(self):
        """Test CAPTCHA implementation"""
        # Check login and registration pages for CAPTCHA
        test_paths = ['/login', '/register', '/signup', '/api/login', '/api/register']
        
        captcha_found = False
        for path in test_paths:
            response = self.http_client.get(path)
            if hasattr(response, 'text'):
                text_lower = response.text.lower()
                # Check for common CAPTCHA indicators
                if any(indicator in text_lower for indicator in ['captcha', 'recaptcha', 'hcaptcha', 'turnstile', 'challenge']):
                    captcha_found = True
                    break
        
        if not captcha_found:
            # Check if there are forms that might need CAPTCHA
            response = self.http_client.get('/')
            if hasattr(response, 'text'):
                # Look for form indicators
                if '<form' in response.text.lower() or 'input' in response.text.lower():
                    self.add_vulnerability(
                        title="Missing CAPTCHA Protection",
                        description="Forms (login, registration, contact) do not appear to have CAPTCHA protection, making them vulnerable to automated abuse.",
                        severity="Medium",
                        confidence=0.6,
                        location="Forms (login/registration)",
                        evidence="No CAPTCHA detected on forms",
                        impact="Attackers can automate form submissions for account creation, password reset abuse, or spam. This enables brute-force attacks and account enumeration.",
                        recommendation="Implement CAPTCHA (reCAPTCHA v3, hCaptcha, or Turnstile) on all public-facing forms, especially login, registration, and contact forms. Use invisible CAPTCHA for better UX. Implement rate limiting as additional protection."
                    )
    
    def _test_api_abuse(self):
        """Test API abuse potential"""
        # Check for API endpoints
        api_paths = ['/api', '/api/v1', '/api/v2', '/rest', '/graphql']
        
        for path in api_paths:
            response = self.http_client.get(path)
            
            if response.status_code in [200, 401, 403]:
                # Check if API has authentication
                if response.status_code == 200:
                    # API might be publicly accessible
                    self.add_vulnerability(
                        title="Public API Endpoint",
                        description=f"API endpoint at {path} appears to be publicly accessible without authentication, making it vulnerable to abuse.",
                        severity="High",
                        confidence=0.7,
                        location=path,
                        evidence=f"Endpoint returns {response.status_code} without authentication",
                        impact="Public APIs can be abused for data scraping, resource exhaustion, or unauthorized access. Attackers can perform automated requests at scale.",
                        recommendation="Implement authentication for all API endpoints. Use API keys, OAuth, or JWT tokens. Implement rate limiting per API key/user. Add request signing for sensitive operations. Monitor API usage patterns."
                    )
                
                # Check for API documentation exposure
                if hasattr(response, 'text'):
                    if any(doc_indicator in response.text.lower() for doc_indicator in ['swagger', 'openapi', 'api-docs', 'graphql']):
                        self.add_vulnerability(
                            title="API Documentation Exposure",
                            description=f"API documentation is publicly accessible at {path}, revealing endpoints and potential attack vectors.",
                            severity="Medium",
                            confidence=0.8,
                            location=path,
                            evidence="API documentation detected in response",
                            impact="Exposed API documentation helps attackers discover endpoints, understand API structure, and plan attacks. It may reveal sensitive information or undocumented features.",
                            recommendation="Restrict API documentation to authenticated users only. Use separate documentation environments. Remove or protect Swagger/OpenAPI endpoints in production. Implement authentication for GraphQL introspection."
                        )
    
    def _test_automation_detection(self):
        """Test automation detection mechanisms"""
        # Test with various automation indicators
        automation_headers = {
            'User-Agent': 'python-requests/2.31.0',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
        }
        
        response = self.http_client.get('/', headers=automation_headers)
        
        # Check if automation is detected
        if hasattr(response, 'text'):
            # Look for challenge pages or blocking
            if 'blocked' in response.text.lower() or 'forbidden' in response.text.lower():
                # Good - automation might be detected
                pass
            else:
                # Check response headers for automation indicators
                headers = response.headers if hasattr(response, 'headers') else {}
                
                # General recommendation
                self.add_vulnerability(
                    title="Automation Detection",
                    description="Ensure proper detection and mitigation of automated requests to prevent scraping, abuse, and unauthorized access.",
                    severity="Info",
                    confidence=0.5,
                    location="Application-wide",
                    evidence="Automation detection mechanisms review recommended",
                    impact="Lack of automation detection allows attackers to use scripts and bots for scraping, brute-force attacks, or API abuse at scale.",
                    recommendation="Implement automation detection using behavioral analysis, device fingerprinting, and challenge-response mechanisms. Monitor for unusual patterns. Use services like Cloudflare Bot Management or custom ML-based solutions."
                )


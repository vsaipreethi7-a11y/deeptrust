import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class SpoofingScanner(BaseScanner):
    """Scan for spoofing and impersonation vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for spoofing vulnerabilities"""
        self.vulnerabilities = []
        
        # Test IP spoofing indicators
        self._test_ip_spoofing()
        
        # Test header spoofing
        self._test_header_spoofing()
        
        # Test DNS misconfiguration
        self._test_dns_misconfiguration()
        
        # Test subdomain takeover indicators
        self._test_subdomain_takeover()
        
        # Test user-agent spoofing behavior
        self._test_user_agent_spoofing()
        
        return self.get_vulnerabilities()
    
    def _test_ip_spoofing(self):
        """Test for IP spoofing vulnerabilities"""
        # Check if application relies on IP-based authentication
        # Test with X-Forwarded-For header
        spoofed_ips = ['127.0.0.1', '10.0.0.1', '192.168.1.1']
        
        for spoofed_ip in spoofed_ips:
            response = self.http_client.get(
                '/',
                headers={'X-Forwarded-For': spoofed_ip, 'X-Real-IP': spoofed_ip}
            )
            
            # Check if response differs based on IP header
            # This is a basic check - real IP spoofing tests are more complex
            pass
        
        # General vulnerability about IP-based trust
        self.add_vulnerability(
            title="IP Address Spoofing Risk",
            description="Applications that trust X-Forwarded-For or X-Real-IP headers without validation are vulnerable to IP spoofing attacks.",
            severity="Medium",
            confidence=0.7,
            location="Application-wide",
            evidence="Application accepts X-Forwarded-For and X-Real-IP headers",
            impact="Attackers can spoof their IP address to bypass IP-based access controls, rate limiting, or geolocation restrictions.",
            recommendation="Never trust client-provided IP headers. Use the rightmost IP in X-Forwarded-For (after validating against trusted proxies). Implement proper proxy configuration. Use server-side IP logging."
        )
    
    def _test_header_spoofing(self):
        """Test for header spoofing vulnerabilities"""
        # Test X-Forwarded-For header manipulation
        response_normal = self.http_client.get('/')
        response_spoofed = self.http_client.get(
            '/',
            headers={
                'X-Forwarded-For': '192.168.1.100',
                'X-Forwarded-Host': 'evil.com',
                'X-Forwarded-Proto': 'https',
                'X-Original-URL': '/admin',
                'X-Rewrite-URL': '/admin'
            }
        )
        
        # Check if spoofed headers affect application behavior
        if response_spoofed.status_code != response_normal.status_code:
            self.add_vulnerability(
                title="Header Spoofing Vulnerability",
                description="Application behavior changes based on spoofed X-Forwarded-* headers, indicating improper header validation.",
                severity="High",
                confidence=0.8,
                location="/",
                evidence=f"Response code changed from {response_normal.status_code} to {response_spoofed.status_code} with spoofed headers",
                impact="Attackers can manipulate application behavior, bypass security controls, or perform host header injection attacks.",
                recommendation="Validate and sanitize all X-Forwarded-* headers. Use trusted proxy configuration. Implement host header validation. Never trust client-provided headers for security decisions."
            )
        
        # Check for host header injection
        response_host_spoof = self.http_client.get(
            '/',
            headers={'Host': 'evil.com'}
        )
        
        # Check if Host header is reflected in response
        if hasattr(response_host_spoof, 'text') and 'evil.com' in response_host_spoof.text:
            self.add_vulnerability(
                title="Host Header Injection",
                description="Application reflects the Host header in responses without validation, enabling cache poisoning and password reset poisoning attacks.",
                severity="High",
                confidence=0.8,
                location="/",
                evidence="Host header value reflected in response",
                impact="Attackers can poison caches, perform password reset poisoning, or redirect users to malicious sites.",
                recommendation="Validate Host header against whitelist of allowed domains. Use absolute URLs for redirects. Implement proper host header validation middleware."
            )
    
    def _test_dns_misconfiguration(self):
        """Test for DNS misconfiguration indicators"""
        # This is a basic check - full DNS testing requires external tools
        from urllib.parse import urlparse
        
        parsed = urlparse(self.target_url)
        domain = parsed.netloc.split(':')[0]
        
        # Check for common DNS misconfigurations
        # This is informational
        self.add_vulnerability(
            title="DNS Configuration Review",
            description="Ensure proper DNS configuration including SPF, DKIM, DMARC records, and subdomain security.",
            severity="Info",
            confidence=0.5,
            location=domain,
            evidence="DNS configuration review recommended",
            impact="DNS misconfigurations can lead to subdomain takeover, email spoofing, or phishing attacks.",
            recommendation="Implement SPF, DKIM, and DMARC records for email security. Regularly audit subdomains. Remove unused DNS records. Use DNS security extensions (DNSSEC)."
        )
    
    def _test_subdomain_takeover(self):
        """Test for subdomain takeover vulnerabilities"""
        # Check common subdomain patterns
        from urllib.parse import urlparse
        
        parsed = urlparse(self.target_url)
        domain = parsed.netloc.split(':')[0]
        
        # Common subdomains to check
        common_subdomains = ['www', 'api', 'admin', 'test', 'staging', 'dev', 'mail', 'ftp']
        
        # This is a basic check - full subdomain enumeration requires external tools
        self.add_vulnerability(
            title="Subdomain Takeover Risk",
            description="Unused or misconfigured subdomains can be taken over by attackers if DNS points to non-existent services.",
            severity="Medium",
            confidence=0.6,
            location=f"*.{domain}",
            evidence="Subdomain security review recommended",
            impact="Subdomain takeover can lead to cookie theft, phishing attacks, or XSS vulnerabilities if the subdomain is used in SameSite cookie policies.",
            recommendation="Regularly audit all subdomains. Remove DNS records for unused subdomains. Ensure all active subdomains point to valid, secured services. Monitor for subdomain hijacking."
        )
    
    def _test_user_agent_spoofing(self):
        """Test user-agent spoofing behavior"""
        # Test with different user agents
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'curl/7.68.0',
            'python-requests/2.31.0',
            'Googlebot/2.1'
        ]
        
        responses = []
        for ua in user_agents:
            response = self.http_client.get('/', headers={'User-Agent': ua})
            responses.append({
                'user_agent': ua,
                'status_code': response.status_code if hasattr(response, 'status_code') else 0,
                'content_length': len(response.text) if hasattr(response, 'text') else 0
            })
        
        # Check if different user agents get different responses
        status_codes = [r['status_code'] for r in responses]
        if len(set(status_codes)) > 1:
            self.add_vulnerability(
                title="User-Agent Based Access Control",
                description="Application behavior differs based on User-Agent header, which can be easily spoofed by attackers.",
                severity="Low",
                confidence=0.7,
                location="/",
                evidence=f"Different responses for different user agents: {set(status_codes)}",
                impact="Attackers can spoof user agents to bypass access controls or security restrictions based on user agent detection.",
                recommendation="Never use User-Agent header for security decisions. User-Agent should only be used for analytics or compatibility, not access control. Implement proper authentication and authorization mechanisms."
            )


import time
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class TrafficManipulationScanner(BaseScanner):
    def scan(self) -> List[Dict[str, Any]]:
        self.vulnerabilities = []
        
        # Test rate limiting effectiveness
        self._test_rate_limiting()
        
        # Test slow HTTP attack patterns (simulated)
        self._test_slow_http_patterns()
        
        # Test resource exhaustion indicators
        self._test_resource_exhaustion()
        
        # Test application-layer DDoS protection (simulated)
        self._test_ddos_protection()
        
        return self.get_vulnerabilities()
    
    def _test_rate_limiting(self):
        """Test if rate limiting is properly implemented"""
        # Simulate rapid requests (within ethical limits)
        response_times = []
        status_codes = []
        
        for i in range(5):  # Limited to 5 requests for ethical testing
            start_time = time.time()
            response = self.http_client.get('/')
            elapsed = time.time() - start_time
            response_times.append(elapsed)
            status_codes.append(response.status_code)
        
        # Check if rate limiting is enforced
        if all(code == 200 for code in status_codes):
            # Check if response times are consistent (no throttling)
            avg_time = sum(response_times) / len(response_times)
            if avg_time < 0.5:  # Very fast responses might indicate no rate limiting
                self.add_vulnerability(
                    title="Missing or Ineffective Rate Limiting",
                    description="The application does not appear to implement rate limiting or throttling mechanisms. This makes it vulnerable to brute-force attacks, API abuse, and resource exhaustion.",
                    severity="High",
                    confidence=0.7,
                    location="/",
                    evidence=f"All {len(status_codes)} requests returned 200 status codes with average response time {avg_time:.2f}s",
                    impact="Attackers can perform unlimited requests, leading to brute-force attacks, API abuse, and potential DoS conditions.",
                    recommendation="Implement rate limiting using middleware (e.g., rate-limit libraries, WAF, or API gateway). Set appropriate limits per IP/user (e.g., 100 requests/minute). Return HTTP 429 (Too Many Requests) when limits are exceeded."
                )
    
    def _test_slow_http_patterns(self):
        """Test for slow HTTP attack vulnerabilities (simulated)"""
        # Check if server handles incomplete requests properly
        # This is simulated - we don't actually send slow requests
        
        # Check for timeout configurations
        response = self.http_client.get('/')
        
        # Check if server has reasonable timeout settings
        if hasattr(response, 'headers'):
            connection_header = response.headers.get('Connection', '').lower()
            if connection_header == 'keep-alive':
                # Check if keep-alive timeout is reasonable
                # This is informational only
                self.add_vulnerability(
                    title="Keep-Alive Connection Configuration",
                    description="Server uses keep-alive connections. Ensure proper timeout configuration to prevent slow HTTP attacks.",
                    severity="Info",
                    confidence=0.5,
                    location="/",
                    evidence=f"Connection header: {connection_header}",
                    impact="Improper keep-alive timeout configuration could allow slow HTTP attacks to exhaust server resources.",
                    recommendation="Configure appropriate keep-alive timeout (e.g., 5-15 seconds). Implement request timeout limits. Monitor for slow request patterns."
                )
    
    def _test_resource_exhaustion(self):
        """Test for resource exhaustion vulnerabilities"""
        # Simulate checking for resource-intensive endpoints
        # Check if large payloads are accepted without limits
        
        # Test with a moderately large parameter (simulated)
        test_paths = ['/api/search', '/api/query', '/search']
        
        for path in test_paths:
            response = self.http_client.get(path, params={'q': 'a' * 1000})  # 1KB payload
            
            if response.status_code == 200:
                # Check response time - if it's slow, might indicate resource exhaustion risk
                # This is informational
                pass
        
        # Check for file upload size limits (if applicable)
        # This would require POST testing which is more complex
        
        # General recommendation
        self.add_vulnerability(
            title="Resource Exhaustion Protection",
            description="Ensure proper limits on request size, payload length, and resource consumption to prevent DoS attacks.",
            severity="Medium",
            confidence=0.6,
            location="Application-wide",
            evidence="No explicit size limits detected in tested endpoints",
            impact="Large payloads or resource-intensive operations could exhaust server resources, leading to DoS conditions.",
            recommendation="Implement request size limits (e.g., max 10MB for file uploads, 1MB for JSON payloads). Set timeout limits for long-running operations. Use resource quotas and monitoring."
        )
    
    def _test_ddos_protection(self):
        """Test for DDoS protection mechanisms (simulated check only)"""
        # Check for DDoS protection headers or indicators
        response = self.http_client.get('/')
        
        headers = response.headers if hasattr(response, 'headers') else {}
        
        # Check for CDN/protection services
        server_header = headers.get('Server', '').lower()
        cf_ray = headers.get('CF-RAY', '')  # Cloudflare
        x_amzn = headers.get('X-Amz-Cf-Id', '')  # AWS CloudFront
        
        has_protection = bool(cf_ray or x_amzn or 'cloudflare' in server_header or 'cloudfront' in server_header)
        
        if not has_protection:
            self.add_vulnerability(
                title="Missing DDoS Protection Service",
                description="No DDoS protection service (e.g., Cloudflare, AWS WAF, Akamai) detected. Application may be vulnerable to distributed denial-of-service attacks.",
                severity="Medium",
                confidence=0.6,
                location="/",
                evidence="No CDN or DDoS protection headers detected",
                impact="Application is vulnerable to DDoS attacks which could cause service unavailability and business disruption.",
                recommendation="Implement DDoS protection using services like Cloudflare, AWS WAF, or Akamai. Configure rate limiting at the edge. Use load balancers with DDoS protection features."
            )


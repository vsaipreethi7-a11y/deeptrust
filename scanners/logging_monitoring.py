import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class LoggingMonitoringScanner(BaseScanner):
    """Scan for logging and monitoring vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for logging and monitoring issues"""
        self.vulnerabilities = []
        
        # Test audit logging
        self._test_audit_logging()
        
        # Test error logging
        self._test_error_logging()
        
        # Test monitoring and alerting
        self._test_monitoring_alerting()
        
        # Test security event logging
        self._test_security_event_logging()
        
        return self.get_vulnerabilities()
    
    def _test_audit_logging(self):
        """Test for audit logging mechanisms"""
        # Test various endpoints that should be logged
        test_paths = ['/login', '/admin', '/api/user', '/api/admin']
        
        # This is a passive check - we can't verify if logging actually happens
        # But we can check if there are indicators of logging
        
        # General recommendation
        self.add_vulnerability(
            title="Audit Logging Review",
            description="Ensure comprehensive audit logging is implemented for all security-sensitive operations and administrative actions.",
            severity="Medium",
            confidence=0.6,
            location="Application-wide",
            evidence="Audit logging implementation review recommended",
            impact="Lack of proper audit logging makes it difficult to detect security incidents, investigate breaches, or comply with regulatory requirements. Without logs, attackers can operate undetected.",
            recommendation="Implement comprehensive audit logging for: authentication events (success/failure), authorization changes, sensitive data access, administrative actions, and security events. Log user ID, timestamp, IP address, and action details. Store logs securely and implement log retention policies."
        )
    
    def _test_error_logging(self):
        """Test for error logging and information disclosure"""
        # Try to trigger errors
        error_paths = ['/nonexistent', '/api/invalid', '/admin/../../etc/passwd']
        
        error_responses = []
        for path in error_paths:
            response = self.http_client.get(path)
            if response.status_code >= 400:
                error_responses.append({
                    'path': path,
                    'status': response.status_code,
                    'has_stack_trace': False
                })
                
                # Check for stack traces or sensitive info in error pages
                if hasattr(response, 'text'):
                    text = response.text.lower()
                    if any(indicator in text for indicator in ['stack trace', 'exception', 'traceback', 'file:', 'line:', 'at ']):
                        error_responses[-1]['has_stack_trace'] = True
        
        # Check if stack traces are exposed
        stack_traces_found = any(r['has_stack_trace'] for r in error_responses)
        
        if stack_traces_found:
            self.add_vulnerability(
                title="Stack Trace Information Disclosure",
                description="Error pages expose stack traces or detailed error information, revealing application structure and potential vulnerabilities.",
                severity="Medium",
                confidence=0.8,
                location="Error pages",
                evidence="Stack traces detected in error responses",
                impact="Stack traces reveal file paths, framework versions, database structure, and code structure, helping attackers plan more targeted attacks.",
                recommendation="Disable detailed error messages in production. Use generic error pages for users. Log detailed errors server-side only. Implement proper error handling that doesn't expose internal details."
            )
        else:
            # Still recommend proper error logging
            self.add_vulnerability(
                title="Error Logging Configuration",
                description="Ensure proper error logging is configured to capture security-relevant errors without exposing sensitive information to users.",
                severity="Info",
                confidence=0.5,
                location="Application-wide",
                evidence="Error logging review recommended",
                impact="Proper error logging is essential for security monitoring and incident response. Without it, security events may go undetected.",
                recommendation="Implement server-side error logging that captures: error type, timestamp, user context, request details, and stack traces (server-side only). Use structured logging (JSON). Integrate with SIEM systems. Never expose detailed errors to end users."
            )
    
    def _test_monitoring_alerting(self):
        """Test for monitoring and alerting mechanisms"""
        # This is mostly a configuration check
        # We can't directly test if monitoring is active, but we can provide recommendations
        
        self.add_vulnerability(
            title="Security Monitoring and Alerting",
            description="Ensure comprehensive security monitoring and alerting is implemented to detect and respond to security incidents in real-time.",
            severity="High",
            confidence=0.6,
            location="Application-wide",
            evidence="Security monitoring review recommended",
            impact="Without proper monitoring and alerting, security incidents may go undetected for extended periods, allowing attackers to maintain persistent access or cause significant damage.",
            recommendation="Implement security monitoring for: failed login attempts, unusual access patterns, privilege escalations, data exfiltration indicators, and anomaly detection. Set up real-time alerts for critical security events. Use SIEM solutions (e.g., Splunk, ELK, Azure Sentinel). Implement 24/7 security operations center (SOC) or automated response."
        )
    
    def _test_security_event_logging(self):
        """Test for security event logging"""
        # Test login endpoint to see if it logs security events
        login_paths = ['/login', '/api/login', '/auth/login']
        
        for path in login_paths:
            response = self.http_client.get(path)
            # We can't verify if logging happens, but we can provide recommendations
            
        # General recommendation for security event logging
        self.add_vulnerability(
            title="Security Event Logging",
            description="Ensure all security-relevant events are properly logged with sufficient detail for forensic analysis.",
            severity="Medium",
            confidence=0.6,
            location="Security-sensitive endpoints",
            evidence="Security event logging review recommended",
            impact="Insufficient security event logging makes it difficult to detect attacks, investigate incidents, and comply with security standards (e.g., PCI DSS, HIPAA, SOC 2).",
            recommendation="Log all security events including: authentication attempts (success/failure with username and IP), authorization failures, privilege changes, sensitive data access, configuration changes, and security policy violations. Include: timestamp, user ID, IP address, user agent, action, result, and relevant context. Use immutable log storage. Implement log integrity verification."
        )


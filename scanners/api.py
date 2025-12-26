from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class APIScanner(BaseScanner):
    """Scan for API security vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan API security"""
        self.vulnerabilities = []
        
        # Test for unauthenticated APIs
        self._test_unauthenticated_apis()
        
        # Test for excessive data exposure
        self._test_excessive_data_exposure()
        
        # Test HTTP method abuse
        self._test_http_method_abuse()
        
        # Test for API versioning and documentation exposure
        self._test_api_documentation_exposure()
        
        return self.get_vulnerabilities()
    
    def _test_unauthenticated_apis(self):
        """Test for unauthenticated API endpoints"""
        api_paths = ['/api', '/api/v1', '/api/user', '/api/admin', '/api/data']
        
        for path in api_paths:
            response = self.http_client.get(path)
            
            if hasattr(response, 'status_code'):
                # If we get data without authentication, it's a vulnerability
                if response.status_code == 200:
                    if hasattr(response, 'text') and response.text:
                        # Check if it looks like API data (JSON, structured data)
                        if response.text.strip().startswith(('{', '[')):
                            # Try to access sensitive endpoints
                            sensitive_paths = [f'{path}/user', f'{path}/admin', f'{path}/users']
                            for sensitive_path in sensitive_paths:
                                sensitive_response = self.http_client.get(sensitive_path)
                                if hasattr(sensitive_response, 'status_code') and \
                                   sensitive_response.status_code == 200:
                                    self.add_vulnerability(
                                        title="Unauthenticated API Access",
                                        description=f"API endpoint '{sensitive_path}' accessible without authentication",
                                        severity="High",
                                        confidence=0.8,
                                        location=sensitive_path,
                                        evidence="API returns data without authentication",
                                        impact="Sensitive data exposed to unauthorized users",
                                        recommendation="Implement authentication and authorization for all API endpoints"
                                    )
                                    return
    
    def _test_excessive_data_exposure(self):
        """Test for excessive data exposure in API responses"""
        api_paths = ['/api/user', '/api/profile', '/api/data']
        
        for path in api_paths:
            response = self.http_client.get(path)
            
            if hasattr(response, 'text') and response.text:
                # Check for sensitive fields in response
                sensitive_fields = ['password', 'token', 'secret', 'key', 'ssn', 'credit_card']
                
                import json
                try:
                    data = json.loads(response.text)
                    if isinstance(data, dict):
                        # Check if sensitive fields are present
                        found_sensitive = []
                        for field in sensitive_fields:
                            if field.lower() in str(data).lower():
                                found_sensitive.append(field)
                        
                        if found_sensitive:
                            self.add_vulnerability(
                                title="Excessive Data Exposure",
                                description=f"Sensitive fields exposed in API response: {', '.join(found_sensitive)}",
                                severity="High",
                                confidence=0.9,
                                location=path,
                                evidence=f"Sensitive fields detected: {', '.join(found_sensitive)}",
                                impact="Sensitive data exposed to clients unnecessarily",
                                recommendation="Remove sensitive fields from API responses, use field filtering"
                            )
                            return
                except (json.JSONDecodeError, TypeError):
                    # Not JSON or not parseable
                    pass
    
    def _test_http_method_abuse(self):
        """Test for dangerous HTTP methods"""
        # Test OPTIONS to see allowed methods
        response = self.http_client.options('/')
        
        if hasattr(response, 'headers') and 'Allow' in response.headers:
            allowed_methods = response.headers['Allow'].upper()
            
            dangerous_methods = ['PUT', 'DELETE', 'PATCH', 'TRACE']
            found_dangerous = [m for m in dangerous_methods if m in allowed_methods]
            
            if found_dangerous:
                # Test if they're actually enabled
                for method in found_dangerous:
                    if method == 'PUT':
                        test_response = self.http_client.post('/', data={'test': 'data'})
                    elif method == 'DELETE':
                        # DELETE is hard to test safely, just report
                        self.add_vulnerability(
                            title=f"Dangerous HTTP Method Enabled: {method}",
                            description=f"HTTP {method} method is enabled",
                            severity="Medium",
                            confidence=0.7,
                            location="/",
                            evidence=f"Method {method} in Allow header",
                            impact=f"HTTP {method} can be abused to modify or delete resources",
                            recommendation=f"Disable {method} method if not needed, or implement strict authorization"
                        )
    
    def _test_api_documentation_exposure(self):
        """Test for exposed API documentation"""
        doc_paths = [
            '/api/docs',
            '/swagger',
            '/swagger.json',
            '/api-docs',
            '/openapi.json',
            '/graphql',
        ]
        
        for path in doc_paths:
            response = self.http_client.get(path)
            
            if hasattr(response, 'status_code') and response.status_code == 200:
                if hasattr(response, 'text') and response.text:
                    # Check if it looks like API documentation
                    doc_indicators = ['swagger', 'openapi', 'api', 'endpoints', 'graphql']
                    if any(indicator in response.text.lower() for indicator in doc_indicators):
                        self.add_vulnerability(
                            title="Exposed API Documentation",
                            description=f"API documentation exposed at '{path}'",
                            severity="Low",
                            confidence=0.9,
                            location=path,
                            evidence="API documentation accessible",
                            impact="Documentation reveals API structure and endpoints to attackers",
                            recommendation="Restrict access to API documentation, use authentication or remove from production"
                        )
                        return




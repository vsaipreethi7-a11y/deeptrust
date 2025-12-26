import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from core.config import Config
from scanners.base import BaseScanner


class InjectionScanner(BaseScanner):
    
    def scan(self) -> List[Dict[str, Any]]:
        self.vulnerabilities = []
        
        # Test for SQL injection
        self._test_sql_injection()
        
        # Test for NoSQL injection
        self._test_nosql_injection()
        
        # Test for command injection
        self._test_command_injection()
        
        # Test for template injection
        self._test_template_injection()
        
        return self.get_vulnerabilities()
    
    def _test_sql_injection(self):
        # Common SQL error patterns
        sql_errors = [
            r"SQL syntax.*MySQL",
            r"Warning.*mysql_",
            r"PostgreSQL.*ERROR",
            r"Warning.*pg_",
            r"SQLite.*error",
            r"ORA-[0-9]{5}",
            r"Microsoft SQL Server",
            r"ODBC SQL Server Driver",
            r"SQLException",
            r"Unclosed quotation mark",
        ]
        
        test_params = ['id', 'user', 'search', 'q', 'query', 'name']
        
        for param in test_params:
            for payload in Config.SQL_INJECTION_PAYLOADS:
                # Test in URL parameter
                params = {param: payload}
                response = self.http_client.get('/', params=params)
                
                if hasattr(response, 'text') and response.text:
                    for error_pattern in sql_errors:
                        if re.search(error_pattern, response.text, re.IGNORECASE):
                            self.add_vulnerability(
                                title="SQL Injection Vulnerability",
                                description=f"SQL injection vulnerability detected in parameter '{param}'",
                                severity="High",
                                confidence=0.8,
                                location=f"GET parameter: {param}",
                                evidence=f"SQL error pattern detected: {error_pattern}",
                                impact="Attackers could read, modify, or delete database content",
                                recommendation="Use parameterized queries and input validation"
                            )
                            return  # Found one, move on
    
    def _test_nosql_injection(self):
        """Test for NoSQL injection vulnerabilities"""
        nosql_payloads = [
            {'$ne': None},
            {'$gt': ''},
            {'$regex': '.*'},
            {'$where': '1==1'},
        ]
        
        # Test POST requests with JSON
        test_endpoints = ['/api/login', '/api/user', '/api/search']
        
        for endpoint in test_endpoints:
            for payload in nosql_payloads:
                try:
                    response = self.http_client.post(endpoint, json=payload)
                    if hasattr(response, 'status_code') and response.status_code == 200:
                        # Check if we got unusual response indicating potential vulnerability
                        if hasattr(response, 'text') and response.text:
                            if 'admin' in response.text.lower() or 'success' in response.text.lower():
                                self.add_vulnerability(
                                    title="NoSQL Injection Vulnerability",
                                    description=f"Potential NoSQL injection in endpoint '{endpoint}'",
                                    severity="High",
                                    confidence=0.6,
                                    location=f"POST {endpoint}",
                                    evidence="Unusual response to NoSQL injection payload",
                                    impact="Attackers could bypass authentication or access unauthorized data",
                                    recommendation="Validate and sanitize all input, use parameterized queries"
                                )
                                return
                except Exception:
                    continue
    
    def _test_command_injection(self):
        """Test for command injection vulnerabilities"""
        command_payloads = [
            '; ls',
            '| whoami',
            '&& id',
            '`id`',
            '$(whoami)',
        ]
        
        # Test in URL parameters
        test_params = ['cmd', 'command', 'exec', 'system', 'file']
        
        for param in test_params:
            for payload in command_payloads:
                params = {param: payload}
                response = self.http_client.get('/', params=params)
                
                # Check for command execution indicators (this is simulation only)
                if hasattr(response, 'text') and response.text:
                    # Common command output indicators
                    if re.search(r'uid=\d+\(', response.text) or \
                       re.search(r'root:', response.text) or \
                       len(response.text) < 100:  # Suspiciously short response
                        self.add_vulnerability(
                            title="Command Injection Vulnerability",
                            description=f"Potential command injection in parameter '{param}'",
                            severity="Critical",
                            confidence=0.7,
                            location=f"GET parameter: {param}",
                            evidence="Response suggests command execution",
                            impact="Attackers could execute arbitrary system commands",
                            recommendation="Never execute user input as system commands, use safe APIs"
                        )
                        return
    
    def _test_template_injection(self):
        """Test for template injection vulnerabilities"""
        template_payloads = [
            '{{7*7}}',
            '${7*7}',
            '#{7*7}',
            '%{7*7}',
        ]
        
        test_params = ['template', 'view', 'render', 'name']
        
        for param in test_params:
            for payload in template_payloads:
                params = {param: payload}
                response = self.http_client.get('/', params=params)
                
                if hasattr(response, 'text') and response.text:
                    # Check if the result (49) appears in response
                    if '49' in response.text and payload.replace('7*7', '49') not in response.text:
                        self.add_vulnerability(
                            title="Template Injection Vulnerability",
                            description=f"Potential template injection in parameter '{param}'",
                            severity="High",
                            confidence=0.7,
                            location=f"GET parameter: {param}",
                            evidence="Template expression appears to be evaluated",
                            impact="Attackers could execute arbitrary code in template engine",
                            recommendation="Sanitize template inputs, use safe template rendering"
                        )
                        return




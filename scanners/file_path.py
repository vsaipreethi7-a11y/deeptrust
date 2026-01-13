from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class FilePathScanner(BaseScanner):
    """Scan for directory traversal and file access vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for file and path vulnerabilities"""
        self.vulnerabilities = []
        
        # Test for directory traversal
        self._test_directory_traversal()
        
        # Test for arbitrary file access
        self._test_arbitrary_file_access()
        
        return self.get_vulnerabilities()
    
    def _test_directory_traversal(self):
        """Test for directory traversal vulnerabilities"""
        traversal_payloads = [
            '../../../etc/passwd',
            '..\\..\\..\\windows\\system32\\config\\sam',
            '....//....//etc/passwd',
            '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
        ]
        
        test_params = ['file', 'path', 'page', 'include', 'view', 'doc']
        
        for param in test_params:
            for payload in traversal_payloads:
                params = {param: payload}
                response = self.http_client.get('/', params=params)
                
                if hasattr(response, 'text') and response.text:
                    # Check for common file indicators
                    file_indicators = [
                        'root:x:',
                        '[boot loader]',
                        '[extensions]',
                        '#!/bin/bash',
                    ]
                    
                    for indicator in file_indicators:
                        if indicator in response.text:
                            self.add_vulnerability(
                                title="Directory Traversal Vulnerability",
                                description=f"Directory traversal vulnerability in parameter '{param}'",
                                severity="High",
                                confidence=0.8,
                                location=f"GET parameter: {param}",
                                evidence=f"System file content detected: {indicator}",
                                impact="Attackers can read arbitrary files from the server",
                                recommendation="Validate and sanitize file paths, use whitelist of allowed files"
                            )
                            return
    
    def _test_arbitrary_file_access(self):
        """Test for arbitrary file access patterns"""
        # Test common sensitive files
        sensitive_files = [
            '/etc/passwd',
            '/etc/shadow',
            '/proc/version',
            '/windows/win.ini',
            '/web.config',
            '/.htaccess',
        ]
        
        for file_path in sensitive_files:
            response = self.http_client.get(file_path)
            
            if hasattr(response, 'status_code') and response.status_code == 200:
                if hasattr(response, 'text') and response.text:
                    # Check if it looks like the actual file
                    if file_path in ['/etc/passwd'] and 'root:' in response.text:
                        self.add_vulnerability(
                            title="Arbitrary File Access",
                            description=f"Sensitive file '{file_path}' is accessible",
                            severity="High",
                            confidence=0.9,
                            location=file_path,
                            evidence="System file accessible via HTTP",
                            impact="Sensitive system files exposed, revealing system structure",
                            recommendation="Implement proper access controls, restrict file access to web root"
                        )
                        return




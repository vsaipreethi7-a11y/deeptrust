import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from core.config import Config
from scanners.base import BaseScanner


class ConfigDeploymentScanner(BaseScanner):
    """Scan for configuration and deployment vulnerabilities"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for configuration issues"""
        self.vulnerabilities = []
        
        # Check for exposed debug mode
        self._test_debug_mode()
        
        # Check for stack trace leakage
        self._test_stack_trace_leakage()
        
        # Check for exposed sensitive files
        self._test_exposed_files()
        
        # Check for information disclosure
        self._test_information_disclosure()
        
        return self.get_vulnerabilities()
    
    def _test_debug_mode(self):
        """Test for enabled debug mode"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'text') and response.text:
            debug_indicators = [
                'debug mode',
                'debug=true',
                'debugging enabled',
                'development mode',
                'flask debug',
                'django debug',
            ]
            
            for indicator in debug_indicators:
                if indicator.lower() in response.text.lower():
                    self.add_vulnerability(
                        title="Debug Mode Enabled",
                        description="Debug mode appears to be enabled",
                        severity="Medium",
                        confidence=0.7,
                        location="/",
                        evidence=f"Debug indicator found: {indicator}",
                        impact="Debug mode exposes sensitive information and error details",
                        recommendation="Disable debug mode in production environments"
                    )
                    return
    
    def _test_stack_trace_leakage(self):
        """Test for stack trace leakage"""
        # Try to trigger an error
        error_trigger_paths = ['/nonexistent12345', '/test/error']
        
        for path in error_trigger_paths:
            response = self.http_client.get(path)
            
            if hasattr(response, 'text') and response.text:
                # Check for stack trace indicators
                stack_trace_indicators = [
                    'stack trace',
                    'traceback',
                    'exception',
                    'at java.',
                    'at python.',
                    'file "',
                    'line ',
                    'stackoverflow',
                ]
                
                found_indicators = [ind for ind in stack_trace_indicators 
                                   if ind.lower() in response.text.lower()]
                
                if found_indicators:
                    self.add_vulnerability(
                        title="Stack Trace Information Disclosure",
                        description="Stack traces exposed in error responses",
                        severity="Medium",
                        confidence=0.9,
                        location=path,
                        evidence=f"Stack trace indicators found: {', '.join(found_indicators[:3])}",
                        impact="Stack traces reveal internal structure, file paths, and code details",
                        recommendation="Configure error handling to show generic error messages to users"
                    )
                    return
    
    def _test_exposed_files(self):
        """Test for exposed sensitive files"""
        sensitive_files = [
            '/.env',
            '/.git/config',
            '/.gitignore',
            '/config.php',
            '/web.config',
            '/.htaccess',
            '/backup.sql',
            '/dump.sql',
            '/database.sql',
        ]
        
        for file_path in sensitive_files:
            response = self.http_client.get(file_path)
            
            if hasattr(response, 'status_code') and response.status_code == 200:
                if hasattr(response, 'text') and response.text:
                    # Check if it looks like the sensitive file
                    if '.env' in file_path and ('password' in response.text.lower() or 
                                                 'secret' in response.text.lower() or
                                                 'key' in response.text.lower()):
                        self.add_vulnerability(
                            title="Exposed Environment File",
                            description=f"Sensitive file '{file_path}' is accessible",
                            severity="Critical",
                            confidence=0.9,
                            location=file_path,
                            evidence="Environment file accessible via HTTP",
                            impact="Environment variables, secrets, and credentials exposed",
                            recommendation="Remove sensitive files from web root, use .gitignore, implement proper access controls"
                        )
                        return
                    elif '.git' in file_path:
                        self.add_vulnerability(
                            title="Exposed Git Repository",
                            description=f"Git repository accessible at '{file_path}'",
                            severity="High",
                            confidence=0.9,
                            location=file_path,
                            evidence="Git configuration accessible",
                            impact="Source code and version history exposed",
                            recommendation="Prevent access to .git directory, use .htaccess or server configuration"
                        )
                        return
                    elif '.sql' in file_path:
                        self.add_vulnerability(
                            title="Exposed Database Dump",
                            description=f"Database dump file '{file_path}' is accessible",
                            severity="Critical",
                            confidence=0.9,
                            location=file_path,
                            evidence="SQL dump file accessible",
                            impact="Complete database content exposed, including sensitive data",
                            recommendation="Remove database dumps from web root, use secure backup storage"
                        )
                        return
    
    def _test_information_disclosure(self):
        """Test for information disclosure in headers and responses"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'headers'):
            headers = response.headers
            
            # Check for server information disclosure
            if 'Server' in headers:
                server_info = headers['Server']
                # Check if it reveals version numbers
                if re.search(r'\d+\.\d+', server_info):
                    self.add_vulnerability(
                        title="Server Information Disclosure",
                        description=f"Server header reveals version: {server_info}",
                        severity="Low",
                        confidence=1.0,
                        location="HTTP Response Headers",
                        evidence=f"Server: {server_info}",
                        impact="Version information helps attackers target specific vulnerabilities",
                        recommendation="Remove or minimize Server header information"
                    )
            
            # Check for X-Powered-By header
            if 'X-Powered-By' in headers:
                self.add_vulnerability(
                    title="Technology Information Disclosure",
                    description=f"X-Powered-By header reveals technology: {headers['X-Powered-By']}",
                    severity="Low",
                    confidence=1.0,
                    location="HTTP Response Headers",
                    evidence=f"X-Powered-By: {headers['X-Powered-By']}",
                    impact="Technology stack information helps attackers",
                    recommendation="Remove X-Powered-By header"
                )




import re
from typing import List, Dict, Any
from core.http_client import HTTPClient
from scanners.base import BaseScanner


class SupplyChainScanner(BaseScanner):
    """Scan for supply chain and third-party risks"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan for supply chain vulnerabilities"""
        self.vulnerabilities = []
        
        # Test for insecure third-party scripts
        self._test_insecure_third_party_scripts()
        
        # Test for outdated JavaScript libraries
        self._test_outdated_libraries()
        
        return self.get_vulnerabilities()
    
    def _test_insecure_third_party_scripts(self):
        """Test for insecure third-party scripts (HTTP instead of HTTPS)"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'text') and response.text:
            # Look for script tags with HTTP URLs
            http_script_pattern = r'<script[^>]*src=["\']http://[^"\']+["\']'
            matches = re.findall(http_script_pattern, response.text, re.IGNORECASE)
            
            if matches:
                # Count HTTP scripts
                http_scripts = [m for m in matches if 'http://' in m.lower() and 'https://' not in m.lower()]
                
                if http_scripts:
                    self.add_vulnerability(
                        title="Insecure Third-Party Scripts",
                        description=f"Found {len(http_scripts)} third-party script(s) loaded over HTTP",
                        severity="Medium",
                        confidence=0.9,
                        location="/",
                        evidence=f"Scripts loaded over HTTP: {http_scripts[0][:100]}",
                        impact="Third-party scripts loaded over HTTP can be tampered with via MITM attacks",
                        recommendation="Load all third-party scripts over HTTPS, use Subresource Integrity (SRI)"
                    )
    
    def _test_outdated_libraries(self):
        """Test for known outdated JavaScript libraries"""
        response = self.http_client.get('/')
        
        if hasattr(response, 'text') and response.text:
            # Common vulnerable library patterns (simplified check)
            vulnerable_libraries = [
                (r'jquery-(\d+)\.(\d+)\.(\d+)', self._check_jquery_version),
                (r'bootstrap-(\d+)\.(\d+)', self._check_bootstrap_version),
            ]
            
            for pattern, checker in vulnerable_libraries:
                matches = re.findall(pattern, response.text, re.IGNORECASE)
                for match in matches:
                    version_info = checker(match)
                    if version_info and version_info.get('vulnerable'):
                        self.add_vulnerability(
                            title="Potentially Outdated Library",
                            description=f"Library version detected: {version_info.get('name')} {version_info.get('version')}",
                            severity="Low",
                            confidence=0.5,
                            location="/",
                            evidence=f"Library version: {version_info.get('version')}",
                            impact="Outdated libraries may contain known vulnerabilities",
                            recommendation=f"Update {version_info.get('name')} to latest secure version"
                        )
                        return
    
    @staticmethod
    def _check_jquery_version(match):
        """Check if jQuery version is outdated"""
        major, minor, patch = match
        version = f"{major}.{minor}.{patch}"
        # Simplified: flag versions < 3.0 as potentially outdated
        try:
            major_int = int(major)
            minor_int = int(minor)
            if major_int < 3:
                return {'name': 'jQuery', 'version': version, 'vulnerable': True}
        except ValueError:
            pass
        return None
    
    @staticmethod
    def _check_bootstrap_version(match):
        """Check if Bootstrap version is outdated"""
        major, minor = match
        version = f"{major}.{minor}"
        # Simplified check
        try:
            major_int = int(major)
            if major_int < 4:
                return {'name': 'Bootstrap', 'version': version, 'vulnerable': True}
        except ValueError:
            pass
        return None




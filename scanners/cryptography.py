import ssl
import socket
from typing import List, Dict, Any
from urllib.parse import urlparse
from core.http_client import HTTPClient
from core.config import Config
from scanners.base import BaseScanner


class CryptographyScanner(BaseScanner):
    """Scan for TLS/SSL and certificate issues"""
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scan cryptography and transport security"""
        self.vulnerabilities = []
        
        parsed = urlparse(self.target_url)
        
        if parsed.scheme == 'https':
            # Test TLS/SSL configuration
            self._test_tls_configuration(parsed.netloc)
            
            # Test certificate
            self._test_certificate(parsed.netloc)
        else:
            # HTTP site
            self.add_vulnerability(
                title="Insecure Protocol (HTTP)",
                description="Site uses HTTP instead of HTTPS",
                severity="High",
                confidence=1.0,
                location="Protocol",
                evidence="Connection uses HTTP",
                impact="All traffic is unencrypted, vulnerable to man-in-the-middle attacks",
                recommendation="Redirect all HTTP traffic to HTTPS, implement HSTS"
            )
        
        return self.get_vulnerabilities()
    
    def _test_tls_configuration(self, hostname: str):
        """Test TLS/SSL configuration"""
        try:
            port = 443
            if ':' in hostname:
                hostname, port_str = hostname.split(':')
                port = int(port_str)
            
            # Get SSL context
            context = ssl.create_default_context()
            
            with socket.create_connection((hostname, port), timeout=5) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    protocol = ssock.version()
                    cipher = ssock.cipher()
                    
                    # Check TLS version
                    tls_versions = {
                        'TLSv1': 1.0,
                        'TLSv1.1': 1.1,
                        'TLSv1.2': 1.2,
                        'TLSv1.3': 1.3,
                    }
                    
                    version_num = tls_versions.get(protocol, 0)
                    min_required = 1.2
                    
                    if version_num < min_required:
                        self.add_vulnerability(
                            title="Weak TLS Version",
                            description=f"TLS version {protocol} is insecure",
                            severity="High",
                            confidence=1.0,
                            location="TLS Configuration",
                            evidence=f"TLS Version: {protocol}",
                            impact="Vulnerable to known attacks (BEAST, POODLE, etc.)",
                            recommendation=f"Disable TLS {protocol} and require TLS 1.2 or higher"
                        )
                    elif version_num < 1.3:
                        self.add_vulnerability(
                            title="TLS Version Not Latest",
                            description=f"TLS version {protocol} is acceptable but not latest",
                            severity="Low",
                            confidence=0.8,
                            location="TLS Configuration",
                            evidence=f"TLS Version: {protocol}",
                            impact="Not using latest TLS version, missing performance and security improvements",
                            recommendation="Enable TLS 1.3 if supported by infrastructure"
                        )
                    
                    # Check cipher
                    if cipher:
                        cipher_name = cipher[0]
                        # Check for weak ciphers
                        weak_ciphers = ['RC4', 'DES', 'MD5', 'SHA1', 'NULL', 'EXPORT']
                        if any(weak in cipher_name for weak in weak_ciphers):
                            self.add_vulnerability(
                                title="Weak TLS Cipher",
                                description=f"Weak cipher suite detected: {cipher_name}",
                                severity="High",
                                confidence=1.0,
                                location="TLS Configuration",
                                evidence=f"Cipher: {cipher_name}",
                                impact="Cipher suite is vulnerable to known attacks",
                                recommendation="Disable weak cipher suites, use only strong ciphers (AES-GCM, ChaCha20-Poly1305)"
                            )
        
        except ssl.SSLError as e:
            self.add_vulnerability(
                title="SSL/TLS Configuration Error",
                description=f"SSL/TLS connection failed: {str(e)}",
                severity="High",
                confidence=0.9,
                location="TLS Configuration",
                evidence=str(e),
                impact="Cannot establish secure connection",
                recommendation="Fix SSL/TLS configuration, ensure valid certificate"
            )
        except Exception as e:
            # Connection or other error - don't report as vulnerability
            pass
    
    def _test_certificate(self, hostname: str):
        """Test SSL certificate"""
        try:
            port = 443
            if ':' in hostname:
                hostname, port_str = hostname.split(':')
                port = int(port_str)
            
            context = ssl.create_default_context()
            
            with socket.create_connection((hostname, port), timeout=5) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    cert = ssock.getpeercert()
                    
                    # Check certificate expiration
                    import datetime
                    not_after = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                    days_until_expiry = (not_after - datetime.datetime.now()).days
                    
                    if days_until_expiry < 30:
                        self.add_vulnerability(
                            title="Certificate Expiring Soon",
                            description=f"SSL certificate expires in {days_until_expiry} days",
                            severity="Low" if days_until_expiry > 7 else "Medium",
                            confidence=1.0,
                            location="SSL Certificate",
                            evidence=f"Certificate expires: {cert['notAfter']}",
                            impact="Certificate expiration will cause service interruption",
                            recommendation="Renew certificate before expiration"
                        )
                    
                    # Check certificate chain (simplified)
                    if not cert.get('issuer'):
                        self.add_vulnerability(
                            title="Certificate Chain Issue",
                            description="Certificate issuer information missing",
                            severity="Low",
                            confidence=0.6,
                            location="SSL Certificate",
                            evidence="Issuer information not available",
                            impact="Certificate validation may fail",
                            recommendation="Ensure proper certificate chain is configured"
                        )
        
        except ssl.CertificateError as e:
            self.add_vulnerability(
                title="SSL Certificate Error",
                description=f"Certificate validation failed: {str(e)}",
                severity="High",
                confidence=1.0,
                location="SSL Certificate",
                evidence=str(e),
                impact="Certificate is invalid or doesn't match hostname",
                recommendation="Fix certificate or hostname mismatch"
            )
        except Exception:
            pass




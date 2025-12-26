import os
from typing import Dict, List

class Config:    
    # Rate limiting (ethical boundaries)
    RATE_LIMIT_DELAY = 0.5  # Seconds between requests
    MAX_REQUESTS_PER_SECOND = 2
    
    # Timeouts
    REQUEST_TIMEOUT = 10  # Seconds
    CONNECTION_TIMEOUT = 5  # Seconds
    
    # User agent
    USER_AGENT = "TRUSTGRID-AI-Security-Scanner/1.0 (Authorized Testing Only)"
    
    # Request headers
    DEFAULT_HEADERS = {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
    }
    
    # SQL Injection payloads (safe, simulated testing only)
    SQL_INJECTION_PAYLOADS = [
        "' OR '1'='1",
        "' OR '1'='1' --",
        "' OR '1'='1' /*",
        "admin'--",
        "admin' #",
        "' UNION SELECT NULL--",
        "1' ORDER BY 1--",
        "1' ORDER BY 2--",
    ]
    
    # XSS payloads (safe, simulated testing only)
    XSS_PAYLOADS = [
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "<svg onload=alert('XSS')>",
        "javascript:alert('XSS')",
        "<body onload=alert('XSS')>",
    ]
    
    # Common vulnerable paths
    COMMON_PATHS = [
        '/admin',
        '/administrator',
        '/login',
        '/api',
        '/api/v1',
        '/.env',
        '/config',
        '/backup',
        '/test',
        '/debug',
    ]
    
    # Security headers to check
    SECURITY_HEADERS = [
        'Content-Security-Policy',
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Strict-Transport-Security',
        'X-XSS-Protection',
        'Referrer-Policy',
        'Permissions-Policy',
    ]
    
    # TLS minimum version
    MIN_TLS_VERSION = '1.2'
    
    @staticmethod
    def get_output_dir() -> str:
        """Get output directory, create if doesn't exist"""
        output_dir = os.getenv('OUTPUT_DIR', 'output')
        os.makedirs(output_dir, exist_ok=True)
        return output_dir



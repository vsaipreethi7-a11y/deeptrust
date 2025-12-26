import time
import requests
import urllib3
from typing import Dict, Optional, Tuple
from urllib.parse import urljoin, urlparse

from core.config import Config

# Disable SSL warnings for testing
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class HTTPClient:
    """HTTP client with rate limiting and safety controls"""
    
    def __init__(self, base_url: str, timeout: int = None, verify_ssl: bool = True):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update(Config.DEFAULT_HEADERS)
        self.timeout = timeout or Config.REQUEST_TIMEOUT
        self.verify_ssl = verify_ssl
        self.last_request_time = 0
        self.request_count = 0
        
    def _rate_limit(self):
        """Apply rate limiting between requests"""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        min_delay = 1.0 / Config.MAX_REQUESTS_PER_SECOND
        
        if time_since_last < min_delay:
            sleep_time = min_delay - time_since_last
            time.sleep(sleep_time)
        
        self.last_request_time = time.time()
        self.request_count += 1
    
    def get(self, path: str = '/', params: Optional[Dict] = None, 
            headers: Optional[Dict] = None) -> requests.Response:
        """Perform GET request with rate limiting"""
        self._rate_limit()
        url = urljoin(self.base_url, path)
        
        request_headers = self.session.headers.copy()
        if headers:
            request_headers.update(headers)
        
        try:
            response = self.session.get(
                url,
                params=params,
                headers=request_headers,
                timeout=self.timeout,
                verify=self.verify_ssl,
                allow_redirects=True
            )
            return response
        except requests.exceptions.RequestException as e:
            # Return a mock response object for error handling
            class ErrorResponse:
                def __init__(self, error):
                    self.status_code = 0
                    self.text = ''
                    self.headers = {}
                    self.url = url
                    self.error = str(error)
                    self.reason = str(error)
            
            return ErrorResponse(e)
    
    def post(self, path: str = '/', data: Optional[Dict] = None,
             json: Optional[Dict] = None, headers: Optional[Dict] = None) -> requests.Response:
        """Perform POST request with rate limiting"""
        self._rate_limit()
        url = urljoin(self.base_url, path)
        
        request_headers = self.session.headers.copy()
        if headers:
            request_headers.update(headers)
        
        try:
            response = self.session.post(
                url,
                data=data,
                json=json,
                headers=request_headers,
                timeout=self.timeout,
                verify=self.verify_ssl,
                allow_redirects=True
            )
            return response
        except requests.exceptions.RequestException as e:
            class ErrorResponse:
                def __init__(self, error):
                    self.status_code = 0
                    self.text = ''
                    self.headers = {}
                    self.url = url
                    self.error = str(error)
                    self.reason = str(error)
            
            return ErrorResponse(e)
    
    def head(self, path: str = '/', headers: Optional[Dict] = None) -> requests.Response:
        """Perform HEAD request with rate limiting"""
        self._rate_limit()
        url = urljoin(self.base_url, path)
        
        request_headers = self.session.headers.copy()
        if headers:
            request_headers.update(headers)
        
        try:
            response = self.session.head(
                url,
                headers=request_headers,
                timeout=self.timeout,
                verify=self.verify_ssl,
                allow_redirects=True
            )
            return response
        except requests.exceptions.RequestException as e:
            class ErrorResponse:
                def __init__(self, error):
                    self.status_code = 0
                    self.text = ''
                    self.headers = {}
                    self.url = url
                    self.error = str(error)
            
            return ErrorResponse(e)
    
    def options(self, path: str = '/', headers: Optional[Dict] = None) -> requests.Response:
        """Perform OPTIONS request to check allowed methods"""
        self._rate_limit()
        url = urljoin(self.base_url, path)
        
        request_headers = self.session.headers.copy()
        if headers:
            request_headers.update(headers)
        
        try:
            response = self.session.options(
                url,
                headers=request_headers,
                timeout=self.timeout,
                verify=self.verify_ssl,
                allow_redirects=True
            )
            return response
        except requests.exceptions.RequestException as e:
            class ErrorResponse:
                def __init__(self, error):
                    self.status_code = 0
                    self.text = ''
                    self.headers = {}
                    self.url = url
                    self.error = str(error)
            
            return ErrorResponse(e)
    
    def get_domain_info(self) -> Dict:
        """Get basic domain information"""
        parsed = urlparse(self.base_url)
        return {
            'domain': parsed.netloc,
            'scheme': parsed.scheme,
            'path': parsed.path,
            'port': parsed.port or (443 if parsed.scheme == 'https' else 80)
        }



from abc import ABC, abstractmethod
from typing import List, Dict, Any
from core.http_client import HTTPClient


class BaseScanner(ABC):
    """Base class for all vulnerability scanners"""
    
    def __init__(self, http_client: HTTPClient, target_url: str):
        self.http_client = http_client
        self.target_url = target_url
        self.vulnerabilities = []
    
    @abstractmethod
    def scan(self) -> List[Dict[str, Any]]:
        """Perform the security scan"""
        pass
    
    def add_vulnerability(
        self,
        title: str,
        description: str,
        severity: str,
        confidence: float,
        location: str = '',
        evidence: str = '',
        impact: str = '',
        recommendation: str = ''
    ):
        """Add a discovered vulnerability"""
        self.vulnerabilities.append({
            'title': title,
            'description': description,
            'severity': severity,  # Critical, High, Medium, Low, Info
            'confidence': confidence,  # 0.0 to 1.0
            'location': location,
            'evidence': evidence,
            'impact': impact,
            'recommendation': recommendation,
            'category': self.__class__.__name__.replace('Scanner', '')
        })
    
    def get_vulnerabilities(self) -> List[Dict[str, Any]]:
        """Get all discovered vulnerabilities"""
        return self.vulnerabilities
    
    def get_severity_score(self, severity: str) -> float:
        """Convert severity string to numeric score"""
        severity_map = {
            'Critical': 9.0,
            'High': 7.0,
            'Medium': 5.0,
            'Low': 3.0,
            'Info': 1.0
        }
        return severity_map.get(severity, 0.0)




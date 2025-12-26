import time
from typing import List, Dict, Any
from core.http_client import HTTPClient
from core.config import Config

# Import all scanners
from scanners.injection import InjectionScanner
from scanners.authentication import AuthenticationScanner
from scanners.xss import XSSScanner
from scanners.headers import HeadersScanner
from scanners.cryptography import CryptographyScanner
from scanners.api import APIScanner
from scanners.config_deployment import ConfigDeploymentScanner
from scanners.csrf import CSRFScanner
from scanners.file_path import FilePathScanner
from scanners.session import SessionScanner
from scanners.supply_chain import SupplyChainScanner
from scanners.traffic_manipulation import TrafficManipulationScanner
from scanners.spoofing import SpoofingScanner
from scanners.bot_automation import BotAutomationScanner
from scanners.logging_monitoring import LoggingMonitoringScanner
from scanners.business_logic import BusinessLogicScanner

# Import ranking and scoring
from ranking.scorer import RiskScorer
from ranking.ranker import VulnerabilityRanker


class SecurityAssessmentEngine:
    """Main engine for security assessment"""
    
    def __init__(self, target_url: str, verbose: bool = False):
        self.target_url = target_url
        self.verbose = verbose
        self.http_client = HTTPClient(target_url)
        self.all_vulnerabilities = []
        
        # Initialize scanners
        self.scanners = [
            HeadersScanner(self.http_client, target_url),
            CryptographyScanner(self.http_client, target_url),
            InjectionScanner(self.http_client, target_url),
            AuthenticationScanner(self.http_client, target_url),
            XSSScanner(self.http_client, target_url),
            APIScanner(self.http_client, target_url),
            ConfigDeploymentScanner(self.http_client, target_url),
            CSRFScanner(self.http_client, target_url),
            FilePathScanner(self.http_client, target_url),
            SessionScanner(self.http_client, target_url),
            SupplyChainScanner(self.http_client, target_url),
            TrafficManipulationScanner(self.http_client, target_url),
            SpoofingScanner(self.http_client, target_url),
            BotAutomationScanner(self.http_client, target_url),
            LoggingMonitoringScanner(self.http_client, target_url),
            BusinessLogicScanner(self.http_client, target_url),
        ]
    
    def scan(self, scanner_callback=None) -> Dict[str, Any]:
        """Run complete security scan
        
        Args:
            scanner_callback: Optional callback function(scanner_name, scanner_index, total_scanners)
                             called when each scanner starts running
        """
        print(f"[*] Starting security assessment for: {self.target_url}")
        print(f"[*] Initializing scanners...")
        print()
        
        start_time = time.time()
        total_scanners = len(self.scanners)
        
        # Run all scanners
        for index, scanner in enumerate(self.scanners, 1):
            scanner_name = scanner.__class__.__name__.replace('Scanner', '')
            
            # Call callback if provided (for progress tracking)
            if scanner_callback:
                scanner_callback(scanner_name, index, total_scanners)
            
            if self.verbose:
                print(f"[*] Running {scanner_name} scanner...")
            
            try:
                vulnerabilities = scanner.scan()
                self.all_vulnerabilities.extend(vulnerabilities)
                
                if self.verbose:
                    print(f"    Found {len(vulnerabilities)} vulnerability(ies)")
            except Exception as e:
                if self.verbose:
                    print(f"    Error in {scanner_name}: {str(e)}")
                continue
        
        scan_time = time.time() - start_time
        
        print()
        print(f"[*] Scan completed in {scan_time:.2f} seconds")
        print(f"[*] Total vulnerabilities found: {len(self.all_vulnerabilities)}")
        print()
        
        # Calculate overall rating
        overall_rating = RiskScorer.calculate_overall_security_rating(self.all_vulnerabilities)
        
        # Generate security scorecard
        security_scorecard = RiskScorer.calculate_security_scorecard(self.all_vulnerabilities)
        
        # Rank vulnerabilities
        ranked_vulnerabilities = VulnerabilityRanker.rank_vulnerabilities(self.all_vulnerabilities)
        
        # Generate impact analysis
        impact_analysis = VulnerabilityRanker.generate_impact_analysis(self.all_vulnerabilities)
        
        return {
            'vulnerabilities': self.all_vulnerabilities,
            'overall_rating': overall_rating,
            'security_scorecard': security_scorecard,
            'ranked_vulnerabilities': ranked_vulnerabilities,
            'impact_analysis': impact_analysis,
            'scan_time': scan_time
        }
    
    def get_vulnerabilities(self) -> List[Dict[str, Any]]:
        """Get all discovered vulnerabilities"""
        return self.all_vulnerabilities


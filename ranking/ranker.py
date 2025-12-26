from typing import List, Dict, Any
from ranking.scorer import RiskScorer


class VulnerabilityRanker:
    """Rank vulnerabilities by risk and impact"""
    
    @staticmethod
    def rank_vulnerabilities(vulnerabilities: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Rank vulnerabilities by risk score (highest first)"""
        # Calculate score for each vulnerability
        ranked = []
        for vuln in vulnerabilities:
            score = RiskScorer.calculate_vulnerability_score(vuln)
            ranked.append({
                **vuln,
                'risk_score': round(score, 2)
            })
        
        # Sort by risk score (descending), then by severity
        severity_order = {'Critical': 5, 'High': 4, 'Medium': 3, 'Low': 2, 'Info': 1}
        
        ranked.sort(key=lambda x: (
            -x['risk_score'],  # Negative for descending
            -severity_order.get(x.get('severity', 'Info'), 0)
        ))
        
        return ranked
    
    @staticmethod
    def generate_impact_analysis(vulnerabilities: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate impact analysis"""
        ranked = VulnerabilityRanker.rank_vulnerabilities(vulnerabilities)
        
        # Categorize impacts
        technical_impacts = []
        business_impacts = []
        
        impact_mapping = {
            'data_breach': ['sql injection', 'nosql injection', 'idor', 'excessive data'],
            'authentication_bypass': ['authentication', 'authorization', 'csrf'],
            'code_execution': ['command injection', 'template injection', 'xss'],
            'service_disruption': ['ddos', 'availability'],
            'information_disclosure': ['information disclosure', 'stack trace', 'debug mode'],
        }
        
        for vuln in ranked[:10]:  # Top 10
            title_lower = vuln.get('title', '').lower()
            description_lower = vuln.get('description', '').lower()
            
            # Technical impact
            tech_impact = vuln.get('impact', 'Unknown impact')
            if tech_impact not in [ti['description'] for ti in technical_impacts]:
                technical_impacts.append({
                    'vulnerability': vuln.get('title'),
                    'description': tech_impact,
                    'severity': vuln.get('severity'),
                })
            
            # Business impact (derived from technical impact)
            business_impact_desc = VulnerabilityRanker._derive_business_impact(vuln)
            if business_impact_desc:
                business_impacts.append({
                    'vulnerability': vuln.get('title'),
                    'description': business_impact_desc,
                    'severity': vuln.get('severity'),
                })
        
        return {
            'technical_impacts': technical_impacts[:5],
            'business_impacts': business_impacts[:5],
            'summary': f"Analysis of {len(ranked)} vulnerabilities reveals {len(technical_impacts)} distinct technical impact categories"
        }
    
    @staticmethod
    def _derive_business_impact(vuln: Dict[str, Any]) -> str:
        """Derive business impact from vulnerability"""
        severity = vuln.get('severity', 'Low')
        title_lower = vuln.get('title', '').lower()
        
        if severity == 'Critical':
            if 'injection' in title_lower or 'execution' in title_lower:
                return "Critical business risk: Potential complete system compromise, data breach, regulatory fines"
            elif 'authentication' in title_lower or 'bypass' in title_lower:
                return "Critical business risk: Unauthorized access, data breach, loss of customer trust"
        elif severity == 'High':
            if 'data' in title_lower or 'exposure' in title_lower:
                return "High business risk: Customer data exposure, GDPR/privacy violations, reputation damage"
            elif 'xss' in title_lower or 'csrf' in title_lower:
                return "High business risk: User account compromise, fraud, loss of customer trust"
        elif severity == 'Medium':
            return "Medium business risk: Increased attack surface, potential for exploitation"
        
        return "Low business risk: Minor security concern, should be addressed"




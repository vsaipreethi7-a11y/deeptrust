import json
from datetime import datetime
from typing import Dict, Any, List
from core.config import Config


class JSONReportGenerator:
    """Generate machine-readable JSON security assessment report"""
    
    @staticmethod
    def generate(
        target_url: str,
        vulnerabilities: List[Dict[str, Any]],
        overall_rating: Dict[str, Any],
        security_scorecard: Dict[str, Any],
        impact_analysis: Dict[str, Any],
        ranked_vulnerabilities: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Generate complete JSON report"""
        
        report = {
            'metadata': {
                'target_url': target_url,
                'scan_timestamp': datetime.utcnow().isoformat() + 'Z',
                'scanner_version': 'TRUSTGRID.AI v1.0',
                'scanner_name': 'TRUSTGRID.AI Security Assessment Framework'
            },
            'overall_security_rating': {
                'score': overall_rating['score'],
                'level': overall_rating['level'],
                'description': overall_rating['description'],
                'severity_breakdown': overall_rating.get('severity_breakdown', {}),
                'total_vulnerabilities': overall_rating.get('total_vulnerabilities', 0)
            },
            'ranking': {
                'total_vulnerabilities': len(ranked_vulnerabilities),
                'top_vulnerabilities': [
                    {
                        'rank': idx + 1,
                        'title': vuln.get('title'),
                        'severity': vuln.get('severity'),
                        'risk_score': vuln.get('risk_score', 0),
                        'confidence': vuln.get('confidence', 0),
                        'location': vuln.get('location', ''),
                    }
                    for idx, vuln in enumerate(ranked_vulnerabilities[:20])  # Top 20
                ]
            },
            'impact_analysis': {
                'technical_impacts': impact_analysis.get('technical_impacts', []),
                'business_impacts': impact_analysis.get('business_impacts', []),
                'summary': impact_analysis.get('summary', '')
            },
            'vulnerabilities': [
                {
                    'title': vuln.get('title'),
                    'description': vuln.get('description'),
                    'severity': vuln.get('severity'),
                    'confidence': vuln.get('confidence'),
                    'category': vuln.get('category', 'Unknown'),
                    'location': vuln.get('location', ''),
                    'evidence': vuln.get('evidence', ''),
                    'impact': vuln.get('impact', ''),
                    'recommendation': vuln.get('recommendation', ''),
                    'risk_score': vuln.get('risk_score', 0)
                }
                for vuln in ranked_vulnerabilities
            ],
            'security_scorecard': security_scorecard,
            'recommendations': JSONReportGenerator._generate_recommendations(ranked_vulnerabilities)
        }
        
        return report
    
    @staticmethod
    def _generate_recommendations(vulnerabilities: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate prioritized recommendations"""
        immediate_fixes = []
        short_term_fixes = []
        long_term_fixes = []
        
        # Categorize recommendations by severity and type
        for vuln in vulnerabilities:
            severity = vuln.get('severity', 'Low')
            category = vuln.get('category', '').lower()
            recommendation = vuln.get('recommendation', '')
            
            # Critical and High severity = immediate
            if severity in ['Critical', 'High']:
                immediate_fixes.append({
                    'vulnerability': vuln.get('title'),
                    'recommendation': recommendation,
                    'priority': 'Critical' if severity == 'Critical' else 'High'
                })
            # Medium severity = short-term
            elif severity == 'Medium':
                short_term_fixes.append({
                    'vulnerability': vuln.get('title'),
                    'recommendation': recommendation,
                    'priority': 'Medium'
                })
            # Low and Info = long-term
            else:
                long_term_fixes.append({
                    'vulnerability': vuln.get('title'),
                    'recommendation': recommendation,
                    'priority': 'Low'
                })
        
        # Add generic recommendations based on categories found
        categories_found = set(v.get('category', '') for v in vulnerabilities)
        
        if 'Injection' in categories_found:
            immediate_fixes.append({
                'vulnerability': 'Generic Injection Prevention',
                'recommendation': 'Implement input validation and parameterized queries across all data inputs',
                'priority': 'High'
            })
        
        if any('XSS' in cat or 'xss' in cat.lower() for cat in categories_found):
            immediate_fixes.append({
                'vulnerability': 'XSS Prevention',
                'recommendation': 'Implement Content-Security-Policy and output encoding',
                'priority': 'High'
            })
        
        return {
            'immediate_fixes': immediate_fixes[:10],  # Top 10
            'short_term_fixes': short_term_fixes[:10],
            'long_term_fixes': long_term_fixes[:10],
            'summary': f"Prioritize {len(immediate_fixes)} immediate fixes, {len(short_term_fixes)} short-term improvements, and {len(long_term_fixes)} long-term enhancements"
        }
    
    @staticmethod
    def save(report: Dict[str, Any], output_path: str):
        """Save JSON report to file"""
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)




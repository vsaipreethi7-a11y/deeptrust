from typing import List, Dict, Any
import math


class RiskScorer:
    """Calculate risk scores for vulnerabilities and overall security rating"""
    
    SEVERITY_WEIGHTS = {
        'Critical': 10.0,
        'High': 7.0,
        'Medium': 5.0,
        'Low': 3.0,
        'Info': 1.0,
    }
    
    CONFIDENCE_WEIGHT = 0.3  # Confidence affects score
    
    @staticmethod
    def calculate_vulnerability_score(vuln: Dict[str, Any]) -> float:
        """Calculate risk score for a single vulnerability (0-10)"""
        severity = vuln.get('severity', 'Info')
        confidence = vuln.get('confidence', 0.5)
        
        base_score = RiskScorer.SEVERITY_WEIGHTS.get(severity, 1.0)
        
        # Adjust score based on confidence
        adjusted_score = base_score * (0.7 + (confidence * 0.3))
        
        # Cap at 10.0
        return min(adjusted_score, 10.0)
    
    @staticmethod
    def calculate_overall_security_rating(vulnerabilities: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate overall security rating and score"""
        if not vulnerabilities:
            return {
                'score': 0.0,
                'level': 'Low',
                'description': 'No vulnerabilities found'
            }
        
        # Calculate scores for each vulnerability
        vuln_scores = [RiskScorer.calculate_vulnerability_score(v) for v in vulnerabilities]
        
        # Overall score is based on highest severity and weighted average
        max_score = max(vuln_scores)
        avg_score = sum(vuln_scores) / len(vuln_scores)
        
        # Weighted combination: 60% max, 40% average
        overall_score = (max_score * 0.6) + (avg_score * 0.4)
        
        # Count by severity
        severity_counts = {
            'Critical': sum(1 for v in vulnerabilities if v.get('severity') == 'Critical'),
            'High': sum(1 for v in vulnerabilities if v.get('severity') == 'High'),
            'Medium': sum(1 for v in vulnerabilities if v.get('severity') == 'Medium'),
            'Low': sum(1 for v in vulnerabilities if v.get('severity') == 'Low'),
            'Info': sum(1 for v in vulnerabilities if v.get('severity') == 'Info'),
        }
        
        # Determine risk level
        if overall_score >= 7.0 or severity_counts['Critical'] > 0:
            level = 'Critical'
        elif overall_score >= 5.0 or severity_counts['High'] > 2:
            level = 'High'
        elif overall_score >= 3.0 or severity_counts['Medium'] > 3:
            level = 'Moderate'
        else:
            level = 'Low'
        
        # Generate description
        total_count = len(vulnerabilities)
        description = f"Found {total_count} vulnerability(ies): "
        description += f"{severity_counts['Critical']} Critical, "
        description += f"{severity_counts['High']} High, "
        description += f"{severity_counts['Medium']} Medium, "
        description += f"{severity_counts['Low']} Low, "
        description += f"{severity_counts['Info']} Informational"
        
        return {
            'score': round(overall_score, 2),
            'level': level,
            'description': description,
            'severity_breakdown': severity_counts,
            'total_vulnerabilities': total_count
        }
    
    @staticmethod
    def calculate_security_scorecard(vulnerabilities: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate security scorecard by category"""
        categories = {}
        
        for vuln in vulnerabilities:
            category = vuln.get('category', 'Unknown')
            if category not in categories:
                categories[category] = {
                    'count': 0,
                    'critical': 0,
                    'high': 0,
                    'medium': 0,
                    'low': 0,
                    'info': 0,
                    'max_severity_score': 0.0
                }
            
            categories[category]['count'] += 1
            severity = vuln.get('severity', 'Info')
            categories[category][severity.lower()] = categories[category].get(severity.lower(), 0) + 1
            
            # Track max severity score in category
            vuln_score = RiskScorer.calculate_vulnerability_score(vuln)
            if vuln_score > categories[category]['max_severity_score']:
                categories[category]['max_severity_score'] = vuln_score
        
        # Calculate category scores (0-10, inverse of risk)
        scorecard = {}
        for category, data in categories.items():
            # Category score is inverse: lower max_severity = higher security score
            # Score = 10 - (max_severity_score / 10) * 10, but adjusted
            max_severity = data['max_severity_score']
            security_score = max(0.0, 10.0 - max_severity)
            scorecard[category] = {
                'security_score': round(security_score, 2),
                'risk_level': 'Critical' if max_severity >= 7 else 
                            'High' if max_severity >= 5 else
                            'Moderate' if max_severity >= 3 else 'Low',
                'vulnerability_count': data['count'],
                'severity_breakdown': {
                    'critical': data['critical'],
                    'high': data['high'],
                    'medium': data['medium'],
                    'low': data['low'],
                    'info': data['info'],
                }
            }
        
        return scorecard




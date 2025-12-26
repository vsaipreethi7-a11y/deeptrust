from datetime import datetime
from typing import Dict, Any, List
from core.config import Config


class ReportGenerator:
    """Generate human-readable security assessment report"""
    
    @staticmethod
    def generate(
        target_url: str,
        json_report: Dict[str, Any]
    ) -> str:
        """Generate markdown report from JSON data"""
        
        overall = json_report.get('overall_security_rating', {})
        ranking = json_report.get('ranking', {})
        impact = json_report.get('impact_analysis', {})
        vulnerabilities = json_report.get('vulnerabilities', [])
        scorecard = json_report.get('security_scorecard', {})
        recommendations = json_report.get('recommendations', {})
        
        report_lines = []
        
        # Header
        report_lines.append("# Security Assessment Report")
        report_lines.append("")
        report_lines.append(f"**Generated:** {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}  ")
        report_lines.append(f"**Target:** {target_url}  ")
        report_lines.append(f"**Scanner:** TRUSTGRID.AI Security Assessment Framework  ")
        report_lines.append("")
        report_lines.append("---")
        report_lines.append("")
        
        # Executive Summary
        report_lines.append("## Executive Summary")
        report_lines.append("")
        report_lines.append(f"**Overall Risk Level:** {overall.get('level', 'Unknown')}  ")
        report_lines.append(f"**Security Score:** {overall.get('score', 0)}/10  ")
        report_lines.append(f"**Total Vulnerabilities:** {overall.get('total_vulnerabilities', 0)}  ")
        report_lines.append("")
        report_lines.append(overall.get('description', 'No description available'))
        report_lines.append("")
        
        # Severity Breakdown
        breakdown = overall.get('severity_breakdown', {})
        if breakdown:
            report_lines.append("**Severity Breakdown:**")
            report_lines.append("")
            report_lines.append(f"- Critical: {breakdown.get('Critical', 0)}")
            report_lines.append(f"- High: {breakdown.get('High', 0)}")
            report_lines.append(f"- Medium: {breakdown.get('Medium', 0)}")
            report_lines.append(f"- Low: {breakdown.get('Low', 0)}")
            report_lines.append(f"- Informational: {breakdown.get('Info', 0)}")
            report_lines.append("")
        
        report_lines.append("---")
        report_lines.append("")
        
        # Overall Risk Ranking
        report_lines.append("## Overall Risk Ranking")
        report_lines.append("")
        report_lines.append(f"**Risk Level:** {overall.get('level', 'Unknown')} (Score: {overall.get('score', 0)}/10)")
        report_lines.append("")
        
        # Risk Level Description
        risk_level = overall.get('level', '').lower()
        if risk_level == 'critical':
            report_lines.append("⚠️ **CRITICAL RISK**: Immediate action required. System is at high risk of compromise.")
        elif risk_level == 'high':
            report_lines.append("🔴 **HIGH RISK**: Significant security issues identified. Address vulnerabilities promptly.")
        elif risk_level == 'moderate':
            report_lines.append("🟡 **MODERATE RISK**: Security improvements needed. Plan remediation efforts.")
        else:
            report_lines.append("🟢 **LOW RISK**: Security posture is acceptable but can be improved.")
        
        report_lines.append("")
        report_lines.append("---")
        report_lines.append("")
        
        # Top Vulnerabilities
        report_lines.append("## Top Vulnerabilities")
        report_lines.append("")
        top_vulns = ranking.get('top_vulnerabilities', [])[:10]
        
        for idx, vuln in enumerate(top_vulns, 1):
            report_lines.append(f"### {idx}. {vuln.get('title', 'Unknown')}")
            report_lines.append("")
            report_lines.append(f"- **Severity:** {vuln.get('severity', 'Unknown')}")
            report_lines.append(f"- **Risk Score:** {vuln.get('risk_score', 0)}/10")
            report_lines.append(f"- **Confidence:** {vuln.get('confidence', 0)*100:.0f}%")
            report_lines.append(f"- **Location:** {vuln.get('location', 'Unknown')}")
            report_lines.append("")
        
        report_lines.append("---")
        report_lines.append("")
        
        # Technical Impact
        report_lines.append("## Technical Impact Analysis")
        report_lines.append("")
        tech_impacts = impact.get('technical_impacts', [])
        
        if tech_impacts:
            for impact_item in tech_impacts:
                report_lines.append(f"**{impact_item.get('vulnerability', 'Unknown')}**")
                report_lines.append("")
                report_lines.append(f"- Severity: {impact_item.get('severity', 'Unknown')}")
                report_lines.append(f"- Impact: {impact_item.get('description', 'Unknown')}")
                report_lines.append("")
        else:
            report_lines.append("No significant technical impacts identified.")
            report_lines.append("")
        
        report_lines.append("---")
        report_lines.append("")
        
        # Business Impact
        report_lines.append("## Business Impact Analysis")
        report_lines.append("")
        biz_impacts = impact.get('business_impacts', [])
        
        if biz_impacts:
            for impact_item in biz_impacts:
                report_lines.append(f"**{impact_item.get('vulnerability', 'Unknown')}**")
                report_lines.append("")
                report_lines.append(f"- Severity: {impact_item.get('severity', 'Unknown')}")
                report_lines.append(f"- Business Impact: {impact_item.get('description', 'Unknown')}")
                report_lines.append("")
        else:
            report_lines.append("No significant business impacts identified.")
            report_lines.append("")
        
        report_lines.append("---")
        report_lines.append("")
        
        # Attack Simulation Results
        report_lines.append("## Attack Simulation Results")
        report_lines.append("")
        report_lines.append("The following vulnerability categories were tested:")
        report_lines.append("")
        
        categories_tested = set(v.get('category', 'Unknown') for v in vulnerabilities)
        for category in sorted(categories_tested):
            category_vulns = [v for v in vulnerabilities if v.get('category') == category]
            count = len(category_vulns)
            report_lines.append(f"- **{category}**: {count} vulnerability(ies) found")
        
        report_lines.append("")
        report_lines.append("---")
        report_lines.append("")
        
        # Security Scorecard
        report_lines.append("## Security Scorecard by Category")
        report_lines.append("")
        
        if scorecard:
            report_lines.append("| Category | Security Score | Risk Level | Vulnerabilities |")
            report_lines.append("|----------|----------------|------------|-----------------|")
            
            for category, data in sorted(scorecard.items()):
                score = data.get('security_score', 0)
                risk = data.get('risk_level', 'Unknown')
                count = data.get('vulnerability_count', 0)
                report_lines.append(f"| {category} | {score}/10 | {risk} | {count} |")
            
            report_lines.append("")
        else:
            report_lines.append("No category-specific scorecard available.")
            report_lines.append("")
        
        report_lines.append("---")
        report_lines.append("")
        
        # Prioritized Fixes
        report_lines.append("## Prioritized Fixes & Suggestions")
        report_lines.append("")
        
        # Immediate Fixes
        immediate = recommendations.get('immediate_fixes', [])
        if immediate:
            report_lines.append("### 🔴 Immediate Fixes (Critical/High Priority)")
            report_lines.append("")
            for fix in immediate:
                report_lines.append(f"**{fix.get('vulnerability', 'Unknown')}**")
                report_lines.append("")
                report_lines.append(f"{fix.get('recommendation', 'No recommendation')}")
                report_lines.append("")
        
        # Short-term Fixes
        short_term = recommendations.get('short_term_fixes', [])
        if short_term:
            report_lines.append("### 🟡 Short-term Fixes (Medium Priority)")
            report_lines.append("")
            for fix in short_term:
                report_lines.append(f"**{fix.get('vulnerability', 'Unknown')}**")
                report_lines.append("")
                report_lines.append(f"{fix.get('recommendation', 'No recommendation')}")
                report_lines.append("")
        
        # Long-term Fixes
        long_term = recommendations.get('long_term_fixes', [])
        if long_term:
            report_lines.append("### 🟢 Long-term Fixes (Low Priority)")
            report_lines.append("")
            for fix in long_term[:5]:  # Limit to top 5
                report_lines.append(f"**{fix.get('vulnerability', 'Unknown')}**")
                report_lines.append("")
                report_lines.append(f"{fix.get('recommendation', 'No recommendation')}")
                report_lines.append("")
        
        report_lines.append("---")
        report_lines.append("")
        
        # Detailed Vulnerabilities
        report_lines.append("## Detailed Vulnerability List")
        report_lines.append("")
        
        for idx, vuln in enumerate(vulnerabilities[:50], 1):  # Limit to 50
            report_lines.append(f"### {idx}. {vuln.get('title', 'Unknown Vulnerability')}")
            report_lines.append("")
            report_lines.append(f"**Severity:** {vuln.get('severity', 'Unknown')} | ")
            report_lines.append(f"**Confidence:** {vuln.get('confidence', 0)*100:.0f}% | ")
            report_lines.append(f"**Category:** {vuln.get('category', 'Unknown')}")
            report_lines.append("")
            report_lines.append(f"**Description:** {vuln.get('description', 'No description')}")
            report_lines.append("")
            report_lines.append(f"**Location:** {vuln.get('location', 'Unknown')}")
            report_lines.append("")
            if vuln.get('evidence'):
                report_lines.append(f"**Evidence:** {vuln.get('evidence')}")
                report_lines.append("")
            report_lines.append(f"**Impact:** {vuln.get('impact', 'Unknown impact')}")
            report_lines.append("")
            report_lines.append(f"**Recommendation:** {vuln.get('recommendation', 'No recommendation')}")
            report_lines.append("")
            report_lines.append("---")
            report_lines.append("")
        
        # Footer
        report_lines.append("")
        report_lines.append("---")
        report_lines.append("")
        report_lines.append("**Report Generated by:** TRUSTGRID.AI Security Assessment Framework")
        report_lines.append("")
        report_lines.append("⚠️ **Important:** This report is generated for authorized testing only. ")
        report_lines.append("All security tests are simulated and rate-limited for safety.")
        report_lines.append("")
        
        return "\n".join(report_lines)
    
    @staticmethod
    def save(report_content: str, output_path: str):
        """Save markdown report to file"""
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report_content)




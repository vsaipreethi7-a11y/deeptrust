import argparse
import sys
import os
from datetime import datetime

from utils.validators import is_valid_url
from core.engine import SecurityAssessmentEngine
from core.config import Config
from reporting.json_generator import JSONReportGenerator
from reporting.report_generator import ReportGenerator
from utils.validators import sanitize_filename


def print_banner():
    """Print application banner"""
    banner = """
    ╔═══════════════════════════════════════════════════════════════╗
    ║  TRUSTGRID.AI - Security Assessment Framework                 ║
    ║  Automated Cyber Risk Assessment at Scale                     ║
    ╚═══════════════════════════════════════════════════════════════╝
    """
    print(banner)


def print_ethical_warning():
    """Print ethical and legal warning"""
    warning = """
    ⚠️  ETHICAL AND LEGAL NOTICE  ⚠️
    
    This tool is for AUTHORIZED TESTING ONLY.
    
    - Only test websites you own or have explicit written permission to test
    - All attacks are simulated and rate-limited
    - Never use this tool on unauthorized systems
    - Violations may result in legal action
    
    By using this tool, you agree to use it ethically and legally.
    """
    print(warning)
    print()


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description='TRUSTGRID.AI Security Assessment Framework',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py --target https://example.com
  python main.py --target https://example.com --output ./reports --verbose
        """
    )
    
    parser.add_argument(
        '--target',
        required=True,
        help='Target URL to scan (must be authorized)'
    )
    
    parser.add_argument(
        '--output',
        default=None,
        help='Output directory for reports (default: ./output)'
    )
    
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable verbose output'
    )
    
    parser.add_argument(
        '--skip-warning',
        action='store_true',
        help='Skip ethical warning (not recommended)'
    )
    
    args = parser.parse_args()
    
    # Print banner
    print_banner()
    
    # Print ethical warning
    if not args.skip_warning:
        print_ethical_warning()
        response = input("Do you have authorization to test this target? (yes/no): ")
        if response.lower() != 'yes':
            print("Exiting. Only test authorized targets.")
            sys.exit(1)
        print()
    
    # Validate URL
    target_url = args.target
    if not is_valid_url(target_url):
        print(f"❌ Error: Invalid URL: {target_url}")
        sys.exit(1)
    
    # Set output directory
    if args.output:
        os.makedirs(args.output, exist_ok=True)
        Config.get_output_dir = lambda: args.output
    
    output_dir = Config.get_output_dir()
    
    try:
        # Initialize engine
        engine = SecurityAssessmentEngine(target_url, verbose=args.verbose)
        
        # Run scan
        scan_results = engine.scan()
        
        # Generate reports
        print("[*] Generating reports...")
        
        # Generate JSON report
        json_report = JSONReportGenerator.generate(
            target_url=target_url,
            vulnerabilities=scan_results['vulnerabilities'],
            overall_rating=scan_results['overall_rating'],
            security_scorecard=scan_results['security_scorecard'],
            impact_analysis=scan_results['impact_analysis'],
            ranked_vulnerabilities=scan_results['ranked_vulnerabilities']
        )
        
        # Save JSON report
        domain = sanitize_filename(target_url.replace('https://', '').replace('http://', '').split('/')[0])
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        json_filename = f"{output_dir}/security_assessment_{domain}_{timestamp}.json"
        JSONReportGenerator.save(json_report, json_filename)
        print(f"[+] JSON report saved: {json_filename}")
        
        # Generate markdown report
        markdown_report = ReportGenerator.generate(
            target_url=target_url,
            json_report=json_report
        )
        
        # Save markdown report
        markdown_filename = f"{output_dir}/security_report_{domain}_{timestamp}.md"
        ReportGenerator.save(markdown_report, markdown_filename)
        print(f"[+] Security report saved: {markdown_filename}")
        
        # Print summary
        print()
        print("=" * 60)
        print("SCAN SUMMARY")
        print("=" * 60)
        overall = scan_results['overall_rating']
        print(f"Target: {target_url}")
        print(f"Risk Level: {overall.get('level', 'Unknown')}")
        print(f"Security Score: {overall.get('score', 0)}/10")
        print(f"Total Vulnerabilities: {overall.get('total_vulnerabilities', 0)}")
        print(f"Scan Time: {scan_results['scan_time']:.2f} seconds")
        print()
        
        # Show severity breakdown
        breakdown = overall.get('severity_breakdown', {})
        if breakdown:
            print("Severity Breakdown:")
            if breakdown.get('Critical', 0) > 0:
                print(f"  Critical: {breakdown['Critical']}")
            if breakdown.get('High', 0) > 0:
                print(f"  High: {breakdown['High']}")
            if breakdown.get('Medium', 0) > 0:
                print(f"  Medium: {breakdown['Medium']}")
            if breakdown.get('Low', 0) > 0:
                print(f"  Low: {breakdown['Low']}")
            if breakdown.get('Info', 0) > 0:
                print(f"  Info: {breakdown['Info']}")
        
        print()
        print("=" * 60)
        print("Reports generated successfully!")
        print("=" * 60)
        
    except KeyboardInterrupt:
        print("\n[!] Scan interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()




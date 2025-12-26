import os
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_file, session
from werkzeug.utils import secure_filename
import threading
import time

from utils.validators import is_valid_url, sanitize_filename
from core.engine import SecurityAssessmentEngine
from core.config import Config
from reporting.json_generator import JSONReportGenerator
from reporting.report_generator import ReportGenerator

app = Flask(__name__)
app.secret_key = os.urandom(24)  # For session management
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Store scan results in memory (in production, use a database)
scan_results = {}
scan_status = {}


@app.route('/')
def index():
    """Home page with URL input form"""
    return render_template('index.html')


@app.route('/api/scan', methods=['POST'])
def start_scan():
    """Start a security scan"""
    data = request.get_json()
    target_url = data.get('url', '').strip()
    
    if not target_url:
        return jsonify({'error': 'URL is required'}), 400
    
    # Validate URL
    if not is_valid_url(target_url):
        return jsonify({'error': 'Invalid URL format'}), 400
    
    # Generate scan ID
    scan_id = f"scan_{int(time.time())}_{target_url.replace('://', '_').replace('/', '_')[:20]}"
    scan_id = sanitize_filename(scan_id)
    
    # Initialize scan status
    scan_status[scan_id] = {
        'status': 'running',
        'progress': 0,
        'message': 'Initializing scan...',
        'target_url': target_url,
        'started_at': datetime.now().isoformat()
    }
    
    # Start scan in background thread
    thread = threading.Thread(target=run_scan, args=(scan_id, target_url))
    thread.daemon = True
    thread.start()
    
    return jsonify({
        'scan_id': scan_id,
        'status': 'started',
        'message': 'Scan started successfully'
    })


def run_scan(scan_id: str, target_url: str):
    """Run security scan in background"""
    try:
        scan_status[scan_id]['message'] = 'Starting security assessment...'
        scan_status[scan_id]['progress'] = 5
        
        # Initialize engine
        engine = SecurityAssessmentEngine(target_url, verbose=False)
        
        # Define callback to update status as each scanner runs
        def update_scanner_status(scanner_name, scanner_index, total_scanners):
            """Callback function to update scan status with current scanner"""
            # Calculate progress: 10% initialization + 70% scanning + 20% reporting
            # Progress during scanning phase: 10% to 80%
            scanning_progress = 10 + int((scanner_index / total_scanners) * 70)
            scan_status[scan_id]['progress'] = scanning_progress
            scan_status[scan_id]['message'] = f'Running {scanner_name} scanner ({scanner_index}/{total_scanners})...'
        
        scan_status[scan_id]['message'] = 'Running vulnerability scanners...'
        scan_status[scan_id]['progress'] = 10
        
        # Run scan with callback
        scan_results_data = engine.scan(scanner_callback=update_scanner_status)
        
        scan_status[scan_id]['message'] = 'Generating reports...'
        scan_status[scan_id]['progress'] = 85
        
        # Generate JSON report
        json_report = JSONReportGenerator.generate(
            target_url=target_url,
            vulnerabilities=scan_results_data['vulnerabilities'],
            overall_rating=scan_results_data['overall_rating'],
            security_scorecard=scan_results_data['security_scorecard'],
            impact_analysis=scan_results_data['impact_analysis'],
            ranked_vulnerabilities=scan_results_data['ranked_vulnerabilities']
        )
        
        # Generate markdown report
        markdown_report = ReportGenerator.generate(
            target_url=target_url,
            json_report=json_report
        )
        
        # Save reports
        output_dir = Config.get_output_dir()
        domain = sanitize_filename(target_url.replace('https://', '').replace('http://', '').split('/')[0])
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        json_filename = f"{output_dir}/security_assessment_{domain}_{timestamp}.json"
        markdown_filename = f"{output_dir}/security_report_{domain}_{timestamp}.md"
        
        JSONReportGenerator.save(json_report, json_filename)
        ReportGenerator.save(markdown_report, markdown_filename)
        
        # Store results
        scan_results[scan_id] = {
            'scan_id': scan_id,
            'target_url': target_url,
            'json_report': json_report,
            'markdown_report': markdown_report,
            'json_file': json_filename,
            'markdown_file': markdown_filename,
            'scan_time': scan_results_data['scan_time'],
            'completed_at': datetime.now().isoformat()
        }
        
        scan_status[scan_id]['status'] = 'completed'
        scan_status[scan_id]['progress'] = 100
        scan_status[scan_id]['message'] = 'Scan completed successfully'
        scan_status[scan_id]['completed_at'] = datetime.now().isoformat()
        
    except Exception as e:
        scan_status[scan_id]['status'] = 'error'
        scan_status[scan_id]['message'] = f'Error: {str(e)}'
        scan_status[scan_id]['progress'] = 0


@app.route('/api/scan/<scan_id>/status')
def get_scan_status(scan_id):
    """Get scan status"""
    if scan_id not in scan_status:
        return jsonify({'error': 'Scan not found'}), 404
    
    return jsonify(scan_status[scan_id])


@app.route('/api/scan/<scan_id>/results')
def get_scan_results(scan_id):
    """Get scan results"""
    if scan_id not in scan_results:
        return jsonify({'error': 'Results not found'}), 404
    
    result = scan_results[scan_id].copy()
    # Remove large report data for summary
    result['summary'] = {
        'overall_rating': result['json_report'].get('overall_security_rating', {}),
        'total_vulnerabilities': len(result['json_report'].get('vulnerabilities', [])),
        'scan_time': result['scan_time']
    }
    
    return jsonify(result)


@app.route('/api/scan/<scan_id>/report/json')
def get_json_report(scan_id):
    """Download JSON report"""
    if scan_id not in scan_results:
        return jsonify({'error': 'Report not found'}), 404
    
    json_file = scan_results[scan_id]['json_file']
    # Convert to absolute path
    json_file = os.path.abspath(json_file)
    
    if os.path.exists(json_file):
        return send_file(
            json_file, 
            as_attachment=True, 
            mimetype='application/json',
            download_name=os.path.basename(json_file)
        )
    return jsonify({'error': 'File not found'}), 404


@app.route('/api/scan/<scan_id>/report/markdown')
def get_markdown_report(scan_id):
    """Download Markdown report"""
    if scan_id not in scan_results:
        return jsonify({'error': 'Report not found'}), 404
    
    markdown_file = scan_results[scan_id]['markdown_file']
    # Convert to absolute path
    markdown_file = os.path.abspath(markdown_file)
    
    if os.path.exists(markdown_file):
        return send_file(
            markdown_file, 
            as_attachment=True, 
            mimetype='text/markdown',
            download_name=os.path.basename(markdown_file)
        )
    return jsonify({'error': 'File not found'}), 404


@app.route('/results/<scan_id>')
def view_results(scan_id):
    """View scan results page"""
    if scan_id not in scan_results:
        return render_template('error.html', message='Scan results not found'), 404
    
    result = scan_results[scan_id]
    return render_template('results.html', 
                         scan_id=scan_id,
                         result=result,
                         json_report=result['json_report'])


if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    
    print("=" * 60)
    print("TRUSTGRID.AI Security Assessment Framework - Web Interface")
    print("=" * 60)
    print("Starting web server on http://localhost:5000")
    print("Open your browser and navigate to http://localhost:5000")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)


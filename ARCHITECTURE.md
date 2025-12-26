# TRUSTGRID.AI Security Assessment Framework - Architecture

## Overview

The TRUSTGRID.AI Security Assessment Framework is a comprehensive Python-based automated cybersecurity testing tool designed to assess web applications for security vulnerabilities across 15+ categories.

## Architecture Design

### Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                     │
│  ┌──────────────┐              ┌──────────────┐             │
│  │   CLI (main)  │              │  Web (Flask) │            │
│  └──────┬────────┘              └──────┬───────┘            │
└─────────┼──────────────────────────────┼──────────────────┘
          │                                │
          └────────────┬───────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Security Assessment Engine                     │
│              (core/engine.py)                               │
│  - Orchestrates scanning process                            │
│  - Manages scanner lifecycle                                │
│  - Aggregates results                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐  ┌───▼────────────┐
│   Scanners   │ │   Ranking   │ │   Reporting    │
│  (16 modules)│ │  (scorer +  │ │  (JSON + MD)   │
│              │ │   ranker)   │ │                │
└───────┬──────┘ └─────────────┘ └────────────────┘
        │
┌───────▼──────────────────────────────────────────┐
│         HTTP Client (core/http_client.py)        │
│  - Rate limiting (2 req/sec)                     │
│  - Request management                            │
│  - Error handling                                │
│  - Ethical controls                              │
└──────────────────────────────────────────────────┘
```

## Core Components

### 1. Security Assessment Engine (`core/engine.py`)

The main orchestration component that:
- Initializes all scanner modules
- Coordinates the scanning process
- Aggregates vulnerability results
- Triggers risk scoring and ranking
- Generates final reports

**Key Methods:**
- `scan()`: Main scanning orchestration
- `get_vulnerabilities()`: Retrieve discovered vulnerabilities

### 2. HTTP Client (`core/http_client.py`)

Responsible for all HTTP communication with safety controls:
- **Rate Limiting**: Enforces ethical boundaries (max 2 req/sec)
- **Error Handling**: Graceful handling of network errors
- **Session Management**: Maintains session state
- **SSL/TLS Support**: Configurable SSL verification

**Safety Features:**
- Built-in rate limiting
- Request timeout controls
- Configurable delays between requests

### 3. Scanner Modules (`scanners/`)

Modular vulnerability detection modules:

#### Base Scanner (`scanners/base.py`)
- Abstract base class for all scanners
- Common vulnerability tracking interface
- Severity scoring utilities

#### Individual Scanners:
1. **InjectionScanner**: SQL, NoSQL, Command, Template injection
2. **XSSScanner**: Reflected, Stored, DOM-based XSS
3. **AuthenticationScanner**: Auth bypass, brute force, IDOR
4. **HeadersScanner**: Security headers analysis
5. **CryptographyScanner**: TLS/SSL configuration and certificates
6. **APIScanner**: API security, authentication, data exposure
7. **ConfigDeploymentScanner**: Debug mode, stack traces, exposed files
8. **CSRFScanner**: CSRF protection, clickjacking
9. **FilePathScanner**: Directory traversal, file access
10. **SessionScanner**: Cookie security, session fixation
11. **SupplyChainScanner**: Third-party script security

### 4. Risk Ranking (`ranking/`)

#### Risk Scorer (`ranking/scorer.py`)
- Calculates vulnerability risk scores (0-10 scale)
- Determines overall security rating
- Generates security scorecard by category

**Scoring Algorithm:**
- Base score from severity (Critical=10, High=7, Medium=5, Low=3, Info=1)
- Confidence adjustment (0.7 + confidence * 0.3)
- Overall score: weighted combination of max and average

#### Vulnerability Ranker (`ranking/ranker.py`)
- Ranks vulnerabilities by risk score
- Generates impact analysis (technical and business)
- Prioritizes remediation efforts

### 5. Reporting Module (`reporting/`)

#### JSON Generator (`reporting/json_generator.py`)
Generates machine-readable JSON output with mandatory sections:
- `metadata`: Target info, scan timestamp
- `overall_security_rating`: Score, level, description
- `ranking`: Top vulnerabilities ranked by risk
- `impact_analysis`: Technical and business impacts
- `vulnerabilities`: Complete vulnerability list
- `security_scorecard`: Category-wise scoring
- `recommendations`: Prioritized fixes

#### Report Generator (`reporting/report_generator.py`)
Generates human-readable Markdown reports with:
- Executive summary
- Risk ranking
- Top vulnerabilities
- Technical impact analysis
- Business impact analysis
- Attack simulation results
- Security scorecard
- Prioritized recommendations
- Detailed vulnerability list

## Data Flow

1. **Input**: Target URL via CLI
2. **Initialization**: Engine creates HTTP client and scanner instances
3. **Scanning**: Each scanner performs tests:
   - HTTP requests with payloads
   - Response analysis
   - Pattern matching
   - Vulnerability identification
4. **Aggregation**: All vulnerabilities collected
5. **Analysis**: Risk scoring and ranking applied
6. **Reporting**: JSON and Markdown reports generated
7. **Output**: Files saved to output directory

## Security & Ethics

### Built-in Safety Controls

1. **Rate Limiting**: Maximum 2 requests per second
2. **No Real Attacks**: All attacks are simulated
3. **No Data Exfiltration**: Framework never attempts to extract sensitive data
4. **No Credential Harvesting**: Never attempts to steal credentials
5. **No Real DDoS**: Traffic simulation only, no actual flooding

### Ethical Guidelines

- Only test authorized targets
- Rate-limited requests
- Simulated attacks only
- Clear authorization warnings
- Legal compliance built-in

## Extensibility

### Adding New Scanners

1. Create new scanner class inheriting from `BaseScanner`
2. Implement `scan()` method
3. Use `add_vulnerability()` to report findings
4. Register in `core/engine.py` scanners list

### Customizing Scoring

Modify `ranking/scorer.py`:
- Adjust `SEVERITY_WEIGHTS` for different severity scores
- Change `CONFIDENCE_WEIGHT` for confidence impact
- Modify overall score calculation algorithm

### Adding Report Formats

Extend `reporting/` module:
- Create new generator class
- Implement format-specific rendering
- Integrate with main reporting flow

## Performance Considerations

- **Concurrent Scanning**: Currently sequential (can be extended with async)
- **Rate Limiting**: Slows down scans but ensures ethical usage
- **Timeout Handling**: Prevents hanging on unresponsive targets
- **Error Recovery**: Continues scanning even if one scanner fails

## Testing Strategy

The framework is designed to:
- Handle network errors gracefully
- Continue scanning if individual tests fail
- Provide clear error messages
- Validate inputs before scanning

## Future Enhancements

Potential improvements:
1. Async/await for parallel scanning
2. Selenium-based dynamic scanning
3. Database storage for scan history
4. Web dashboard for results visualization
5. Integration with CI/CD pipelines
6. Custom payload libraries
7. False positive reduction via ML




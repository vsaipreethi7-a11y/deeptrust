<<<<<<< HEAD
# TRUSTGRID.AI - Secure the Web: Automated Cyber Risk Assessment Framework

## Overview

A comprehensive Python-based automated cybersecurity testing framework that performs multi-category vulnerability testing, risk ranking, and generates detailed security assessment reports.

## Features

- **15 Vulnerability Categories**: Comprehensive security testing across injection, authentication, API, headers, cryptography, and more
- **Risk Scoring**: 0-10 scale with Low/Moderate/High/Critical classifications
- **Automated Reporting**: JSON output and human-readable security reports
- **Prioritized Recommendations**: Immediate, short-term, and long-term fixes
- **Web Interface**: User-friendly web UI for URL input and results visualization
- **CLI Interface**: Command-line tool for automated scanning
- **Ethical & Safe**: Rate-limited, simulated attacks only on authorized targets

## Installation

```bash
# Install dependencies
pip install -r requirements.txt

# For Selenium (optional, for advanced testing)
# Download ChromeDriver or GeckoDriver and add to PATH
```

## Usage

### CLI Usage

```bash
# Basic usage
python main.py --target https://example.com

# With custom output directory
python main.py --target https://example.com --output ./reports

# Verbose mode
python main.py --target https://example.com --verbose

# Help
python main.py --help
```

### Web Interface

```bash
# Start web server
python web_app.py

# Open browser and navigate to http://localhost:5000
# Enter target URL and start scan
# View results in real-time with progress tracking
# Download JSON and Markdown reports
```

## Output

The tool generates two output files:

1. **JSON Report** (`security_assessment.json`): Machine-readable format with all vulnerability data
2. **Security Report** (`security_report.md`): Human-readable markdown report

Both files are saved in the `output/` directory (or specified output path).

## Architecture

```
trustgrid-ai/
├── main.py                 # CLI entry point
├── core/
│   ├── __init__.py
│   ├── engine.py          # Main scanning engine
│   ├── http_client.py     # HTTP client with rate limiting
│   └── config.py          # Configuration management
├── scanners/
│   ├── __init__.py
│   ├── base.py            # Base scanner class
│   ├── injection.py       # SQL/NoSQL/Command injection
│   ├── authentication.py  # Auth & authorization tests
│   ├── xss.py             # Cross-site scripting
│   ├── api.py             # API security
│   ├── headers.py         # Security headers
│   ├── cryptography.py    # TLS/certificate checks
│   └── ...                # Additional scanners
├── ranking/
│   ├── __init__.py
│   ├── scorer.py          # Risk scoring engine
│   └── ranker.py          # Vulnerability ranking
├── reporting/
│   ├── __init__.py
│   ├── json_generator.py  # JSON output
│   └── report_generator.py # Markdown/HTML report
└── utils/
    ├── __init__.py
    └── validators.py      # URL/input validation
```

## Vulnerability Categories

1. Injection Vulnerabilities (SQL, NoSQL, Command, Template)
2. Traffic Manipulation & Availability Attacks (simulated)
3. Spoofing & Impersonation
4. Authentication & Authorization
5. Session & Token Security
6. Cross-Site Attacks (XSS, CSRF, Clickjacking)
7. API & Backend Security
8. File & Path Vulnerabilities
9. Cryptography & Transport
10. Security Headers & Browser Controls
11. Configuration & Deployment Issues
12. Bot, Automation & Abuse Risks
13. Logging & Monitoring Readiness
14. Supply Chain & Third-Party Risks
15. Business Logic Vulnerabilities

## Risk Scoring

- **0-2.9**: Low Risk
- **3-4.9**: Moderate Risk
- **5-6.9**: High Risk
- **7-10**: Critical Risk

## Ethical Guidelines

⚠️ **IMPORTANT**: This tool should ONLY be used on:
- Websites you own
- Explicitly authorized test environments
- Systems with written permission

**NEVER** use this tool on unauthorized systems. All attacks are simulated and rate-limited for safety.

## License

Built for TRUSTGRID.AI Hackathon - HackMind - ARAM ANALYTICS - IG

## Team

TRUSTGRID.AI Security Team


=======
# TG_Aram



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

* [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/tg_intern/TG_Aram.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.com/tg_intern/TG_Aram/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
* [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
>>>>>>> 8d8edbe356ebecd6ba9f00698ab8578230f781d1

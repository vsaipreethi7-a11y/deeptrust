import re
from urllib.parse import urlparse


def is_valid_url(url: str) -> bool:
    """Validate if string is a valid URL"""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except Exception:
        return False


def sanitize_filename(filename: str) -> str:
    """Sanitize filename for filesystem"""
    # Remove invalid characters
    filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
    # Limit length
    if len(filename) > 200:
        filename = filename[:200]
    return filename


def extract_domain(url: str) -> str:
    """Extract domain from URL"""
    try:
        parsed = urlparse(url)
        return parsed.netloc
    except Exception:
        return url




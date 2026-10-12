"""Test-session setup.

Forces offline mode and clears any API key before a single test module
imports `app.config` or `app.main`, so the whole suite runs green with no
internet access and no API key set (AC-135), regardless of what a
developer's own `backend/.env` happens to contain. `conftest.py` is always
collected before sibling test modules in the same directory, which is what
makes "before anything imports settings" true here.
"""

import os

os.environ["OFFLINE_MODE"] = "true"
os.environ.pop("GEMINI_API_KEY", None)
os.environ.pop("GEMINI_OFFLINE_STUB", None)

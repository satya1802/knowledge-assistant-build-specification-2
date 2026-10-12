"""Repository hygiene: `.env` must never be committed, and no file under
`backend/` may contain a Gemini-key-shaped literal (the `AIza...` pattern),
whether in source, fixtures, or docs.
"""

import re
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]

_KEY_PATTERN = re.compile(r"AIza[0-9A-Za-z_\-]{10,}")

_EXCLUDED_DIR_NAMES = {
    ".venv",
    "venv",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    "uploads",
    ".git",
}

_EXCLUDED_SUFFIXES = {".db", ".pyc"}


def _candidate_files() -> list[Path]:
    files = []
    for path in BACKEND_ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in _EXCLUDED_DIR_NAMES for part in path.parts):
            continue
        if path.suffix in _EXCLUDED_SUFFIXES:
            continue
        if path.name == ".env":
            # .env itself is gitignored and may legitimately hold a real key
            # on a developer's machine; it is not a "committed file".
            continue
        files.append(path)
    return files


def test_gitignore_lists_env() -> None:
    gitignore = (BACKEND_ROOT / ".gitignore").read_text(encoding="utf-8")
    entries = {line.strip() for line in gitignore.splitlines()}

    assert ".env" in entries


def test_no_committed_file_contains_a_key_shaped_literal() -> None:
    offenders = []
    for path in _candidate_files():
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        if _KEY_PATTERN.search(text):
            offenders.append(str(path.relative_to(BACKEND_ROOT)))

    assert offenders == [], f"key-shaped literal found in: {offenders}"

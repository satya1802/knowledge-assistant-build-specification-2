"""Redaction of secrets -- the Gemini API key above all -- from anything
logged: log records, request logs, error messages, stack traces.

`redact()` is the unit-testable primitive; `install_redaction_filter()`
wires a `logging.Filter` built on it onto the root logger (and its existing
handlers) once, at app startup (see `app.main`).
"""

from __future__ import annotations

import logging
import traceback

from app.config import get_settings

_PLACEHOLDER = "***REDACTED***"
_MIN_SECRET_LEN = 8


def _configured_secrets() -> list[str]:
    """Every secret currently configured that must never reach a log line."""
    settings = get_settings()
    key = settings.gemini_api_key
    if key is None:
        return []
    raw = key.get_secret_value()
    return [raw] if raw else []


def redact(text: str) -> str:
    """Replace any configured secret in `text` -- whole, or any run of at
    least `_MIN_SECRET_LEN` characters of it -- with a fixed placeholder.

    A pure function of its input and the currently configured secrets, so it
    is safe to call on a message, a formatted log line, or a stack trace.
    """
    if not text:
        return text

    result = text
    for secret in _configured_secrets():
        if not secret:
            continue
        if len(secret) < _MIN_SECRET_LEN:
            result = result.replace(secret, _PLACEHOLDER)
            continue
        # Longest runs first, so a full match is replaced before any of its
        # own substrings would otherwise still be found afterwards.
        for length in range(len(secret), _MIN_SECRET_LEN - 1, -1):
            for start in range(len(secret) - length + 1):
                fragment = secret[start : start + length]
                if fragment and fragment in result:
                    result = result.replace(fragment, _PLACEHOLDER)
    return result


class RedactingFilter(logging.Filter):
    """A `logging.Filter` that redacts a record's message, its `%`-args, and
    any formatted exception/stack trace, in place, before it is emitted."""

    def filter(self, record: logging.LogRecord) -> bool:
        if isinstance(record.msg, str):
            record.msg = redact(record.msg)
        if record.args:
            record.args = tuple(
                redact(arg) if isinstance(arg, str) else arg for arg in record.args
            )
        if record.exc_info:
            formatted = "".join(traceback.format_exception(*record.exc_info))
            record.exc_text = redact(formatted)
            record.exc_info = None
        elif record.exc_text:
            record.exc_text = redact(record.exc_text)
        return True


def install_redaction_filter() -> None:
    """Attach a `RedactingFilter` to the root logger and every handler it
    already has. Idempotent: calling this more than once (app reload, tests
    importing `app.main` repeatedly) does not stack up duplicate filters."""
    root = logging.getLogger()
    if any(isinstance(f, RedactingFilter) for f in root.filters):
        return

    redaction_filter = RedactingFilter()
    root.addFilter(redaction_filter)
    for handler in root.handlers:
        if not any(isinstance(f, RedactingFilter) for f in handler.filters):
            handler.addFilter(redaction_filter)

"""`redact()` and the logging filter it backs (AC-128): the Gemini API key
must never survive, whole or as any 8+ character fragment, into a log
record, request log, error message or stack trace.
"""

import logging

from app.config import Settings
from app.services import redaction as redaction_module
from app.services.redaction import RedactingFilter, install_redaction_filter, redact

_FAKE_KEY = "sk-FAKEKEY1234567890abcdefGHIJKL"


def _use_key(monkeypatch, key: str | None) -> None:
    settings = Settings(_env_file=None, gemini_api_key=key)
    monkeypatch.setattr(redaction_module, "get_settings", lambda: settings)


def test_redact_removes_the_whole_key(monkeypatch) -> None:
    _use_key(monkeypatch, _FAKE_KEY)

    result = redact(f"calling gemini with key {_FAKE_KEY} failed: 403")

    assert _FAKE_KEY not in result
    assert "***REDACTED***" in result


def test_redact_removes_an_8_char_fragment_of_the_key(monkeypatch) -> None:
    _use_key(monkeypatch, _FAKE_KEY)
    fragment = _FAKE_KEY[4:14]  # a >= 8 char run of the key, not the whole thing

    result = redact(f"leaked fragment {fragment} in a traceback")

    assert fragment not in result
    assert "***REDACTED***" in result


def test_redact_leaves_short_unrelated_text_alone(monkeypatch) -> None:
    _use_key(monkeypatch, _FAKE_KEY)

    assert redact("a totally unrelated short string") == "a totally unrelated short string"


def test_redact_is_a_no_op_with_no_key_configured(monkeypatch) -> None:
    _use_key(monkeypatch, None)

    assert redact("nothing secret here") == "nothing secret here"


def test_redact_handles_empty_string(monkeypatch) -> None:
    _use_key(monkeypatch, _FAKE_KEY)

    assert redact("") == ""


def test_filter_redacts_a_log_records_message(monkeypatch) -> None:
    _use_key(monkeypatch, _FAKE_KEY)
    record = logging.LogRecord(
        name="test",
        level=logging.INFO,
        pathname=__file__,
        lineno=1,
        msg=f"using key {_FAKE_KEY}",
        args=(),
        exc_info=None,
    )

    RedactingFilter().filter(record)

    assert _FAKE_KEY not in record.msg
    assert "***REDACTED***" in record.msg


def test_filter_redacts_a_formatted_stack_trace(monkeypatch) -> None:
    _use_key(monkeypatch, _FAKE_KEY)
    try:
        raise ValueError(f"bad request with key {_FAKE_KEY}")
    except ValueError:
        import sys

        record = logging.LogRecord(
            name="test",
            level=logging.ERROR,
            pathname=__file__,
            lineno=1,
            msg="request failed",
            args=(),
            exc_info=sys.exc_info(),
        )

    RedactingFilter().filter(record)

    assert _FAKE_KEY not in (record.exc_text or "")
    assert record.exc_info is None


def test_install_redaction_filter_attaches_to_the_root_logger_once() -> None:
    install_redaction_filter()
    install_redaction_filter()

    root_filters = [f for f in logging.getLogger().filters if isinstance(f, RedactingFilter)]

    assert len(root_filters) == 1

"""The settings module the architecture's `pydantic-settings` dependency
backs (see `app.config`).

A failure here means `backend/.env` cannot be read, or a default silently
drifted from what the architecture actually asked for: a 0.62 similarity
threshold and a session cookie whose `Secure` flag defaults off, for local
http.
"""

from app.config import Settings, get_settings


def test_defaults_match_the_approved_architecture() -> None:
    # `_env_file=None`: ignore any `.env` a developer's machine happens to
    # have so the defaults asserted here are the code's, not the laptop's.
    settings = Settings(_env_file=None)

    assert settings.similarity_threshold == 0.62
    assert settings.session_cookie_secure is False
    assert settings.embedding_dimensions == 768
    assert settings.gemini_api_key is None


def test_get_settings_is_cached() -> None:
    assert get_settings() is get_settings()

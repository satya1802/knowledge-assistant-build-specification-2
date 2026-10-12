"""The settings module the architecture's `pydantic-settings` dependency
backs (see `app.config`).

A failure here means `backend/.env` cannot be read, or a default silently
drifted from what the architecture actually asked for: a 0.62 similarity
threshold and a session cookie whose `Secure` flag defaults off, for local
http -- and the model/embedding defaults, and their env-var overrides,
match what was approved.
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


def test_default_answer_model_is_a_gemini_flash_lite_model() -> None:
    settings = Settings(_env_file=None)

    assert "flash-lite" in settings.answer_model
    assert settings.answer_model.startswith("gemini-")


def test_default_embedding_model_is_the_768_dimension_model() -> None:
    settings = Settings(_env_file=None)

    assert settings.embedding_model == "models/text-embedding-004"
    assert settings.embedding_dimensions == 768


def test_answer_model_changes_when_the_env_var_is_set(monkeypatch) -> None:
    monkeypatch.setenv("ANSWER_MODEL", "gemini-1.5-pro")

    settings = Settings(_env_file=None)

    assert settings.answer_model == "gemini-1.5-pro"


def test_embedding_model_changes_when_the_env_var_is_set(monkeypatch) -> None:
    monkeypatch.setenv("EMBEDDING_MODEL", "models/some-other-embedding-model")

    settings = Settings(_env_file=None)

    assert settings.embedding_model == "models/some-other-embedding-model"

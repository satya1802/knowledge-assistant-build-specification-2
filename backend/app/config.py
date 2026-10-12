"""Runtime configuration loaded from the environment and `backend/.env`.

The architecture asks for exactly these knobs: the Gemini key (never logged
-- it is wrapped in `SecretStr`), whether the session cookie's `Secure` flag
is set (off for local http, on behind TLS), which Gemini models answer and
embed with, the similarity threshold retrieval starts from, and an offline
mode flag so ingestion and chat never need network access to Gemini in
tests. The handful of these that the architecture also makes admin-editable
at runtime (signup_enabled, fallback_enabled, answer_model, embedding_model,
similarity_threshold) live here only as the default a freshly created
database starts with; `GET/PUT /api/admin/settings` reads and writes the
`settings` table from then on, not this module.
"""

from functools import lru_cache

from pydantic import AliasChoices, Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str = "sqlite:///./app.db"

    # Gemini.
    gemini_api_key: SecretStr | None = None
    # `OFFLINE_MODE` is the one env var that switches `get_provider()`
    # between the deterministic local stub and the real Gemini API;
    # `GEMINI_OFFLINE_STUB` is accepted too, for anyone's existing `.env`.
    offline_mode: bool = Field(
        default=False,
        validation_alias=AliasChoices("OFFLINE_MODE", "GEMINI_OFFLINE_STUB"),
    )
    answer_model: str = "gemini-flash-lite-latest"
    embedding_model: str = "models/text-embedding-004"
    embedding_dimensions: int = 768
    similarity_threshold: float = 0.62

    # Auth / sessions.
    session_cookie_name: str = "ka_session"
    session_cookie_secure: bool = False
    session_ttl_hours: int = 24 * 7
    signup_enabled: bool = True
    failed_login_limit: int = 5
    failed_login_window_minutes: int = 15
    lockout_minutes: int = 15

    # Chat.
    fallback_enabled: bool = True

    # File store: the server's own disk (an attached EBS volume in
    # production; a local folder in development).
    file_store_dir: str = "./uploads"
    max_upload_bytes: int = 25 * 1024 * 1024

    # CORS; also read directly by `app.main` via `ALLOWED_ORIGINS` for the
    # middleware registered before startup.
    allowed_origins: str = ""


@lru_cache
def get_settings() -> Settings:
    """Settings are read once per process; `.env` does not change at runtime."""
    return Settings()

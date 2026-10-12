"""Request-scoped auth dependencies: the signed-in user, and the admin-only
guard built on top of it.

The session id is read from the configured cookie by name (never a
hardcoded one, so `SESSION_COOKIE_SECURE`'s sibling setting,
`session_cookie_name`, stays authoritative) and converted to a `UUID`
before it ever reaches the database -- a malformed cookie value fails that
conversion and yields 401 rather than raising a type error out of the ORM
layer (AC-004).
"""

from datetime import datetime, timezone
from uuid import UUID

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session as DBSession

from app.config import Settings, get_settings
from app.database import get_db
from app.models import Session as UserSession
from app.models import User

_UNAUTHENTICATED = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated."
)


def _as_utc(value: datetime) -> datetime:
    """SQLite returns naive datetimes even for `DateTime(timezone=True)`
    columns; treat a naive value as UTC rather than let the comparison
    below raise."""
    return value if value.tzinfo is not None else value.replace(tzinfo=timezone.utc)


def get_current_user(
    request: Request,
    db: DBSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> User:
    """The user the session cookie identifies, or a 401.

    Covers every way that can fail: no cookie, a cookie that is not a valid
    UUID, a UUID with no matching session row, an expired session, or a
    session whose user has since been disabled.
    """
    raw_session_id = request.cookies.get(settings.session_cookie_name)
    if not raw_session_id:
        raise _UNAUTHENTICATED

    try:
        session_id = UUID(raw_session_id)
    except (ValueError, AttributeError, TypeError) as exc:
        raise _UNAUTHENTICATED from exc

    session = db.get(UserSession, session_id)
    if session is None:
        raise _UNAUTHENTICATED

    if _as_utc(session.expires_at) < datetime.now(timezone.utc):
        db.delete(session)
        db.commit()
        raise _UNAUTHENTICATED

    user = db.get(User, session.user_id)
    if user is None or not user.is_enabled:
        raise _UNAUTHENTICATED

    return user


def get_current_admin_user(user: User = Depends(get_current_user)) -> User:
    """Same as `get_current_user`, plus a 403 for a non-admin -- never a 404,
    so an unauthorised caller cannot distinguish "forbidden" from "missing"."""
    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required."
        )
    return user

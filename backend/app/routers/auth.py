"""Auth endpoints: `POST /api/auth/login|logout|signup`.

Login and signup both set the same server-side session cookie on success;
logout destroys the session row and clears the cookie. Every failure path on
login -- unknown email, wrong password, disabled account -- raises the same
401 with byte-identical text (AC-006/007/008), and the password check always
runs, against a dummy hash when the email does not exist, so the timing
does not leak which emails have accounts.
"""

import uuid
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy import func
from sqlalchemy.orm import Session as DBSession

from app.config import Settings, get_settings
from app.database import get_db
from app.models import Session as UserSession
from app.models import User
from app.schemas import LoginRequest, SignupRequest, UserOut
from app.security import hash_password, verify_password

router = APIRouter(tags=["auth"])

_GENERIC_ERROR_DETAIL = "Incorrect email or password."


def _generic_auth_error() -> HTTPException:
    return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=_GENERIC_ERROR_DETAIL)


def _issue_session_cookie(
    response: Response, db: DBSession, user: User, settings: Settings
) -> None:
    session = UserSession(
        user_id=user.id,
        expires_at=datetime.now(timezone.utc) + timedelta(hours=settings.session_ttl_hours),
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    # No `domain` (host-only cookie); `secure` follows the admin-configured
    # setting rather than being hardcoded, so it is absent over local http
    # and present once the deployment moves behind TLS (AC-002/AC-003).
    response.set_cookie(
        key=settings.session_cookie_name,
        value=str(session.id),
        httponly=True,
        secure=settings.session_cookie_secure,
        samesite="lax",
        path="/",
    )


@router.post("/api/auth/login", response_model=UserOut)
async def login(
    payload: LoginRequest,
    response: Response,
    db: DBSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> UserOut:
    email = payload.email.strip().lower()
    user = db.query(User).filter(func.lower(User.email) == email).first()

    password_ok = verify_password(payload.password, user.password_hash if user else None)
    if user is None or not password_ok or not user.is_enabled:
        raise _generic_auth_error()

    _issue_session_cookie(response, db, user, settings)
    return UserOut.model_validate(user)


@router.post("/api/auth/signup", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def signup(
    payload: SignupRequest,
    response: Response,
    db: DBSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> UserOut:
    email = payload.email.strip().lower()
    existing = db.query(User).filter(func.lower(User.email) == email).first()
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with that email already exists.",
        )

    # The first account ever created is the admin (AC-013); every one after
    # it is an ordinary user unless an admin later grants the role (AC-014).
    is_first_account = db.query(User).count() == 0

    user = User(
        email=email,
        password_hash=hash_password(payload.password),
        is_admin=is_first_account,
        is_enabled=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    _issue_session_cookie(response, db, user, settings)
    return UserOut.model_validate(user)


@router.post("/api/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(
    request: Request,
    response: Response,
    db: DBSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> Response:
    raw_session_id = request.cookies.get(settings.session_cookie_name)
    if raw_session_id:
        try:
            session_id = uuid.UUID(raw_session_id)
        except (ValueError, AttributeError, TypeError):
            session_id = None
        if session_id is not None:
            session = db.get(UserSession, session_id)
            if session is not None:
                db.delete(session)
                db.commit()

    response.delete_cookie(key=settings.session_cookie_name, path="/")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

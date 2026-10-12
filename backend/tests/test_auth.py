"""Tests for US-001-1: email/password auth, sessions, cookies, signup.

Each test gets its own in-memory SQLite database via `get_db` override, so
tests about "the first account is admin" can rely on the user table really
being empty, independent of whatever `backend/app.db` holds.
"""

import uuid

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.config import Settings, get_settings
from app.database import Base, get_db
from app.deps import get_current_admin_user
from app.main import app
from app.models import User
from app.security import hash_password

DEFAULT_SETTINGS = get_settings()


@pytest.fixture()
def db_factory():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        session = TestingSessionLocal()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestingSessionLocal
    app.dependency_overrides.pop(get_db, None)
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client(db_factory):
    return TestClient(app)


def _create_user(db_factory, email: str, password: str, *, is_admin=False, is_enabled=True):
    session = db_factory()
    user = User(
        email=email,
        password_hash=hash_password(password),
        is_admin=is_admin,
        is_enabled=is_enabled,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    session.close()
    return user


# --- AC-001: login success, session row, cookie -----------------------------


def test_login_success_returns_user_and_sets_session_cookie(client, db_factory):
    _create_user(db_factory, "alice@example.com", "correct horse battery staple")

    response = client.post(
        "/api/auth/login",
        json={"email": "alice@example.com", "password": "correct horse battery staple"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == "alice@example.com"
    assert body["is_admin"] is False
    assert body["is_enabled"] is True

    cookie_name = DEFAULT_SETTINGS.session_cookie_name
    assert cookie_name in response.cookies
    session = db_factory()
    assert session.query(User).count() == 1
    session.close()


# --- AC-002 / AC-003: cookie flags driven by settings -----------------------


def test_cookie_has_no_secure_attribute_lax_samesite_no_domain_when_secure_off(
    client, db_factory
):
    _create_user(db_factory, "bob@example.com", "a-decent-password-1")
    app.dependency_overrides[get_settings] = lambda: Settings(session_cookie_secure=False)
    try:
        response = client.post(
            "/api/auth/login",
            json={"email": "bob@example.com", "password": "a-decent-password-1"},
        )
    finally:
        app.dependency_overrides.pop(get_settings, None)

    set_cookie = response.headers.get("set-cookie", "")
    assert "secure" not in set_cookie.lower()
    assert "samesite=lax" in set_cookie.lower()
    assert "domain=" not in set_cookie.lower()
    assert "httponly" in set_cookie.lower()


def test_cookie_carries_secure_and_httponly_when_secure_on(client, db_factory):
    _create_user(db_factory, "carol@example.com", "a-decent-password-2")
    app.dependency_overrides[get_settings] = lambda: Settings(session_cookie_secure=True)
    try:
        response = client.post(
            "/api/auth/login",
            json={"email": "carol@example.com", "password": "a-decent-password-2"},
        )
    finally:
        app.dependency_overrides.pop(get_settings, None)

    set_cookie = response.headers.get("set-cookie", "")
    assert "secure" in set_cookie.lower()
    assert "httponly" in set_cookie.lower()


# --- AC-004: malformed / well-formed-but-unknown session cookie -------------


def test_malformed_session_cookie_yields_401_not_a_type_error(client, db_factory):
    cookie_name = DEFAULT_SETTINGS.session_cookie_name
    response = client.get("/api/me", cookies={cookie_name: "not-a-uuid"})

    assert response.status_code == 401
    assert "detail" in response.json()


def test_well_formed_but_unknown_session_cookie_yields_401(client, db_factory):
    cookie_name = DEFAULT_SETTINGS.session_cookie_name
    response = client.get("/api/me", cookies={cookie_name: str(uuid.uuid4())})

    assert response.status_code == 401


def test_no_cookie_yields_401(client, db_factory):
    response = client.get("/api/me")

    assert response.status_code == 401


# --- AC-005: logout destroys session and clears cookie ----------------------


def test_logout_destroys_session_and_subsequent_request_is_401(client, db_factory):
    _create_user(db_factory, "dana@example.com", "a-decent-password-3")
    login_response = client.post(
        "/api/auth/login",
        json={"email": "dana@example.com", "password": "a-decent-password-3"},
    )
    assert login_response.status_code == 200

    me_response = client.get("/api/me")
    assert me_response.status_code == 200

    logout_response = client.post("/api/auth/logout")
    assert logout_response.status_code == 204

    me_after_logout = client.get("/api/me")
    assert me_after_logout.status_code == 401
    assert "detail" in me_after_logout.json()


# --- AC-006/007/008: uniform generic failure --------------------------------


def test_disabled_account_with_correct_password_gets_generic_error_and_no_session(
    client, db_factory
):
    _create_user(
        db_factory, "evan@example.com", "a-decent-password-4", is_enabled=False
    )

    response = client.post(
        "/api/auth/login",
        json={"email": "evan@example.com", "password": "a-decent-password-4"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect email or password."

    session = db_factory()
    from app.models import Session as UserSession

    assert session.query(UserSession).count() == 0
    session.close()


def test_unknown_email_and_wrong_password_return_byte_identical_errors(client, db_factory):
    _create_user(db_factory, "frank@example.com", "the-real-password-5")

    unknown_response = client.post(
        "/api/auth/login",
        json={"email": "nobody@example.com", "password": "whatever-it-is"},
    )
    wrong_password_response = client.post(
        "/api/auth/login",
        json={"email": "frank@example.com", "password": "not-the-real-password"},
    )

    assert unknown_response.status_code == 401
    assert wrong_password_response.status_code == 401
    assert unknown_response.status_code == wrong_password_response.status_code
    assert unknown_response.json() == wrong_password_response.json()
    assert unknown_response.json()["detail"] == "Incorrect email or password."


# --- AC-013/AC-014: first account is admin, later ones are not -------------


def test_first_signup_is_admin_and_passes_admin_dependency(client, db_factory):
    response = client.post(
        "/api/auth/signup",
        json={"email": "first@example.com", "password": "a-decent-password-6"},
    )

    assert response.status_code == 201
    body = response.json()
    assert body["is_admin"] is True

    session = db_factory()
    user = session.query(User).filter(User.email == "first@example.com").one()
    session.close()
    assert get_current_admin_user(user=user) is user


def test_second_signup_is_an_ordinary_user(client, db_factory):
    client.post(
        "/api/auth/signup",
        json={"email": "first2@example.com", "password": "a-decent-password-7"},
    )
    response = client.post(
        "/api/auth/signup",
        json={"email": "second@example.com", "password": "a-decent-password-8"},
    )

    assert response.status_code == 201
    body = response.json()
    assert body["is_admin"] is False

    session = db_factory()
    user = session.query(User).filter(User.email == "second@example.com").one()
    session.close()
    with pytest.raises(HTTPException) as exc_info:
        get_current_admin_user(user=user)
    assert exc_info.value.status_code == 403


# --- GET /api/me -------------------------------------------------------------


def test_get_me_returns_user_for_valid_session(client, db_factory):
    _create_user(db_factory, "gail@example.com", "a-decent-password-9", is_admin=True)
    client.post(
        "/api/auth/login",
        json={"email": "gail@example.com", "password": "a-decent-password-9"},
    )

    response = client.get("/api/me")

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == "gail@example.com"
    assert body["is_admin"] is True
    assert body["is_enabled"] is True


def test_get_me_requires_a_valid_session(client, db_factory):
    response = client.get("/api/me")

    assert response.status_code == 401

"""Every endpoint the approved API spec names must exist and contribute to
the OpenAPI document, even before a ticket gives it behaviour -- otherwise
the frontend, and the generated API-reference page, are built against paths
that are not actually there.
"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

SPEC_PATHS = [
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/signup",
    "/api/me",
    "/api/me/password",
    "/api/me/theme",
    "/api/admin/users",
    "/api/admin/users/{user_id}",
    "/api/admin/users/{user_id}/reset-password",
    "/api/admin/settings",
    "/api/documents",
    "/api/documents/stats",
    "/api/documents/{document_id}/download",
    "/api/documents/{document_id}",
    "/api/chat/stream",
    "/api/chat/stop",
    "/api/conversations",
    "/api/conversations/{conversation_id}",
]


def test_every_spec_endpoint_is_registered() -> None:
    schema_paths = client.get("/openapi.json").json()["paths"]
    for path in SPEC_PATHS:
        assert path in schema_paths, f"{path} is missing from the OpenAPI schema"


def test_a_stub_route_responds_with_the_placeholder_shape() -> None:
    response = client.post(
        "/api/auth/login", json={"email": "a@example.com", "password": "x"}
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "not_implemented"
    assert body["endpoint"] == "POST /api/auth/login"

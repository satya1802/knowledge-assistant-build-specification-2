"""Admin-only endpoints: user management and runtime settings.

Stubs only -- see `app.routers.auth` for why. Admin authorisation itself
(the `auth` dependency that will guard every route below) is part of the
auth_service ticket, not this scaffold.
"""

import uuid

from fastapi import APIRouter

from app.schemas import (
    AdminCreateUserRequest,
    AdminResetPasswordRequest,
    AdminUpdateUserRequest,
    SettingsUpdateRequest,
    StubResponse,
)

router = APIRouter(tags=["admin"])


@router.get("/api/admin/users", response_model=StubResponse)
async def list_users() -> StubResponse:
    return StubResponse(endpoint="GET /api/admin/users")


@router.post("/api/admin/users", response_model=StubResponse)
async def create_user(payload: AdminCreateUserRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/admin/users")


@router.patch("/api/admin/users/{user_id}", response_model=StubResponse)
async def update_user(user_id: uuid.UUID, payload: AdminUpdateUserRequest) -> StubResponse:
    return StubResponse(endpoint="PATCH /api/admin/users/{id}")


@router.post("/api/admin/users/{user_id}/reset-password", response_model=StubResponse)
async def reset_password(user_id: uuid.UUID, payload: AdminResetPasswordRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/admin/users/{id}/reset-password")


@router.get("/api/admin/settings", response_model=StubResponse)
async def get_settings_route() -> StubResponse:
    return StubResponse(endpoint="GET /api/admin/settings")


@router.put("/api/admin/settings", response_model=StubResponse)
async def update_settings_route(payload: SettingsUpdateRequest) -> StubResponse:
    return StubResponse(endpoint="PUT /api/admin/settings")

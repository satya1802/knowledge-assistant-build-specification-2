"""The signed-in user's own profile: `GET /api/me`, password and theme.

Stubs only -- see `app.routers.auth` for why.
"""

from fastapi import APIRouter

from app.schemas import ChangePasswordRequest, StubResponse, ThemeRequest

router = APIRouter(tags=["me"])


@router.get("/api/me", response_model=StubResponse)
async def get_me() -> StubResponse:
    return StubResponse(endpoint="GET /api/me")


@router.post("/api/me/password", response_model=StubResponse)
async def change_password(payload: ChangePasswordRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/me/password")


@router.get("/api/me/theme", response_model=StubResponse)
async def get_theme() -> StubResponse:
    return StubResponse(endpoint="GET /api/me/theme")


@router.put("/api/me/theme", response_model=StubResponse)
async def set_theme(payload: ThemeRequest) -> StubResponse:
    return StubResponse(endpoint="PUT /api/me/theme")

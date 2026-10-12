"""The signed-in user's own profile: `GET /api/me`, password and theme.

`GET /api/me` is implemented behind the session dependency; password change
and theme are stubs -- see `app.routers.auth` for why.
"""

from fastapi import APIRouter, Depends

from app.deps import get_current_user
from app.models import User
from app.schemas import ChangePasswordRequest, StubResponse, ThemeRequest, UserOut

router = APIRouter(tags=["me"])


@router.get("/api/me", response_model=UserOut)
async def get_me(user: User = Depends(get_current_user)) -> UserOut:
    return UserOut.model_validate(user)


@router.post("/api/me/password", response_model=StubResponse)
async def change_password(payload: ChangePasswordRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/me/password")


@router.get("/api/me/theme", response_model=StubResponse)
async def get_theme() -> StubResponse:
    return StubResponse(endpoint="GET /api/me/theme")


@router.put("/api/me/theme", response_model=StubResponse)
async def set_theme(payload: ThemeRequest) -> StubResponse:
    return StubResponse(endpoint="PUT /api/me/theme")

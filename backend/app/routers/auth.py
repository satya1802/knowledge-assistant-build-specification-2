"""Auth endpoints: `POST /api/auth/login|logout|signup`.

Stubs only. The auth_service component -- password verify/hash, session
creation, the 5-in-15-minute lockout, the generic failed-login error, cookie
issuance -- is a later ticket's work. These exist so the route shapes the
frontend and the OpenAPI document were approved against are present, and so
the OpenAPI document the API-reference page reads from is complete, from day
one.
"""

from fastapi import APIRouter

from app.schemas import LoginRequest, SignupRequest, StubResponse

router = APIRouter(tags=["auth"])


@router.post("/api/auth/login", response_model=StubResponse)
async def login(payload: LoginRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/auth/login")


@router.post("/api/auth/logout", response_model=StubResponse)
async def logout() -> StubResponse:
    return StubResponse(endpoint="POST /api/auth/logout")


@router.post("/api/auth/signup", response_model=StubResponse)
async def signup(payload: SignupRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/auth/signup")

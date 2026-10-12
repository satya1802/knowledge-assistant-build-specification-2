"""Generated routers: one per architecture component that owns endpoints.

Every route registered here is a stub -- see `app.schemas.StubResponse` --
so the service starts, the OpenAPI document the API-reference page reads is
complete, and each endpoint the approved API spec names exists at its exact
path and method before any ticket gives it behaviour.
"""

from app.routers.admin import router as admin_router
from app.routers.auth import router as auth_router
from app.routers.chat import router as chat_router
from app.routers.conversations import router as conversations_router
from app.routers.documents import router as documents_router
from app.routers.me import router as me_router

all_routers = [
    auth_router,
    me_router,
    admin_router,
    documents_router,
    chat_router,
    conversations_router,
]

__all__ = ["all_routers"]

"""Private chat history endpoints: list, read, delete.

Stubs only -- see `app.routers.auth` for why. Ownership enforcement (a
conversation belongs to exactly the user who holds the session) is part of
the chat_service ticket, not this scaffold.
"""

import uuid

from fastapi import APIRouter, Query

from app.schemas import StubResponse

router = APIRouter(tags=["conversations"])


@router.get("/api/conversations", response_model=StubResponse)
async def list_conversations(search: str | None = Query(default=None)) -> StubResponse:
    return StubResponse(endpoint="GET /api/conversations")


@router.get("/api/conversations/{conversation_id}", response_model=StubResponse)
async def get_conversation(conversation_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="GET /api/conversations/{id}")


@router.delete("/api/conversations/{conversation_id}", response_model=StubResponse)
async def delete_conversation(conversation_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="DELETE /api/conversations/{id}")

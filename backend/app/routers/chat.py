"""Chat endpoints: streamed answers and stop.

Stubs only -- see `app.routers.auth` for why. `POST /api/chat/stream` is
approved to respond `text/event-stream`; the real handler (retrieval_service
+ chat_service) will set that up when it replaces this placeholder.
"""

from fastapi import APIRouter

from app.schemas import ChatRequest, ChatStopRequest, StubResponse

router = APIRouter(tags=["chat"])


@router.post("/api/chat/stream", response_model=StubResponse)
async def stream_chat(payload: ChatRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/chat/stream")


@router.post("/api/chat/stop", response_model=StubResponse)
async def stop_chat(payload: ChatStopRequest) -> StubResponse:
    return StubResponse(endpoint="POST /api/chat/stop")

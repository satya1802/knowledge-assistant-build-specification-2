"""Knowledge-base endpoints: upload, list, stats, download, delete.

Stubs only -- see `app.routers.auth` for why. Background ingestion
(ingestion_worker) and disk storage (file_store) are later tickets' work;
this only reserves the routes and their request/response shapes.
"""

import uuid

from fastapi import APIRouter, File, Query, UploadFile

from app.schemas import StubResponse

router = APIRouter(tags=["documents"])


@router.post("/api/documents", response_model=StubResponse)
async def upload_documents(files: list[UploadFile] = File(...)) -> StubResponse:
    return StubResponse(endpoint="POST /api/documents")


@router.get("/api/documents", response_model=StubResponse)
async def list_documents(
    search: str | None = Query(default=None),
    status: str | None = Query(default=None),
    type: str | None = Query(default=None),
) -> StubResponse:
    return StubResponse(endpoint="GET /api/documents")


@router.get("/api/documents/stats", response_model=StubResponse)
async def document_stats() -> StubResponse:
    return StubResponse(endpoint="GET /api/documents/stats")


@router.get("/api/documents/{document_id}/download", response_model=StubResponse)
async def download_document(document_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="GET /api/documents/{id}/download")


@router.delete("/api/documents/{document_id}", response_model=StubResponse)
async def delete_document(document_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="DELETE /api/documents/{id}")

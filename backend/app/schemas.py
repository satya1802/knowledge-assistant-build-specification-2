"""Pydantic request and response models.

One pair per entity in the approved data model (an `*Out` read shape, and a
request body where the API spec names one), plus `StubResponse`, the
placeholder every generated route returns until it has been implemented.
Field types only -- no password-strength or business-rule validation here;
that belongs to the handler that actually enforces it.
"""

import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


# --- users / auth / account -------------------------------------------------


class UserOut(BaseModel):
    id: uuid.UUID
    email: str
    is_admin: bool
    is_enabled: bool

    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    email: str
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


Theme = Literal["light", "dark", "system"]


class ThemeOut(BaseModel):
    theme: Theme


class ThemeRequest(BaseModel):
    theme: Theme


class AdminCreateUserRequest(BaseModel):
    email: str
    password: str


class AdminUpdateUserRequest(BaseModel):
    is_enabled: bool | None = None
    is_admin: bool | None = None


class AdminResetPasswordRequest(BaseModel):
    new_password: str


class AdminResetPasswordOut(BaseModel):
    new_password: str


# --- settings ----------------------------------------------------------------


class SettingsOut(BaseModel):
    signup_enabled: bool
    fallback_enabled: bool
    answer_model: str
    embedding_model: str
    similarity_threshold: float
    gemini_key_configured: bool


class SettingsUpdateRequest(BaseModel):
    signup_enabled: bool | None = None
    fallback_enabled: bool | None = None
    answer_model: str | None = None
    embedding_model: str | None = None
    similarity_threshold: float | None = Field(default=None, ge=0, le=1)


# --- documents ----------------------------------------------------------------


DocumentStatus = Literal["processing", "ready", "failed"]


class DocumentOut(BaseModel):
    id: uuid.UUID
    filename: str
    file_type: str
    size_bytes: int
    uploader_email: str
    status: DocumentStatus
    status_reason: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DocumentUploadResultOut(BaseModel):
    id: uuid.UUID
    filename: str
    status: Literal["processing"] = "processing"


class DocumentStatsOut(BaseModel):
    total: int
    ready: int
    processing: int
    failed: int
    passages: int


class ChunkOut(BaseModel):
    id: uuid.UUID
    document_id: uuid.UUID
    ordinal: int
    page_number: int | None = None
    text: str

    model_config = ConfigDict(from_attributes=True)


# --- chat / conversations -----------------------------------------------------


class ChatRequest(BaseModel):
    conversation_id: uuid.UUID | None = None
    question: str


class ChatStopRequest(BaseModel):
    conversation_id: uuid.UUID
    message_id: uuid.UUID


class MessageSourceOut(BaseModel):
    chip_number: int
    document_id: uuid.UUID
    page_number: int | None = None
    passage_text: str

    model_config = ConfigDict(from_attributes=True)


class MessageOut(BaseModel):
    id: uuid.UUID
    role: Literal["user", "assistant"]
    content: str
    from_documents: bool
    stopped: bool
    created_at: datetime
    sources: list[MessageSourceOut] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)


class ConversationSummaryOut(BaseModel):
    id: uuid.UUID
    title: str
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ConversationOut(BaseModel):
    id: uuid.UUID
    messages: list[MessageOut] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)

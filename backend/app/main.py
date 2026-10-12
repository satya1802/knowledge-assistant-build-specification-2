"""Application entrypoint.

Generated from the approved architecture: one router per component that owns
endpoints, one route per endpoint the API spec declares. Every generated
route is a stub that returns a typed placeholder, so the service starts,
serves its OpenAPI document and passes its tests before a single handler is
implemented.
"""

import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.config import get_settings
from app.database import Base, engine, ensure_pgvector_extension
from app.routers import all_routers
from app.services.redaction import install_redaction_filter

app = FastAPI(
    title="Knowledge Assistant · Build specification (2)",
    description="Knowledge Assistant · Build specification Page 1 Knowledge Assistant Build \"Knowledge Assistant\": an enterprise RAG chatbot that answers employees' questions from a shared company knowledge base, citing its sources. Stack FastAPI (Python 3.12) + SQLAlchemy, SQLite locally / Postgres + pgvector in production; React + TypeScript + Vite + Tailwind; Google Gemini; Tesseract OCR. One command starts everything locally. Features  Sign-in: – Email + password; create account (admins can turn this off); change password. – Passwords hashed with bcrypt; HTTP-only session cookie. Make its Secure flag a setting, off for local http. – 5 failed sign-ins in 15 minutes locks that email for 15 minutes; one generic error for wrong email or password. – The first account is the admin. Admins manage users: add, disable, make/remove admin, reset password.  Knowledge base: – Upload PDF, DOCX, TXT, MD (up to 25 MB), shared with everyone, processed in the background. – Status: processing / ready / failed with a readable reason; the page updates live. – Stat tiles, an upload dropzone, and a document table with search, filters, download and delete.  Reading files: – PDF text with pypdf; DOCX paragraphs AND tables. – A PDF page with almost no text is treated as a scan and read with local Tesseract OCR. The app still works if Tesseract isn't installed.  Chunking: about 1,000 characters with 150 overlap, breaking only in the second half of each window, so chunk counts stay sensible.  Chat: – Search the documents first (Gemini embeddings, 768 dimensions; cosine similarity threshold 0.62). – Stream the answer live, with numbered source chips that open a side panel. – If nothing matches, answer from general knowledge with a \"not from your documents\" badge. – Copy, read aloud, regenerate and stop. – Private chat history grouped by date, with search and delete.  Gemini: – Key in a gitignored backend/.env, never logged; models configurable (Flash-Lite for answers). – First words in about 2",  # noqa: E501
    version="0.1.0",
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The scaffold ships no migrations, so the tables are created from the models on
# startup. Replace this with Alembic before anything holds data worth keeping.
ensure_pgvector_extension()
Base.metadata.create_all(bind=engine)

for _router in all_routers:
    app.include_router(_router)

# The file_store component keeps every uploaded original on the server's own
# disk (an attached EBS volume in production); make sure the directory it
# writes into actually exists before anything tries to use it.
os.makedirs(get_settings().file_store_dir, exist_ok=True)


@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe, and the only route defined directly here -- every
    other route lives in `app.routers` and is a stub until a ticket
    implements it."""
    return {"status": "ok"}


# Logging init: a `RedactingFilter` on the root logger so the Gemini API key
# -- whole or any 8+ character run of it -- can never reach a log record, a
# request log, an error message or a stack trace (AC-128). Appended here
# rather than threaded through every module's own `getLogger()` call.
logging.basicConfig(level=logging.INFO)
install_redaction_filter()

"""Engine, session factory and the request-scoped session dependency.

SQLite by default so a fresh clone runs with nothing but `pip install -r
requirements.txt` -- the approved architecture names Postgres + pgvector for
production, but naming one is not the same as having one, and a scaffold
that cannot start without a database server is a scaffold nobody runs. Point
`DATABASE_URL` at the real thing when it exists; nothing else has to change.
"""

import os
from collections.abc import Iterator

from sqlalchemy import create_engine, text
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

# SQLite rejects a connection made on one thread and used on another, which is
# exactly what happens when FastAPI runs a sync dependency in its threadpool.
_connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=_connect_args, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    """Declarative base that every generated model inherits."""


def get_db() -> Iterator[Session]:
    """One session per request, closed even when the handler raises."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def ensure_pgvector_extension() -> None:
    """Create the `vector` extension pgvector's `VECTOR(768)` column needs.

    `app.models.Chunk.embedding` is declared with pgvector's SQLAlchemy type
    regardless of which database is configured; Postgres refuses that column
    type until the extension exists once per database. A no-op on SQLite,
    where the same column is just a permissively-typed text column and local
    development needs nothing extra installed.
    """
    if not engine.dialect.name.startswith("postgres"):
        return
    with engine.begin() as connection:
        connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))

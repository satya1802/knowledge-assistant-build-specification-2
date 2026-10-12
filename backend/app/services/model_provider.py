"""ModelProvider abstraction: a deterministic offline stub, or Gemini.

Every call site -- retrieval, citation, streaming, the "not from your
documents" badge, chat controls -- calls `embed()`/`stream_answer()` through
this interface and never branches on `settings.offline_mode` itself;
`get_provider()` is the only place that decides which implementation runs,
so call sites exercise exactly the same code paths against the stub that
they will against Gemini.
"""

from __future__ import annotations

import hashlib
import math
from abc import ABC, abstractmethod
from collections.abc import AsyncIterator

from app.config import Settings, get_settings


class ModelProvider(ABC):
    """embed() and stream_answer() -- the only two operations a call site
    needs, whether it is talking to the stub or to Gemini."""

    @abstractmethod
    def embed(self, texts: list[str]) -> list[list[float]]:
        """Return one 768-dimension embedding per input text."""

    @abstractmethod
    def stream_answer(self, prompt: str, context: str) -> AsyncIterator[str]:
        """Yield the answer, piece by piece, as an async generator so the
        future SSE route needs no change to stream it on."""


class StubModelProvider(ModelProvider):
    """Deterministic, fully offline: no outbound HTTP call to Gemini ever.

    Both `embed` and `stream_answer` are pure functions of their input --
    the same text always gets the same 768-dimension vector, and the same
    prompt/context always gets the same stub answer -- so the whole test
    suite is reproducible with no internet access and no API key set
    (AC-135).
    """

    dimensions = 768

    def embed(self, texts: list[str]) -> list[list[float]]:
        return [self._embed_one(text) for text in texts]

    def _embed_one(self, text: str) -> list[float]:
        seed = text.encode("utf-8")
        vector: list[float] = []
        for i in range(self.dimensions):
            digest = hashlib.sha256(seed + i.to_bytes(4, "big")).digest()
            value = int.from_bytes(digest[:8], "big") / 2**64
            vector.append(value * 2 - 1)
        norm = math.sqrt(sum(v * v for v in vector)) or 1.0
        return [v / norm for v in vector]

    async def stream_answer(self, prompt: str, context: str) -> AsyncIterator[str]:
        for word in self._stub_answer(prompt, context).split(" "):
            yield word + " "

    def _stub_answer(self, prompt: str, context: str) -> str:
        digest = hashlib.sha256((prompt + "\x00" + context).encode("utf-8")).hexdigest()[:8]
        if context.strip():
            return (
                f"[offline-stub {digest}] Based on the provided documents, here is a "
                f"deterministic stand-in answer to: {prompt.strip()}"
            )
        return (
            f"[offline-stub {digest}] No matching passages were found; this deterministic "
            f"stand-in answer is from general knowledge, not from your documents, "
            f"for: {prompt.strip()}"
        )


class GeminiModelProvider(ModelProvider):
    """Talks to the real Gemini API. Constructed only when
    `settings.offline_mode` is false; the test suite never instantiates it
    with a real key, so it makes no outbound call in CI."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def embed(self, texts: list[str]) -> list[list[float]]:
        import google.generativeai as genai

        key = self._settings.gemini_api_key
        genai.configure(api_key=key.get_secret_value() if key else None)
        return [
            genai.embed_content(model=self._settings.embedding_model, content=text)["embedding"]
            for text in texts
        ]

    async def stream_answer(self, prompt: str, context: str) -> AsyncIterator[str]:
        import google.generativeai as genai

        key = self._settings.gemini_api_key
        genai.configure(api_key=key.get_secret_value() if key else None)
        model = genai.GenerativeModel(self._settings.answer_model)
        full_prompt = f"{context}\n\n{prompt}" if context else prompt
        response = model.generate_content(full_prompt, stream=True)
        for chunk in response:
            if chunk.text:
                yield chunk.text


def get_provider(settings: Settings | None = None) -> ModelProvider:
    """Stub when `settings.offline_mode` is true (the default the test suite
    forces, AC-135); Gemini otherwise. The only branch point in the
    codebase -- every other call site calls `embed`/`stream_answer` without
    knowing which implementation answered."""
    settings = settings or get_settings()
    if settings.offline_mode:
        return StubModelProvider()
    return GeminiModelProvider(settings)

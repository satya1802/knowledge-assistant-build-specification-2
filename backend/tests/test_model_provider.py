"""The ModelProvider abstraction (AC-126/127/129/134/136): deterministic
offline embeddings and answers, selected by `settings.offline_mode` with no
offline/online branching at the call site.
"""

import asyncio

from app.config import Settings
from app.services.model_provider import (
    GeminiModelProvider,
    StubModelProvider,
    get_provider,
)


def _run(coro_factory):
    async def collect():
        return [chunk async for chunk in coro_factory()]

    return asyncio.run(collect())


def test_get_provider_returns_the_stub_when_offline() -> None:
    settings = Settings(_env_file=None, offline_mode=True)

    assert isinstance(get_provider(settings), StubModelProvider)


def test_get_provider_returns_gemini_when_online() -> None:
    settings = Settings(_env_file=None, offline_mode=False)

    assert isinstance(get_provider(settings), GeminiModelProvider)


def test_default_get_provider_is_the_stub_in_the_test_suite() -> None:
    """`conftest.py` forces `OFFLINE_MODE=true`; a failure here means a
    test imported `app.config` before that env var was set."""
    from app.config import get_settings

    assert get_settings().offline_mode is True
    assert isinstance(get_provider(), StubModelProvider)


def test_embed_returns_768_dimensions() -> None:
    provider = StubModelProvider()

    vectors = provider.embed(["hello world", "a second passage"])

    assert len(vectors) == 2
    assert all(len(vector) == 768 for vector in vectors)


def test_embed_is_stable_for_the_same_input() -> None:
    provider = StubModelProvider()

    assert provider.embed(["hello world"]) == provider.embed(["hello world"])


def test_embed_differs_for_different_input() -> None:
    provider = StubModelProvider()

    first, second = provider.embed(["alpha", "beta"])

    assert first != second


def test_stream_answer_is_an_async_generator_yielding_text() -> None:
    provider = StubModelProvider()

    chunks = _run(lambda: provider.stream_answer("What is the policy?", context=""))

    assert chunks
    assert all(isinstance(chunk, str) for chunk in chunks)


def test_stream_answer_flags_general_knowledge_when_there_is_no_context() -> None:
    provider = StubModelProvider()

    answer = "".join(_run(lambda: provider.stream_answer("What is X?", context="")))

    assert "not from your documents" in answer


def test_stream_answer_is_deterministic_for_the_same_input() -> None:
    provider = StubModelProvider()

    first = "".join(_run(lambda: provider.stream_answer("q", "some retrieved context")))
    second = "".join(_run(lambda: provider.stream_answer("q", "some retrieved context")))

    assert first == second


def test_stream_answer_differs_for_different_context() -> None:
    provider = StubModelProvider()

    with_docs = "".join(_run(lambda: provider.stream_answer("q", "retrieved passage")))
    without_docs = "".join(_run(lambda: provider.stream_answer("q", "")))

    assert with_docs != without_docs
    assert "not from your documents" not in with_docs

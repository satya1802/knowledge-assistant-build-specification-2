"""Offline mode must make zero outbound network calls (AC: embed()/
stream_answer() under OFFLINE_MODE never touch the network). Network calls
are patched to fail loudly so a regression that starts dialing out fails
this test instead of silently calling Gemini in CI.
"""

import asyncio
import socket

import pytest

from app.config import Settings
from app.services.model_provider import StubModelProvider, get_provider


class _NetworkUsedError(RuntimeError):
    """Raised if anything under test tries to open a socket."""


@pytest.fixture(autouse=True)
def _forbid_network(monkeypatch) -> None:
    def _blow_up(*args, **kwargs):
        raise _NetworkUsedError("outbound network access attempted during offline test")

    monkeypatch.setattr(socket, "socket", _blow_up)
    monkeypatch.setattr(socket, "create_connection", _blow_up)


def _run(coro_factory):
    async def collect():
        return [chunk async for chunk in coro_factory()]

    return asyncio.run(collect())


def test_offline_provider_embeds_without_touching_the_network() -> None:
    settings = Settings(_env_file=None, offline_mode=True)
    provider = get_provider(settings)

    assert isinstance(provider, StubModelProvider)
    vectors = provider.embed(["hello", "hello"])

    assert len(vectors) == 2
    assert len(vectors[0]) == 768
    assert vectors[0] == vectors[1]  # deterministic for identical input


def test_offline_provider_streams_stub_text_without_touching_the_network() -> None:
    settings = Settings(_env_file=None, offline_mode=True)
    provider = get_provider(settings)

    chunks = _run(lambda: provider.stream_answer("What is the policy?", context=""))
    answer = "".join(chunks)

    assert answer
    assert "offline-stub" in answer
    assert "not from your documents" in answer


def test_embed_is_deterministic_across_repeated_calls_with_no_network() -> None:
    provider = StubModelProvider()

    assert provider.embed(["same input"]) == provider.embed(["same input"])

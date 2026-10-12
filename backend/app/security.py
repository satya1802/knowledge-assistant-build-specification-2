"""Password hashing: bcrypt via passlib.

A dummy hash is verified against on an unknown email so the call takes the
same time whether or not the account exists -- the architecture's
requirement that sign-in timing not leak which emails have accounts.
"""

from passlib.context import CryptContext

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash of a password nobody will ever type, computed once at import time and
# verified against when the submitted email does not exist, so an unknown
# email takes the same bcrypt-verify cost as a real one.
_DUMMY_HASH = _pwd_context.hash("quorq-dummy-password-for-constant-time-compare")


def hash_password(plain_password: str) -> str:
    """Bcrypt-hash `plain_password`. The caller must never log the input."""
    return _pwd_context.hash(plain_password)


def verify_password(plain_password: str, password_hash: str | None) -> bool:
    """Verify `plain_password` against `password_hash`.

    When `password_hash` is `None` (the email does not exist), verifies
    against the module-level dummy hash instead, so the call takes
    comparable time and the result -- always `False` -- gives away nothing
    about whether the account exists.
    """
    target = password_hash or _DUMMY_HASH
    try:
        return _pwd_context.verify(plain_password, target)
    except (ValueError, TypeError):
        return False

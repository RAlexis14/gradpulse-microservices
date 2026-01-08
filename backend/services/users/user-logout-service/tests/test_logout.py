import time
import jwt
from app.domain.session_service import SessionService


class FakeRedisRepository:
    def __init__(self):
        self.tokens = {}

    def blacklist_token(self, token: str, ttl_seconds: int) -> None:
        self.tokens[token] = ttl_seconds


def test_logout_blacklists_token():
    fake_repo = FakeRedisRepository()
    service = SessionService(fake_repo)

    token = jwt.encode(
        {"exp": int(time.time()) + 60},
        key="secret",
        algorithm="HS256"
    )

    service.logout(token)

    assert token in fake_repo.tokens

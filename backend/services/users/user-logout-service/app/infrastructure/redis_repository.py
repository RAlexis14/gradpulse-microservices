from redis import Redis
from app.core.config import REDIS_URL


class RedisRepository:
    def __init__(self, client: Redis | None = None):
        self.client = client or Redis.from_url(REDIS_URL)

    def blacklist_token(self, token: str, ttl_seconds: int) -> None:
        self.client.setex(
            name=token,
            time=ttl_seconds,
            value="blacklisted"
        )

    def is_blacklisted(self, token: str) -> bool:
        return self.client.exists(token) == 1

from redis import Redis
from app.core.config import settings

class RedisRepository:
    def __init__(self, client: Redis | None = None):
        self.client = client or Redis.from_url(settings.REDIS_URL)

    def blacklist_token(self, token: str, ttl_seconds: int) -> None:
        # If token already expired, avoid writing useless key
        if ttl_seconds <= 0:
            return
        self.client.setex(name=token, time=ttl_seconds, value="blacklisted")

    def is_blacklisted(self, token: str) -> bool:
        return self.client.exists(token) == 1

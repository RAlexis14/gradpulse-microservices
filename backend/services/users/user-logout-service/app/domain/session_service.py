import time
import jwt

class SessionService:
    def __init__(self, repository):
        self.repository = repository

    def logout(self, token: str) -> None:
        try:
            payload = jwt.decode(token, options={"verify_signature": False})
            exp = payload.get("exp")
            if not exp:
                return

            ttl = max(0, exp - int(time.time()))
            self.repository.blacklist_token(token, ttl)

        except Exception:
            return

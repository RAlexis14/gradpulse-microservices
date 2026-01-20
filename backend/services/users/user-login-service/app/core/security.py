import bcrypt
from datetime import datetime, timedelta
from jose import jwt
from app.core.config import Config


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


def create_access_token(subject: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=Config.JWT_EXP_MINUTES)
    payload = {
        "sub": subject,
        "exp": expire
    }
    return jwt.encode(
        payload,
        Config.JWT_SECRET_KEY,
        algorithm=Config.JWT_ALGORITHM
    )

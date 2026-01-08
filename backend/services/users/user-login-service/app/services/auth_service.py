from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, create_access_token


class AuthService:

    @staticmethod
    def login(email: str, password: str):
        user = UserRepository.get_user_by_email(email)

        if not user:
            return None, "Invalid credentials"

        if not user.is_active:
            return None, "User is inactive"

        if not verify_password(password, user.password_hash):
            return None, "Invalid credentials"

        token = create_access_token(user.email)
        return token, None

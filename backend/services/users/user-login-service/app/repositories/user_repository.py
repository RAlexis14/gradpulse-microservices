import psycopg2
from app.core.config import Config
from app.models.user import User


class UserRepository:

    @staticmethod
    def get_user_by_email(email: str):
        try:
            conn = psycopg2.connect(
                host=Config.DB_HOST,
                port=Config.DB_PORT,
                dbname=Config.DB_NAME,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD
            )

            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, email, password_hash, is_active FROM users WHERE email = %s",
                (email,)
            )

            row = cursor.fetchone()
            cursor.close()
            conn.close()

            if not row:
                return None

            return User(
                id=row[0],
                email=row[1],
                password_hash=row[2],
                is_active=row[3]
            )

        except psycopg2.OperationalError:
            # Database is not available
            return None

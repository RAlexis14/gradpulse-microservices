import psycopg2
from psycopg2.extras import RealDictCursor
from app.core.config import settings


class ProfileRepository:

    def _get_connection(self):
        return psycopg2.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            dbname=settings.DB_NAME,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            cursor_factory=RealDictCursor
        )

    def get_profile_by_id(self, user_id: int):
        try:
            query = """
                SELECT 
                    id,
                    email,
                    is_active
                FROM users
                WHERE id = %s
            """
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    return cursor.fetchone()
        except Exception as e:
            print(f"DB error: {e}")
            return None

from app.infrastructure.db import get_db_connection
import psycopg2


class UserRepository:
    def get_user_by_id(self, user_id: int):
        try:
            query = """
                SELECT id, email, is_active, role
                FROM users
                WHERE id = %s
            """

            connection = get_db_connection()
            with connection:
                with connection.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    return cursor.fetchone()

        except psycopg2.OperationalError:
            # Database not available (dev mode)
            return None

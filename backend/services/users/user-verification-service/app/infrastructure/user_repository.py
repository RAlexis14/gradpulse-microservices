from app.infrastructure.db import get_db_connection
import psycopg2


class UserRepository:
    def get_user_by_id(self, user_id: int):
        try:
            query = """
                SELECT 
                    u.id,
                    u.email,
                    u.is_active,
                    r.name AS role
                FROM users u
                LEFT JOIN user_roles ur ON u.id = ur.user_id
                LEFT JOIN roles r ON ur.role_id = r.id
                WHERE u.id = %s
            """

            connection = get_db_connection()
            with connection:
                with connection.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    return cursor.fetchone()

        except psycopg2.OperationalError:
            return None

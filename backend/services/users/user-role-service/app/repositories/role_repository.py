import psycopg2
from psycopg2.extras import RealDictCursor
from app.core.config import settings


class RoleRepository:
    def _get_connection(self):
        return psycopg2.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            dbname=settings.DB_NAME,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            cursor_factory=RealDictCursor
        )

    def create_role(self, role_name: str) -> bool:
        try:
            query = "INSERT INTO roles (name) VALUES (%s)"
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (role_name,))
            return True
        except psycopg2.Error:
            return False

    def assign_role(self, user_id: int, role_name: str) -> bool:
        try:
            query = """
                INSERT INTO user_roles (user_id, role_name)
                VALUES (%s, %s)
            """
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (user_id, role_name))
            return True
        except psycopg2.Error:
            return False

    def get_roles_by_user(self, user_id: int) -> list:
        try:
            query = """
                SELECT role_name
                FROM user_roles
                WHERE user_id = %s
            """
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    rows = cursor.fetchall()
                    return [row["role_name"] for row in rows]
        except psycopg2.Error:
            return []

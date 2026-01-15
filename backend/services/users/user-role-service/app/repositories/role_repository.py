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
            query = "INSERT INTO roles (name) VALUES (%s) ON CONFLICT DO NOTHING"
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (role_name,))
            return True
        except psycopg2.Error:
            return False

    def assign_role(self, user_id: int, role_name: str) -> bool:
        try:
            query = """
                INSERT INTO user_roles (user_id, role_id)
                SELECT %s, r.id
                FROM roles r
                WHERE r.name = %s
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
                SELECT r.name
                FROM user_roles ur
                JOIN roles r ON ur.role_id = r.id
                WHERE ur.user_id = %s
            """
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    rows = cursor.fetchall()
                    return [row["name"] for row in rows]
        except psycopg2.Error:
            return []

import psycopg2
from app.infrastructure.db import get_db_connection


class CommunityHoursRepository:
    def save_hours(self, student_id: int, hours: int) -> bool:
        try:
            query = """
                INSERT INTO community_hours_log (student_id, hours)
                VALUES (%s, %s)
            """
            with get_db_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id, hours))
            return True
        except psycopg2.Error:
            return False

    def get_total_hours(self, student_id: int) -> int:
        try:
            query = """
                SELECT COALESCE(SUM(hours), 0) AS total
                FROM community_hours_log
                WHERE student_id = %s
            """
            with get_db_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id,))
                    row = cursor.fetchone()
                    return int(row["total"]) if row else 0
        except psycopg2.Error:
            return 0

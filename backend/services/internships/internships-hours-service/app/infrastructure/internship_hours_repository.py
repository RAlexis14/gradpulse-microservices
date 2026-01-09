from app.infrastructure.db import get_db_connection


class InternshipHoursRepository:
    def save_hours(self, student_id: int, hours: int) -> bool:
        conn = get_db_connection()
        if not conn:
            return False

        query = """
            INSERT INTO internship_hours (student_id, hours)
            VALUES (%s, %s)
        """
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id, hours))
            return True
        except Exception:
            return False
        finally:
            conn.close()

    def get_total_hours(self, student_id: int) -> int:
        conn = get_db_connection()
        if not conn:
            return 0

        query = """
            SELECT COALESCE(SUM(hours), 0) AS total
            FROM internship_hours
            WHERE student_id = %s
        """
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id,))
                    row = cursor.fetchone()
                    return row["total"] if row else 0
        except Exception:
            return 0
        finally:
            conn.close()

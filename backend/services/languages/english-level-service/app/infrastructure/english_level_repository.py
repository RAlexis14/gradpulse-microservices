from app.infrastructure.db import get_db_connection


class EnglishLevelRepository:
    def get_level(self, student_id: int):
        conn = get_db_connection()
        if conn is None:
            return None

        query = "SELECT level FROM english_levels WHERE student_id = %s"
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id,))
                    row = cursor.fetchone()
                    return row["level"] if row else None
        except Exception:
            return None
        finally:
            conn.close()

    def set_level(self, student_id: int, level: str) -> bool:
        conn = get_db_connection()
        if conn is None:
            return False

        query = """
            INSERT INTO english_levels (student_id, level)
            VALUES (%s, %s)
            ON CONFLICT (student_id)
            DO UPDATE SET level = EXCLUDED.level, updated_at = CURRENT_TIMESTAMP
        """
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id, level))
            return True
        except Exception:
            return False
        finally:
            conn.close()

from app.infrastructure.db import get_db_connection


class LibraryRepository:
    def has_library_blocks(self, student_id: int) -> bool:
        conn = get_db_connection()
        if conn is None:
            # fallback seguro: asumimos sin bloqueos
            return False

        query = "SELECT has_blocks FROM library_blocks WHERE student_id = %s"
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id,))
                    row = cursor.fetchone()
                    return row["has_blocks"] if row else False
        except Exception:
            return False
        finally:
            conn.close()

    def save_clearance_metadata(self, student_id: int, storage_path: str) -> None:
        conn = get_db_connection()
        if conn is None:
            return

        query = """
            INSERT INTO library_clearances (student_id, storage_path)
            VALUES (%s, %s)
        """
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id, storage_path))
        except Exception:
            pass
        finally:
            conn.close()

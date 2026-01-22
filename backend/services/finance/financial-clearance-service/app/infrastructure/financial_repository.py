from app.infrastructure.db import get_db_connection


class FinancialRepository:
    def has_financial_debts(self, student_id: int) -> bool:
        conn = get_db_connection()
        if conn is None:
            # fallback seguro: asumimos SIN deudas en dev
            return False

        query = "SELECT has_debts FROM financial_debts WHERE student_id = %s"
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id,))
                    row = cursor.fetchone()
                    return row["has_debts"] if row else False
        except Exception:
            return False
        finally:
            conn.close()

    def save_clearance_audit(self, student_id: int, cleared: bool) -> None:
        conn = get_db_connection()
        if conn is None:
            return

        query = """
            INSERT INTO financial_clearances (student_id, cleared)
            VALUES (%s, %s)
        """
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id, cleared))
        except Exception:
            pass
        finally:
            conn.close()

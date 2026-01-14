import os
import psycopg2
from app.domain.graduation_status import TrafficLight


class PostgresAuditRepository:

    def save_audit(self, student_id: int, status: TrafficLight) -> None:
        try:
            conn = psycopg2.connect(
                host=os.getenv("DB_HOST", "localhost"),
                dbname=os.getenv("DB_NAME", "evaluation"),
                user=os.getenv("DB_USER", "postgres"),
                password=os.getenv("DB_PASSWORD", "postgres"),
            )
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO graduation_audit (student_id, status)
                        VALUES (%s, %s)
                        """,
                        (student_id, status),
                    )
        except Exception:
            # Defensive fallback for academic environment
            pass

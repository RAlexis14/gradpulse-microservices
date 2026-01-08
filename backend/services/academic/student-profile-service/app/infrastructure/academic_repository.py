import psycopg2
from app.infrastructure.db import get_db_connection
from app.domain.academic_profile import AcademicProfile


class AcademicRepository:
    def get_academic_profile(self, student_id: int):
        try:
            query = """
                SELECT student_id, career, credits, status
                FROM academic_profiles
                WHERE student_id = %s
            """
            with get_db_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (student_id,))
                    row = cursor.fetchone()

            if not row:
                return None

            return AcademicProfile(
                student_id=row["student_id"],
                career=row["career"],
                credits=row["credits"],
                status=row["status"],
            )

        except psycopg2.Error:
            return None

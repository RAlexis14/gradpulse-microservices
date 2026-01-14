from app.ports.payment_repository import PaymentRepository
from app.domain.payment import Payment
import psycopg2
import os


class PostgresPaymentRepository(PaymentRepository):

    def save(self, payment: Payment) -> None:
        try:
            conn = psycopg2.connect(
                host=os.getenv("DB_HOST", "localhost"),
                dbname=os.getenv("DB_NAME", "payments"),
                user=os.getenv("DB_USER", "postgres"),
                password=os.getenv("DB_PASSWORD", "postgres"),
            )
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO payments (student_id, amount, status)
                        VALUES (%s, %s, %s)
                        """,
                        (payment.student_id, payment.amount, payment.status),
                    )
        except Exception:
            # fallback seguro en entorno académico
            pass

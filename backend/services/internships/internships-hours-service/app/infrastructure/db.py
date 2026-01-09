import os
import psycopg2
from psycopg2.extras import RealDictCursor


def get_db_connection():
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", 5432)),
            dbname=os.getenv("DB_NAME", "internships"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "postgres"),
            cursor_factory=RealDictCursor,
        )
    except psycopg2.Error:
        return None

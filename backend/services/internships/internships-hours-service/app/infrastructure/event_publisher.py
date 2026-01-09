class EventPublisher:
    def publish_hours_updated(self, student_id: int, total_hours: int):
        # Stub de evento (futuro: RabbitMQ / Kafka)
        print(
            f"[EVENT] InternshipHoursUpdated | "
            f"student_id={student_id} total_hours={total_hours}"
        )

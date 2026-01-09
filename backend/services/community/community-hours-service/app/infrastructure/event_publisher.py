class EventPublisher:
    def publish_hours_updated(self, student_id: int, total_hours: int):
        # Stub de evento (en el futuro: RabbitMQ / Kafka)
        print(
            f"[EVENT] CommunityHoursUpdated | "
            f"student_id={student_id} total_hours={total_hours}"
        )

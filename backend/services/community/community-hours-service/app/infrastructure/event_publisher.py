class EventPublisher:
    def publish_hours_updated(self, student_id: int, total_hours: int) -> None:
        # Event stub (future Kafka/RabbitMQ)
        print(
            f"[EVENT] CommunityHoursUpdated | student_id={student_id} total_hours={total_hours}"
        )

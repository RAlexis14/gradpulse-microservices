import os
from app.infrastructure.event_publisher import EventPublisher


class InternshipHoursService:
    def __init__(self, repository, publisher: EventPublisher):
        self.repository = repository
        self.publisher = publisher
        self.required_hours = int(os.getenv("INTERNSHIPS_REQUIRED_HOURS", "240"))

    def register_hours(self, student_id: int, hours: int) -> bool:
        if student_id <= 0 or hours <= 0:
            return False

        saved = self.repository.save_hours(student_id, hours)
        if not saved:
            return False

        total = self.repository.get_total_hours(student_id)

        # Event stub (future Kafka/RabbitMQ)
        self.publisher.publish_hours_updated(student_id, total)

        return True

    def get_student_progress(self, student_id: int) -> dict:
        if student_id <= 0:
            return {
                "student_id": student_id,
                "total_hours": 0,
                "required_hours": self.required_hours,
                "missing_hours": self.required_hours,
                "completed": False,
            }

        total = self.repository.get_total_hours(student_id)
        missing = max(0, self.required_hours - total)

        return {
            "student_id": student_id,
            "total_hours": total,
            "required_hours": self.required_hours,
            "missing_hours": missing,
            "completed": total >= self.required_hours,
        }

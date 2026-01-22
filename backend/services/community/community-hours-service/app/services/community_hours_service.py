from app.infrastructure.event_publisher import EventPublisher


class CommunityHoursService:
    def __init__(self, repository, publisher: EventPublisher):
        self.repository = repository
        self.publisher = publisher

    def register_hours(self, student_id: int, hours: int) -> bool:
        if student_id <= 0 or hours <= 0:
            return False

        saved = self.repository.save_hours(student_id, hours)
        if not saved:
            return False

        total = self.repository.get_total_hours(student_id)
        self.publisher.publish_hours_updated(student_id, total)

        return True

    def get_student_progress(self, student_id: int, required_hours: int = 160) -> dict:
        if student_id <= 0:
            return {
                "student_id": student_id,
                "required_hours": required_hours,
                "total_hours": 0,
                "missing_hours": required_hours,
                "completed": False,
            }

        total = self.repository.get_total_hours(student_id)
        missing = max(0, required_hours - total)

        return {
            "student_id": student_id,
            "required_hours": required_hours,
            "total_hours": total,
            "missing_hours": missing,
            "completed": (missing == 0),
        }

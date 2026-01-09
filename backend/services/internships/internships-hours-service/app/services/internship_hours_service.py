from app.infrastructure.event_publisher import EventPublisher


class InternshipHoursService:
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

    def get_student_hours(self, student_id: int) -> int:
        if student_id <= 0:
            return 0
        return self.repository.get_total_hours(student_id)

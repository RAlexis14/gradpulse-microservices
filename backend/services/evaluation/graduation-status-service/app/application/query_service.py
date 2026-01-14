from app.ports.status_repository import StatusRepository
from app.domain.graduation_status import TrafficLight


class GraduationQueryService:

    def __init__(self, repository: StatusRepository):
        self.repository = repository

    def get_status(self, student_id: int) -> TrafficLight | None:
        return self.repository.get_status(student_id)

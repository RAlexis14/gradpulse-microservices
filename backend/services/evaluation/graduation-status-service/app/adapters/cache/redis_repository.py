from app.ports.status_repository import StatusRepository
from app.domain.graduation_status import TrafficLight

# In-memory fallback to avoid Redis dependency in QA
_READ_MODEL = {}


class RedisStatusRepository(StatusRepository):

    def save_status(self, student_id: int, status: TrafficLight) -> None:
        _READ_MODEL[student_id] = status

    def get_status(self, student_id: int) -> TrafficLight | None:
        return _READ_MODEL.get(student_id)

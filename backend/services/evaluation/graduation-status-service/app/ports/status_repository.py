from abc import ABC, abstractmethod
from app.domain.graduation_status import TrafficLight


class StatusRepository(ABC):

    @abstractmethod
    def save_status(self, student_id: int, status: TrafficLight) -> None:
        pass

    @abstractmethod
    def get_status(self, student_id: int) -> TrafficLight | None:
        pass

from abc import ABC, abstractmethod
from app.domain.graduation_status import TrafficLight


class StatusPublisher(ABC):

    @abstractmethod
    def publish(self, student_id: int, status: TrafficLight) -> None:
        pass

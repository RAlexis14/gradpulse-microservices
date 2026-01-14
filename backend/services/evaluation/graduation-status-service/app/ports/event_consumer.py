from abc import ABC, abstractmethod


class EventConsumer(ABC):

    @abstractmethod
    def consume(self, event: dict) -> None:
        pass

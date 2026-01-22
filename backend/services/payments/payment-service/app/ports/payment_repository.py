from abc import ABC, abstractmethod
from app.domain.payment import Payment


class PaymentRepository(ABC):

    @abstractmethod
    def save(self, payment: Payment) -> None:
        pass

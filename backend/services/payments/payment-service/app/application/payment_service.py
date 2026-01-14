from app.domain.payment import Payment
from app.ports.payment_repository import PaymentRepository
from app.ports.payment_gateway import PaymentGateway


class PaymentService:

    def __init__(
        self,
        repository: PaymentRepository,
        gateway: PaymentGateway,
    ):
        self.repository = repository
        self.gateway = gateway

    def process_payment(self, student_id: int, amount: float) -> dict:
        payment = Payment(student_id, amount)

        payment_id = self.gateway.create_payment(amount)

        payment.complete()
        self.repository.save(payment)

        return {
            "payment_id": payment_id,
            "student_id": student_id,
            "amount": amount,
            "status": payment.status,
        }

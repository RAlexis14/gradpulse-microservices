from app.application.payment_service import PaymentService


class FakeRepository:
    def save(self, payment):
        pass


class FakeGateway:
    def create_payment(self, amount):
        return "FAKE-PAYMENT-ID"


def test_payment_success():
    service = PaymentService(
        FakeRepository(),
        FakeGateway(),
    )

    result = service.process_payment(1, 50.0)

    assert result["status"] == "COMPLETED"
    assert result["amount"] == 50.0

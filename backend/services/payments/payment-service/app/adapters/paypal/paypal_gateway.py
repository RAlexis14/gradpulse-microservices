from app.ports.payment_gateway import PaymentGateway
import uuid


class PayPalGateway(PaymentGateway):

    def create_payment(self, amount: float) -> str:
        # PayPal Sandbox Simulation
        return f"PAYPAL-SANDBOX-{uuid.uuid4()}"

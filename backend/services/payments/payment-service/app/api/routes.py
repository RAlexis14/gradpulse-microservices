from flask import Blueprint, request, jsonify
from app.application.payment_service import PaymentService
from app.adapters.db.postgres_repository import PostgresPaymentRepository
from app.adapters.paypal.paypal_gateway import PayPalGateway

bp = Blueprint("payments", __name__)


@bp.route("/payments", methods=["POST"])
def create_payment():
    data = request.json

    service = PaymentService(
        PostgresPaymentRepository(),
        PayPalGateway(),
    )

    result = service.process_payment(
        student_id=data["student_id"],
        amount=data["amount"],
    )

    return jsonify(result), 201

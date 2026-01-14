from flask import Blueprint, jsonify
from app.services.financial_clearance_service import FinancialClearanceService
from app.infrastructure.financial_repository import FinancialRepository
from app.infrastructure.events.kafka_publisher import KafkaPublisher

bp = Blueprint("financial_clearance", __name__)


@bp.route("/finance/clearance/<int:student_id>", methods=["GET"])
def check_financial_clearance(student_id: int):
    service = FinancialClearanceService(
        FinancialRepository(),
        KafkaPublisher()
    )
    result = service.process_clearance(student_id)
    return jsonify(result), 200

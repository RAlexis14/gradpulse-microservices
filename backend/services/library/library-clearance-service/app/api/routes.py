from flask import Blueprint, jsonify
from app.services.library_clearance_service import LibraryClearanceService
from app.infrastructure.library_repository import LibraryRepository
from app.infrastructure.storage.supabase_client import SupabaseStorageClient
from app.infrastructure.events.kafka_publisher import KafkaPublisher

bp = Blueprint("library_clearance", __name__)


@bp.route("/library/clearance/<int:student_id>", methods=["GET"])
def check_clearance(student_id: int):
    service = LibraryClearanceService(
        LibraryRepository(),
        SupabaseStorageClient(),
        KafkaPublisher()
    )

    result = service.process_clearance(student_id)
    return jsonify(result), 200

from flask import Blueprint, request, jsonify
from app.services.community_hours_service import CommunityHoursService
from app.infrastructure.community_hours_repository import CommunityHoursRepository
from app.infrastructure.event_publisher import EventPublisher

bp = Blueprint("community_hours", __name__)


@bp.route("/community/hours/register", methods=["POST"])
def register_hours():
    data = request.get_json() or {}
    student_id = int(data.get("student_id", 0))
    hours = int(data.get("hours", 0))

    service = CommunityHoursService(
        CommunityHoursRepository(),
        EventPublisher()
    )

    success = service.register_hours(student_id, hours)
    if not success:
        return jsonify({"error": "Hours could not be registered"}), 400

    return jsonify({"message": "Community hours registered"}), 201


@bp.route("/community/hours/<int:student_id>", methods=["GET"])
def get_student_hours(student_id: int):
    service = CommunityHoursService(
        CommunityHoursRepository(),
        EventPublisher()
    )

    progress = service.get_student_progress(student_id, required_hours=160)
    return jsonify(progress), 200

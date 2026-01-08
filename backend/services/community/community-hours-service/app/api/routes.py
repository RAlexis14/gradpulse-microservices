from flask import Blueprint, request, jsonify
from app.services.community_hours_service import CommunityHoursService
from app.infrastructure.community_hours_repository import CommunityHoursRepository
from app.infrastructure.event_publisher import EventPublisher

bp = Blueprint("community_hours", __name__)


@bp.route("/community-hours/register", methods=["POST"])
def register_hours():
    data = request.get_json()
    student_id = data.get("student_id")
    hours = data.get("hours")

    service = CommunityHoursService(
        CommunityHoursRepository(),
        EventPublisher()
    )

    success = service.register_hours(student_id, hours)
    if not success:
        return jsonify({"error": "Hours could not be registered"}), 400

    return jsonify({"message": "Community hours registered"}), 201


@bp.route("/community-hours/student/<int:student_id>", methods=["GET"])
def get_student_hours(student_id: int):
    service = CommunityHoursService(
        CommunityHoursRepository(),
        EventPublisher()
    )

    total = service.get_student_hours(student_id)

    return jsonify({
        "student_id": student_id,
        "total_hours": total
    }), 200

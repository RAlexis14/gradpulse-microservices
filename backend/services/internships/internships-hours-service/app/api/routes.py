from flask import Blueprint, request, jsonify
from app.services.internship_hours_service import InternshipHoursService
from app.infrastructure.internship_hours_repository import InternshipHoursRepository
from app.infrastructure.event_publisher import EventPublisher

bp = Blueprint("internship_hours", __name__)


@bp.route("/internships-hours/register", methods=["POST"])
def register_hours():
    data = request.get_json()
    student_id = data.get("student_id")
    hours = data.get("hours")

    service = InternshipHoursService(
        InternshipHoursRepository(),
        EventPublisher()
    )

    success = service.register_hours(student_id, hours)
    if not success:
        return jsonify({"error": "Internship hours could not be registered"}), 400

    return jsonify({"message": "Internship hours registered"}), 201


@bp.route("/internships-hours/student/<int:student_id>", methods=["GET"])
def get_student_hours(student_id: int):
    service = InternshipHoursService(
        InternshipHoursRepository(),
        EventPublisher()
    )

    total = service.get_student_hours(student_id)

    return jsonify({
        "student_id": student_id,
        "total_hours": total
    }), 200

from flask import Blueprint, jsonify
from app.services.academic_service import AcademicService
from app.infrastructure.academic_repository import AcademicRepository

bp = Blueprint("academic", __name__)


@bp.route("/students/<int:student_id>/academic-profile", methods=["GET"])
def get_academic_profile(student_id: int):
    service = AcademicService(AcademicRepository())
    profile = service.get_student_academic_profile(student_id)

    if not profile:
        return jsonify({"error": "Academic profile not found"}), 404

    return jsonify(profile.to_dict()), 200

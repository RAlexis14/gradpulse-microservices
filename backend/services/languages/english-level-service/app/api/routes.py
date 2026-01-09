from flask import Blueprint, jsonify, request
from app.services.english_level_service import EnglishLevelService
from app.infrastructure.english_level_repository import EnglishLevelRepository

bp = Blueprint("english_level", __name__)


@bp.route("/english-level/student/<int:student_id>", methods=["GET"])
def get_level(student_id: int):
    service = EnglishLevelService(EnglishLevelRepository())
    level = service.get_student_level(student_id)

    if not level:
        return jsonify({"error": "English level not found"}), 404

    return jsonify({
        "student_id": student_id,
        "level": level
    }), 200


@bp.route("/english-level/update", methods=["POST"])
def update_level():
    data = request.get_json()
    student_id = data.get("student_id")
    level = data.get("level")

    service = EnglishLevelService(EnglishLevelRepository())
    success = service.update_student_level(student_id, level)

    if not success:
        return jsonify({"error": "Invalid student or level"}), 400

    return jsonify({"message": "English level updated"}), 200

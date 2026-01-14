from flask import Blueprint, jsonify
from app.application.query_service import GraduationQueryService
from app.adapters.cache.redis_repository import RedisStatusRepository

bp = Blueprint("graduation_status", __name__)


@bp.route("/graduation/status/<int:student_id>", methods=["GET"])
def get_graduation_status(student_id: int):
    service = GraduationQueryService(RedisStatusRepository())
    status = service.get_status(student_id)

    if status is None:
        return jsonify({
            "student_id": student_id,
            "status": "UNKNOWN",
            "message": "Status not calculated yet"
        }), 200

    return jsonify({
        "student_id": student_id,
        "status": status
    }), 200

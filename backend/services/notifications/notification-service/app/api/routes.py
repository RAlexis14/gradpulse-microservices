from flask import Blueprint, jsonify, request
from app.services.notification_service import NotificationService

bp = Blueprint("notifications", __name__)
service = NotificationService()


@bp.route("/notifications", methods=["POST"])
def create_notification():
    data = request.get_json(silent=True)

    if not data or "student_id" not in data or "message" not in data:
        return jsonify({
            "error": "Invalid request payload",
            "required": ["student_id", "message"]
        }), 400

    result = service.notify(
        student_id=data["student_id"],
        message=data["message"]
    )

    return jsonify(result), 201


@bp.route("/notifications", methods=["GET"])
def list_notifications():
    return jsonify(service.list_notifications()), 200

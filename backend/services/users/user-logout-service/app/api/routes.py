from flask import Blueprint, request, jsonify
from app.domain.session_service import SessionService
from app.infrastructure.redis_repository import RedisRepository

bp = Blueprint("logout", __name__, url_prefix="/api/v1")


@bp.route("/logout", methods=["POST"])
def logout():
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization token missing"}), 401

    token = auth_header.split(" ")[1]

    service = SessionService(RedisRepository())
    service.logout(token)

    return jsonify({"message": "Session closed successfully"}), 200

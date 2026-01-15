from flask import Blueprint, jsonify
from app.services.profile_service import ProfileService
from app.repositories.profile_repository import ProfileRepository

bp = Blueprint("profiles", __name__)


@bp.route("/profiles/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    service = ProfileService(ProfileRepository())
    profile = service.get_user_profile(user_id)

    if not profile:
        return jsonify({"error": "User not found"}), 404

    return jsonify(profile), 200

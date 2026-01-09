from flask import Blueprint, jsonify
from app.domain.verification_service import VerificationService
from app.infrastructure.user_repository import UserRepository

bp = Blueprint("verification", __name__)


@bp.route("/users/verify/<int:user_id>", methods=["GET"])
def verify_user(user_id: int):
    repository = UserRepository()
    service = VerificationService(repository)

    result = service.verify_user(user_id)
    return jsonify(result), 200

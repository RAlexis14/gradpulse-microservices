from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService


auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Email and password are required"}), 400

    token, error = AuthService.login(
        email=data["email"],
        password=data["password"]
    )

    if error:
        return jsonify({"error": error}), 401

    return jsonify({
        "access_token": token,
        "token_type": "bearer"
    }), 200

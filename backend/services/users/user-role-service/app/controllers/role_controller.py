from flask import Blueprint, request, jsonify
from app.services.role_service import RoleService
from app.repositories.role_repository import RoleRepository

bp = Blueprint("roles", __name__)


@bp.route("/roles", methods=["POST"])
def create_role():
    data = request.get_json()
    role_name = data.get("name")

    service = RoleService(RoleRepository())
    success = service.create_role(role_name)

    if not success:
        return jsonify({"error": "Role could not be created"}), 400

    return jsonify({"message": "Role created successfully"}), 201


@bp.route("/roles/assign", methods=["POST"])
def assign_role():
    data = request.get_json()
    user_id = data.get("user_id")
    role_name = data.get("role")

    service = RoleService(RoleRepository())
    success = service.assign_role(user_id, role_name)

    if not success:
        return jsonify({"error": "Role assignment failed"}), 400

    return jsonify({"message": "Role assigned successfully"}), 200


@bp.route("/roles/user/<int:user_id>", methods=["GET"])
def get_user_roles(user_id: int):
    service = RoleService(RoleRepository())
    roles = service.get_user_roles(user_id)

    return jsonify({
        "user_id": user_id,
        "roles": roles
    }), 200

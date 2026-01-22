from flask import Blueprint, jsonify
from app.services.program_service import ProgramService
from app.repositories.program_repository import ProgramRepository

bp = Blueprint("community_programs", __name__)

# Backward compatible route (your current)
@bp.route("/community-programs", methods=["GET"])
def list_programs_legacy():
    service = ProgramService(ProgramRepository())
    programs = service.list_programs()
    return jsonify([p.to_dict() for p in programs]), 200

@bp.route("/community-programs/<string:program_id>", methods=["GET"])
def get_program_legacy(program_id: str):
    service = ProgramService(ProgramRepository())
    program = service.get_program(program_id)

    if not program:
        return jsonify({"error": "Program not found"}), 404

    return jsonify(program.to_dict()), 200

# Recommended clean REST routes
@bp.route("/community/programs", methods=["GET"])
def list_programs():
    service = ProgramService(ProgramRepository())
    programs = service.list_programs()
    return jsonify([p.to_dict() for p in programs]), 200

@bp.route("/community/programs/<string:program_id>", methods=["GET"])
def get_program(program_id: str):
    service = ProgramService(ProgramRepository())
    program = service.get_program(program_id)

    if not program:
        return jsonify({"error": "Program not found"}), 404

    return jsonify(program.to_dict()), 200

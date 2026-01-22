from flask import Blueprint, jsonify, request
from app.services.course_service import CourseService
from app.repositories.course_repository import CourseRepository

bp = Blueprint("english_courses", __name__)


@bp.route("/english-courses", methods=["GET"])
def list_courses():
    level = request.args.get("level")  # optional filter ?level=B1.1
    service = CourseService(CourseRepository())
    courses = service.list_courses(level=level)
    return jsonify([c.to_dict() for c in courses]), 200


@bp.route("/english-courses/<string:course_id>", methods=["GET"])
def get_course(course_id: str):
    service = CourseService(CourseRepository())
    course = service.get_course(course_id)

    if not course:
        return jsonify({"error": "Course not found"}), 404

    return jsonify(course.to_dict()), 200

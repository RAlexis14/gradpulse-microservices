from flask import Blueprint, jsonify
from app.services.course_service import CourseService
from app.repositories.course_repository import CourseRepository

bp = Blueprint("courses", __name__)


@bp.route("/english-courses", methods=["GET"])
def list_courses():
    service = CourseService(CourseRepository())
    courses = service.get_courses()
    return jsonify(courses), 200

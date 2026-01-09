from app.services.course_service import CourseService


class FakeRepository:
    def list_courses(self):
        return [
            {"name": "English A1.1", "level": "A1.1", "duration_hours": 40},
            {"name": "English A2.1", "level": "A2.1", "duration_hours": 60},
        ]


def test_list_courses():
    service = CourseService(FakeRepository())
    courses = service.get_courses()
    assert len(courses) == 2

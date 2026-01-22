from app.services.course_service import CourseService


class FakeRepository:
    def list_active(self, level=None):
        data = [
            {"name": "English A1.1 - Morning", "level": "A1.1", "duration_hours": 40},
            {"name": "English A2.1 - Evening", "level": "A2.1", "duration_hours": 60},
        ]
        if level:
            return [d for d in data if d["level"] == level]
        return data

    def find_by_id(self, course_id: str):
        return None


def test_list_courses():
    service = CourseService(FakeRepository())
    courses = service.list_courses()
    assert len(courses) == 2


def test_list_courses_filtered():
    service = CourseService(FakeRepository())
    courses = service.list_courses(level="A1.1")
    assert len(courses) == 1

class CourseService:
    def __init__(self, repository):
        self.repository = repository

    def list_courses(self, level: str | None = None):
        return self.repository.list_active(level)

    def get_course(self, course_id: str):
        if not course_id:
            return None
        return self.repository.find_by_id(course_id)

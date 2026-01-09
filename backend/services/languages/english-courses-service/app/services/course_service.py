class CourseService:
    def __init__(self, repository):
        self.repository = repository

    def get_courses(self):
        return self.repository.list_courses()

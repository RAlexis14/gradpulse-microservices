class AcademicService:
    def __init__(self, repository):
        self.repository = repository

    def get_student_academic_profile(self, student_id: int):
        if student_id <= 0:
            return None
        return self.repository.get_academic_profile(student_id)

from app.domain.english_level import EnglishLevel


class EnglishLevelService:
    def __init__(self, repository):
        self.repository = repository

    def get_student_level(self, student_id: int) -> str | None:
        if student_id <= 0:
            return None
        return self.repository.get_level(student_id)

    def update_student_level(self, student_id: int, level: str) -> bool:
        if student_id <= 0:
            return False
        if not EnglishLevel.is_valid_level(level):
            return False
        return self.repository.set_level(student_id, level)

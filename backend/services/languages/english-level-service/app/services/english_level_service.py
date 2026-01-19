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

    def get_student_level_status(self, student_id: int) -> dict | None:
        """
        Returns a dashboard-like status:
        current_level, required_level, completed, remaining_levels
        """
        level = self.get_student_level(student_id)
        if not level:
            return None

        return {
            "student_id": student_id,
            "current_level": level,
            "required_level": EnglishLevel.REQUIRED_LEVEL,
            "completed": EnglishLevel.is_completed(level),
            "remaining_levels": EnglishLevel.remaining_levels(level),
        }

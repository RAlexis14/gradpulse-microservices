class EnglishLevel:
    """
    Domain entity for English level validation.
    Valid levels follow institutional academic standards.
    """

    VALID_LEVELS = {
        "A1.1",
        "A1.2",
        "A2.1",
        "A2.2",
        "B1.1",
    }

    def __init__(self, student_id: int, level: str):
        self.student_id = student_id
        self.level = level

    @classmethod
    def is_valid_level(cls, level: str) -> bool:
        return level in cls.VALID_LEVELS

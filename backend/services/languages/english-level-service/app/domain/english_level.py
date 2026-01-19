class EnglishLevel:
    """
    Domain entity for English level validation.
    Required max level for graduation: B1.1
    """

    LEVEL_ORDER = ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1"]
    REQUIRED_LEVEL = "B1.1"

    VALID_LEVELS = set(LEVEL_ORDER)

    def __init__(self, student_id: int, level: str):
        self.student_id = student_id
        self.level = level

    @classmethod
    def is_valid_level(cls, level: str) -> bool:
        return level in cls.VALID_LEVELS

    @classmethod
    def is_completed(cls, level: str) -> bool:
        return level == cls.REQUIRED_LEVEL

    @classmethod
    def remaining_levels(cls, level: str) -> list[str]:
        """
        Returns the list of remaining levels to reach REQUIRED_LEVEL.
        If level is invalid or not found, returns full path.
        """
        if level not in cls.LEVEL_ORDER:
            return cls.LEVEL_ORDER.copy()

        idx = cls.LEVEL_ORDER.index(level)
        # remaining after current
        return cls.LEVEL_ORDER[idx + 1:]

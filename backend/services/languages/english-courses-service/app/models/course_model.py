class Course:
    def __init__(
        self,
        course_id: str,
        name: str,
        level: str,
        schedule: str,
        modality: str,
        duration_weeks: int,
        hours_per_week: int,
        active: bool,
    ):
        self.id = course_id
        self.name = name
        self.level = level
        self.schedule = schedule
        self.modality = modality
        self.duration_weeks = duration_weeks
        self.hours_per_week = hours_per_week
        self.active = active

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "schedule": self.schedule,
            "modality": self.modality,
            "duration_weeks": self.duration_weeks,
            "hours_per_week": self.hours_per_week,
            "active": self.active,
        }

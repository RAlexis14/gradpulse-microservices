class Course:
    def __init__(self, name: str, level: str, duration_hours: int):
        self.name = name
        self.level = level
        self.duration_hours = duration_hours

    def to_dict(self):
        return {
            "name": self.name,
            "level": self.level,
            "duration_hours": self.duration_hours
        }

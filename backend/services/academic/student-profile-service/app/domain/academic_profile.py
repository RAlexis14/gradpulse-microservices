class AcademicProfile:
    def __init__(self, student_id: int, career: str, credits: int, status: str):
        self.student_id = student_id
        self.career = career
        self.credits = credits
        self.status = status

    def to_dict(self) -> dict:
        return {
            "student_id": self.student_id,
            "career": self.career,
            "credits": self.credits,
            "status": self.status,
        }

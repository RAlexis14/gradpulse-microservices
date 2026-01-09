from app.services.internship_hours_service import InternshipHoursService


class FakeRepository:
    def __init__(self):
        self.data = {}

    def save_hours(self, student_id: int, hours: int):
        self.data.setdefault(student_id, 0)
        self.data[student_id] += hours
        return True

    def get_total_hours(self, student_id: int):
        return self.data.get(student_id, 0)


class FakePublisher:
    def publish_hours_updated(self, student_id: int, total_hours: int):
        pass


def test_register_hours():
    service = InternshipHoursService(FakeRepository(), FakePublisher())
    assert service.register_hours(1, 8) is True


def test_get_hours():
    repo = FakeRepository()
    repo.save_hours(1, 16)
    service = InternshipHoursService(repo, FakePublisher())
    assert service.get_student_hours(1) == 16

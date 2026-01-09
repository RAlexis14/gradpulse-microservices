from app.services.community_hours_service import CommunityHoursService


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
    service = CommunityHoursService(FakeRepository(), FakePublisher())
    assert service.register_hours(1, 10) is True


def test_get_hours():
    repo = FakeRepository()
    repo.save_hours(1, 20)
    service = CommunityHoursService(repo, FakePublisher())
    assert service.get_student_hours(1) == 20

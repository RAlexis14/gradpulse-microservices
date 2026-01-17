import os
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


def test_get_hours_progress():
    # Use the same rule you set in Vinculacion (example: 160)
    # IMPORTANT: this env name must match what your service reads.
    os.environ["COMMUNITY_REQUIRED_HOURS"] = "160"

    repo = FakeRepository()
    repo.save_hours(1, 20)

    service = CommunityHoursService(repo, FakePublisher())
    result = service.get_student_progress(1)

    assert result["student_id"] == 1
    assert result["total_hours"] == 20
    assert result["required_hours"] == 160
    assert result["missing_hours"] == 140
    assert result["completed"] is False

from app.services.english_level_service import EnglishLevelService


class FakeRepository:
    def __init__(self):
        self.data = {}

    def get_level(self, student_id: int):
        return self.data.get(student_id)

    def set_level(self, student_id: int, level: str):
        self.data[student_id] = level
        return True


def test_update_valid_level():
    service = EnglishLevelService(FakeRepository())
    assert service.update_student_level(1, "A1.1") is True
    assert service.update_student_level(1, "A2.2") is True
    assert service.update_student_level(1, "B1.1") is True


def test_update_invalid_level():
    service = EnglishLevelService(FakeRepository())
    assert service.update_student_level(1, "A1") is False
    assert service.update_student_level(1, "B2") is False
    assert service.update_student_level(1, "C1") is False


def test_get_level():
    repo = FakeRepository()
    repo.set_level(1, "A2.1")
    service = EnglishLevelService(repo)
    assert service.get_student_level(1) == "A2.1"

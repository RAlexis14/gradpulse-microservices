from app.services.library_clearance_service import LibraryClearanceService


class FakeRepository:
    def has_library_blocks(self, student_id: int):
        return False

    def save_clearance_metadata(self, student_id: int, storage_path: str):
        pass


class FakeStorage:
    def upload_certificate(self, student_id: int, content: str):
        return "fake/path.pdf"


class FakePublisher:
    def publish_clearance_event(self, student_id: int, cleared: bool):
        pass


def test_clearance_success():
    service = LibraryClearanceService(
        FakeRepository(),
        FakeStorage(),
        FakePublisher()
    )

    result = service.process_clearance(1)
    assert result["cleared"] is True

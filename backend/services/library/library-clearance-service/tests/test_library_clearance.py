from app.services.library_clearance_service import LibraryClearanceService


class FakeRepositoryNoBlocks:
    def has_library_blocks(self, student_id: int) -> bool:
        return False

    def save_clearance_metadata(self, student_id: int, storage_path: str) -> None:
        return


class FakeRepositoryWithBlocks:
    def has_library_blocks(self, student_id: int) -> bool:
        return True

    def save_clearance_metadata(self, student_id: int, storage_path: str) -> None:
        return


class FakeStorage:
    def upload_certificate(self, student_id: int, content: str) -> str:
        return "fake/path.pdf"


class FakePublisher:
    def publish_clearance_event(self, student_id: int, cleared: bool) -> None:
        return


def test_clearance_success():
    service = LibraryClearanceService(FakeRepositoryNoBlocks(), FakeStorage(), FakePublisher())
    result = service.process_clearance(1)
    assert result["cleared"] is True
    assert "certificate_path" in result


def test_clearance_blocked():
    service = LibraryClearanceService(FakeRepositoryWithBlocks(), FakeStorage(), FakePublisher())
    result = service.process_clearance(1)
    assert result["cleared"] is False
    assert result["message"] == "Student has library blocks"

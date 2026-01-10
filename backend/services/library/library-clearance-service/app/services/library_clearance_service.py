from app.domain.library_clearance import LibraryClearance


class LibraryClearanceService:
    def __init__(self, repository, storage_client, event_publisher):
        self.repository = repository
        self.storage_client = storage_client
        self.event_publisher = event_publisher

    def process_clearance(self, student_id: int) -> dict:
        has_blocks = self.repository.has_library_blocks(student_id)
        clearance = LibraryClearance(student_id, has_blocks)

        if not clearance.is_cleared:
            return {
                "student_id": student_id,
                "cleared": False,
                "message": "Student has library blocks"
            }

        certificate_content = f"Library clearance certificate for student {student_id}"
        storage_path = self.storage_client.upload_certificate(
            student_id, certificate_content
        )

        self.repository.save_clearance_metadata(student_id, storage_path)
        self.event_publisher.publish_clearance_event(student_id, True)

        return {
            "student_id": student_id,
            "cleared": True,
            "certificate_path": storage_path
        }

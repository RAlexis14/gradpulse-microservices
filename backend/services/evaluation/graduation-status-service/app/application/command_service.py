from app.domain.graduation_status import GraduationStatus
from app.adapters.db.postgres_repository import PostgresAuditRepository
from app.ports.status_repository import StatusRepository
from app.ports.status_publisher import StatusPublisher


class GraduationCommandService:

    def __init__(
        self,
        status_repository: StatusRepository,
        publisher: StatusPublisher,
        audit_repository: PostgresAuditRepository,
    ):
        self.status_repository = status_repository
        self.publisher = publisher
        self.audit_repository = audit_repository

    def recalculate(self, student_id: int, completed: bool, pending: bool):
        status = GraduationStatus(student_id, completed, pending).evaluate()

        self.status_repository.save_status(student_id, status)
        self.audit_repository.save_audit(student_id, status)
        self.publisher.publish(student_id, status)

        return status

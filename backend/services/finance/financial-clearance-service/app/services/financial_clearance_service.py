from app.domain.financial_clearance import FinancialClearance


class FinancialClearanceService:
    def __init__(self, repository, event_publisher):
        self.repository = repository
        self.event_publisher = event_publisher

    def process_clearance(self, student_id: int) -> dict:
        has_debts = self.repository.has_financial_debts(student_id)
        clearance = FinancialClearance(student_id, has_debts)

        self.repository.save_clearance_audit(student_id, clearance.is_cleared)
        self.event_publisher.publish_financial_clearance_event(
            student_id, clearance.is_cleared
        )

        if not clearance.is_cleared:
            return {
                "student_id": student_id,
                "cleared": False,
                "message": "Student has pending financial debts"
            }

        return {
            "student_id": student_id,
            "cleared": True,
            "message": "Financial clearance approved"
        }

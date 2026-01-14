from app.services.financial_clearance_service import FinancialClearanceService


class FakeRepository:
    def has_financial_debts(self, student_id: int):
        return False

    def save_clearance_audit(self, student_id: int, cleared: bool):
        pass


class FakePublisher:
    def publish_financial_clearance_event(self, student_id: int, cleared: bool):
        pass


def test_financial_clearance_success():
    service = FinancialClearanceService(
        FakeRepository(),
        FakePublisher()
    )
    result = service.process_clearance(1)
    assert result["cleared"] is True

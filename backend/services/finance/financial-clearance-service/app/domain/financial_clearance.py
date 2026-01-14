class FinancialClearance:
    def __init__(self, student_id: int, has_debts: bool):
        self.student_id = student_id
        self.has_debts = has_debts

    @property
    def is_cleared(self) -> bool:
        return not self.has_debts

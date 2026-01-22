from enum import Enum


class PaymentStatus(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class Payment:
    def __init__(self, student_id: int, amount: float):
        self.student_id = student_id
        self.amount = amount
        self.status = PaymentStatus.PENDING

    def complete(self):
        self.status = PaymentStatus.COMPLETED

    def fail(self):
        self.status = PaymentStatus.FAILED

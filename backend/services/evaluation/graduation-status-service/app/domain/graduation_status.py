from enum import Enum


class TrafficLight(str, Enum):
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    RED = "RED"


class GraduationStatus:
    def __init__(self, student_id: int, completed: bool, pending: bool):
        self.student_id = student_id
        self.completed = completed
        self.pending = pending

    def evaluate(self) -> TrafficLight:
        if self.completed and not self.pending:
            return TrafficLight.GREEN
        if self.pending:
            return TrafficLight.YELLOW
        return TrafficLight.RED

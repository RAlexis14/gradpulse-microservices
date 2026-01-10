class LibraryClearance:
    def __init__(self, student_id: int, has_blocks: bool):
        self.student_id = student_id
        self.has_blocks = has_blocks

    @property
    def is_cleared(self) -> bool:
        return not self.has_blocks

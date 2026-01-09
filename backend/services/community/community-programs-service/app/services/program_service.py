class ProgramService:
    def __init__(self, repository):
        self.repository = repository

    def list_programs(self):
        return self.repository.find_all()

    def get_program(self, program_id: str):
        if not program_id:
            return None
        return self.repository.find_by_id(program_id)

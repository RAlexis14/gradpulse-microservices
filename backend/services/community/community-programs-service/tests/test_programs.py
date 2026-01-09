from app.services.program_service import ProgramService
from app.models.program_model import CommunityProgram


class FakeProgramRepository:
    def find_all(self):
        return [
            CommunityProgram("1", "Alfabetización", "Apoyo educativo", 40, True),
            CommunityProgram("2", "Reforestación", "Cuidado ambiental", 30, True),
        ]

    def find_by_id(self, program_id: str):
        if program_id == "1":
            return CommunityProgram("1", "Alfabetización", "Apoyo educativo", 40, True)
        return None


def test_list_programs():
    service = ProgramService(FakeProgramRepository())
    programs = service.list_programs()
    assert len(programs) == 2


def test_get_program_found():
    service = ProgramService(FakeProgramRepository())
    program = service.get_program("1")
    assert program.name == "Alfabetización"


def test_get_program_not_found():
    service = ProgramService(FakeProgramRepository())
    assert service.get_program("99") is None

from app.services.academic_service import AcademicService
from app.domain.academic_profile import AcademicProfile


class FakeAcademicRepository:
    def get_academic_profile(self, student_id: int):
        if student_id == 1:
            return AcademicProfile(
                student_id=1,
                career="Computer Science",
                credits=180,
                status="active"
            )
        return None


def test_existing_academic_profile():
    service = AcademicService(FakeAcademicRepository())
    profile = service.get_student_academic_profile(1)

    assert profile.career == "Computer Science"
    assert profile.credits == 180
    assert profile.status == "active"


def test_non_existing_academic_profile():
    service = AcademicService(FakeAcademicRepository())
    profile = service.get_student_academic_profile(99)

    assert profile is None

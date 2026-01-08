from app.domain.verification_service import VerificationService


class FakeUserRepository:
    def __init__(self, user):
        self.user = user

    def get_user_by_id(self, user_id: int):
        return self.user


def test_user_exists_and_active():
    fake_repo = FakeUserRepository({
        "id": 1,
        "email": "test@test.com",
        "is_active": True,
        "role": "admin"
    })

    service = VerificationService(fake_repo)
    result = service.verify_user(1)

    assert result["exists"] is True
    assert result["active"] is True
    assert result["role"] == "admin"


def test_user_not_found():
    fake_repo = FakeUserRepository(None)

    service = VerificationService(fake_repo)
    result = service.verify_user(99)

    assert result["exists"] is False
    assert result["active"] is False
    assert result["role"] is None

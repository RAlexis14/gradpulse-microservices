from app.services.profile_service import ProfileService


class FakeProfileRepository:
    def get_profile_by_id(self, user_id: int):
        if user_id == 1:
            return {
                "id": 1,
                "name": "Test User",
                "email": "test@example.com",
                "status": "active"
            }
        return None


def test_get_existing_profile():
    service = ProfileService(FakeProfileRepository())
    profile = service.get_user_profile(1)
    assert profile["email"] == "test@example.com"


def test_get_non_existing_profile():
    service = ProfileService(FakeProfileRepository())
    assert service.get_user_profile(99) is None

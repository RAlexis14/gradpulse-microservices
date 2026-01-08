import json
from unittest.mock import patch
from app.main import create_app


def test_login_invalid_credentials():
    app = create_app()
    client = app.test_client()

    # Mock repository method to avoid real DB connection
    with patch("app.repositories.user_repository.UserRepository.get_user_by_email") as mock_get_user:
        mock_get_user.return_value = None

        response = client.post(
            "/auth/login",
            data=json.dumps({
                "email": "invalid@test.com",
                "password": "wrong"
            }),
            content_type="application/json"
        )

        assert response.status_code == 401

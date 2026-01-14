from app.services.notification_service import NotificationService


def test_create_notification():
    service = NotificationService()

    result = service.notify(1, "All requirements are GREEN")

    assert result["student_id"] == 1
    assert "GREEN" in result["message"]

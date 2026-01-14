from app.repositories.notification_repository import NotificationRepository
from app.websocket.socket import notify_clients


class NotificationService:
    def __init__(self):
        self.repository = NotificationRepository()

    def notify(self, student_id: int, message: str) -> dict:
        notification = {
            "student_id": student_id,
            "message": message,
            "type": "INFO"
        }

        self.repository.save(notification)
        notify_clients(notification)

        return notification

    def list_notifications(self) -> list:
        return self.repository.list_all()

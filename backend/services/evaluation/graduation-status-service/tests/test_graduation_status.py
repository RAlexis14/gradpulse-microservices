from app.application.command_service import GraduationCommandService
from app.adapters.cache.redis_repository import RedisStatusRepository
from app.adapters.mqtt.mqtt_publisher import MqttPublisher
from app.adapters.db.postgres_repository import PostgresAuditRepository


def test_graduation_green():
    service = GraduationCommandService(
        RedisStatusRepository(),
        MqttPublisher(),
        PostgresAuditRepository(),
    )

    status = service.recalculate(
        student_id=1,
        completed=True,
        pending=False
    )

    assert status == "GREEN"

from app.ports.status_publisher import StatusPublisher
from app.domain.graduation_status import TrafficLight


class MqttPublisher(StatusPublisher):

    def publish(self, student_id: int, status: TrafficLight) -> None:
        # Stub: MQTT publish simulated
        pass

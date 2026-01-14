from app.ports.event_consumer import EventConsumer


class KafkaConsumer(EventConsumer):

    def consume(self, event: dict) -> None:
        # Stub: event consumption simulated
        pass

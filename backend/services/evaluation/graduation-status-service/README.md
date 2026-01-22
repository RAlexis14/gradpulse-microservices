# Graduation Status Service 🚦

Evaluates student graduation eligibility using a traffic light model.

## Architecture
- Hexagonal
- CQRS
- Redis Read Model
- PostgreSQL Audit
- Kafka + MQTT (stubs)

## Endpoint
GET /graduation/status/{student_id}

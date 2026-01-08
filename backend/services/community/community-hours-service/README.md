# Community Hours Service

Microservice responsible for registering and calculating community service hours.

## Endpoints
- POST /community-hours/register
- GET /community-hours/student/{student_id}

## Architecture
- Layered Architecture
- SRP, High Cohesion
- REST + Events

## Events
- CommunityHoursUpdated (stub)

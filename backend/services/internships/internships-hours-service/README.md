# Internships Hours Service 🧑‍💼

Microservice responsible for registering and calculating pre-professional internship hours.

## Architecture
- Layered Architecture
- SRP
- REST + Events

## Endpoints
- POST /internships-hours/register
- GET /internships-hours/student/{student_id}

## Events
- InternshipHoursUpdated (stub)

## Testing
- Unit tests with pytest
- No real database required



🧠 Notes

This service is designed to integrate with academic eligibility and graduation validation processes by providing reliable internship hour tracking.

📦 Docker Image
rommela462/internships-hours-service:qa-latest
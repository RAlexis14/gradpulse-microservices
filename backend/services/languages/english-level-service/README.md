# English Level Service 🌍

Microservice responsible for managing students' English proficiency levels (A1–B2).

## Responsibilities
- Retrieve English level per student
- Update English level with validation (A1, A2, B1, B2)

## Architecture
- Layered Architecture
- SRP
- REST
- PostgreSQL

## Endpoints
- GET /english-level/student/{student_id}
- POST /english-level/update

## Testing
- Unit tests with pytest
- No real database required

# Community Programs Service 🌍

Microservice that lists available community programs for student participation.

## Responsibilities
- List active community programs
- Retrieve program details by ID

## Architecture
- MVC
- KISS, DRY
- MongoDB

## Endpoints
- GET /community-programs
- GET /community-programs/{program_id}

## Testing
- Unit tests with pytest (no MongoDB required)
- Functional tests with Apidog

## CI/CD
- Isolated GitHub Actions pipeline (only this service triggers)

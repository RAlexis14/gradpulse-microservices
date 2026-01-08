# User Role Service

Microservice responsible for managing user roles and permissions.

## Endpoints
- POST /roles
- POST /roles/assign
- GET /roles/user/{user_id}

## Architecture
- MVC
- SRP, DRY
- PostgreSQL

## Testing
- Unit tests with pytest
- Functional tests with Apidog

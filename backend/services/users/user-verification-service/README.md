# User Verification Service

Microservice responsible for verifying user status and permissions.

## Endpoint
GET /users/verify/{user_id}

## Response
```json
{
  "exists": true,
  "active": true,
  "role": "admin"
}

# user-logout-service

Microservice responsible for handling user logout and JWT invalidation using Redis.

## Responsibilities
- Invalidate JWT tokens using a blacklist strategy
- Manage session termination
- Complement user-login-service authentication flow

## Architecture
- Layered Architecture
- REST communication
- Redis as cache store

## Endpoint

### POST /api/v1/logout

**Headers**

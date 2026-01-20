# GradPulse API Gateway (NGINX) - QA

This repository contains the **NGINX API Gateway** for the **GradPulse Microservices** project, used in the **QA** environment.  
It works as a reverse proxy to route requests from the frontend/tools to the corresponding microservices.

## Features
- Reverse proxy routing by domain (users, academic, community, internships, languages)
- Simple healthcheck endpoint
- CORS enabled for QA
- Base timeouts and proxy settings for stability

## Healthcheck
- `GET /health` → returns `200 OK`

## Base Path
All routes are exposed under:
- `/api/v1/...`

## Routed Services (QA)

### Users
- `POST /api/v1/users/auth/login` → `user-login-service`
- `POST /api/v1/users/auth/logout` → `user-logout-service`
- `/api/v1/users/profiles/` → `user-profile-service`
- `POST /api/v1/users/roles` → `user-role-service`
- `/api/v1/users/verification` → `user-verification-service`

### Academic
- `/api/v1/academic/students/` → `student-profile-service`

### Community
- `GET|POST /api/v1/community/programs` → `community-programs-service`
- `GET|POST /api/v1/community/hours` → `community-hours-service`

### Internships
- `GET|POST /api/v1/internships/offers` → `internships-offers-service`
- `GET|POST /api/v1/internships/hours` → `internships-hours-service`

### Languages
- `GET|POST /api/v1/languages/english/courses` → `english-courses-service`
- `GET|POST /api/v1/languages/english/level` → `english-level-service`

## CORS (QA)
CORS is enabled with:
- `Access-Control-Allow-Origin: *`
- Allowed methods: `GET, POST, PUT, DELETE, OPTIONS`
- Allowed headers: `Authorization, Content-Type`

## Run (Docker - QA)
> Start the gateway using the QA compose file.

```bash
docker compose -f docker-compose.qa.yml up -d --build

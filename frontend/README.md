# GradPulse Frontend (Web + PWA + Desktop)


This module contains the GradPulse multi-platform frontend: a complete Web application built with React + Vite + TypeScript + TailwindCSS + PWA, and a Desktop application built with Electron that wraps the same web UI for a native-like desktop experience. All communication with the backend is performed exclusively through the NGINX API Gateway (no direct calls to microservices), using JWT Bearer Token authentication, role-based access (STUDENT / ADMIN), loading states, and user-friendly error notifications. The UI is designed as a modern, responsive dashboard and is ready for QA/PROD deployment via Docker and CI/CD.

A multi-platform frontend for **GradPulse** that communicates **ONLY** with the **NGINX API Gateway** (no direct microservice calls).

## Requirements
- Node.js 18+

## Web (React + Vite + TypeScript)
```bash
cd web
cp .env.example .env
npm i
npm run dev
```
Open: http://localhost:5173

## Desktop (Electron wrapper)
```bash
cd desktop
npm i
npm run dev
```

## Mobile (PWA - no native APK)

This project ships a **PWA** (installable web app). For demos on Android/iOS:

1. Open the Web URL in the mobile browser
2. Use **"Add to Home Screen"** (Chrome/Edge/Safari)
3. It installs like an app (no Play Store needed)

If you **must** deliver an APK later, you can wrap the PWA with **Capacitor** or **TWA** — optional and out of scope for this deliverable.

## Build (Web + Desktop)
```bash
cd web
npm run build

cd ../desktop
npm run build
```

## Docker (Web)

The Web UI can be built as a Docker image (NGINX static host). All API calls still go to the Gateway.

```bash
cd web
docker build -t gradpulse-web:qa .
docker run --rm -p 80:80 gradpulse-web:qa
```

## Environment
`web/.env`
```bash
VITE_API_BASE_URL=http://localhost:8080
```

## Example requests (Gateway only)
```bash
curl http://localhost:8080/health

curl -X POST http://localhost:8080/api/v1/users/auth/login   -H "Content-Type: application/json"   -d '{ "email":"student1@uce.edu.ec", "password":"password123" }'

curl http://localhost:8080/api/v1/community/programs   -H "Authorization: Bearer <TOKEN>"
```

### Routes (Web)

- `/login`
- `/dashboard`
- `/graduation/status`
- `/notifications`
- `/academic/profile`
- `/community/programs`
- `/community/hours`
- `/internships/offers`
- `/internships/hours`
- `/languages/courses`
- `/languages/level`
- `/library`
- `/finance`
- `/payments` (MOCK)
- `/admin` (ADMIN only)

### Notes



- The login response returns only `access_token` + `token_type`. Since `student_id` is not returned, the UI asks the user to pick a Student ID (mock 1..21) right after login.
- **Students cannot register hours or update levels**. Those actions are available only in `/admin`.
- Some modules (Payments, Finance, Notifications, Graduation...) can run in **MOCK** mode automatically when the backend endpoints are not ready.
- If your microservices return different payload shapes (e.g., hours totals), adjust:
  - `web/src/utils/parsers.ts`
